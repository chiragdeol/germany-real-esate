<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: text/plain; charset=utf-8");
header("X-Content-Type-Options: nosniff");
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

if (ob_get_level()) ob_end_clean();

$input = json_decode(file_get_contents('php://input'), true);
$messages = isset($input['messages']) ? $input['messages'] : [];

if (!is_array($messages)) {
  http_response_code(400);
  echo "Messages are required";
  exit;
}

// -------------------------------------------------------------
// RULE-BASED QUALIFICATION CHATBOT
// -------------------------------------------------------------
function getMockBotResponse($messages) {
  $userMessages = array_filter($messages, function($m) { return $m['role'] === 'user'; });
  $lastUserMessage = end($userMessages);
  
  $lastUserText = '';
  if ($lastUserMessage && isset($lastUserMessage['parts'])) {
    foreach ($lastUserMessage['parts'] as $part) {
      if (isset($part['text'])) $lastUserText .= $part['text'];
    }
  }
  $lastUserText = trim(strtolower($lastUserText));

  // Determine flow
  $isInvestorFlow = false;
  $isCityFlow = false;
  
  foreach ($messages as $m) {
    if ($m['role'] === 'user' && isset($m['parts'])) {
      foreach ($m['parts'] as $p) {
        $txt = isset($p['text']) ? strtolower($p['text']) : '';
        if (strpos($txt, 'investor') !== false || strpos($txt, 'kapitalgeber') !== false || strpos($txt, 'anlegen') !== false) {
          $isInvestorFlow = true;
        }
        if (strpos($txt, 'city') !== false || strpos($txt, 'stadt') !== false || strpos($txt, 'kommune') !== false || strpos($txt, 'projekt') !== false) {
          $isCityFlow = true;
        }
      }
    }
  }

  if (!$isInvestorFlow && !$isCityFlow) {
    if (strpos($lastUserText, 'investor') !== false || strpos($lastUserText, 'kapitalgeber') !== false || strpos($lastUserText, 'anlegen') !== false) {
      return "Ausgezeichnet! Registrieren wir Sie als Investor. Wie lautet Ihr vollständiger Name?";
    } else if (strpos($lastUserText, 'city') !== false || strpos($lastUserText, 'stadt') !== false || strpos($lastUserText, 'kommune') !== false || strpos($lastUserText, 'projekt') !== false) {
      return "Sehr gut! Registrieren wir Ihr städtisches Projekt. Wie lautet der Name Ihrer Gemeinde, Stadt oder öffentlichen Einrichtung?";
    } else {
      return "Bitte wählen Sie eine der folgenden Optionen aus, damit ich Ihnen weiterhelfen kann:\n\n- **Investor** (auf der Suche nach Anlagemöglichkeiten)\n- **Stadt / Kommune** (auf der Suche nach Projektfinanzierung)";
    }
  }

  // 1. Investor flow questions
  if ($isInvestorFlow) {
    $assistantTexts = [];
    foreach ($messages as $m) {
      if ($m['role'] === 'assistant' && isset($m['parts'])) {
        foreach ($m['parts'] as $p) {
          if (isset($p['text'])) $assistantTexts[] = strtolower($p['text']);
        }
      }
    }
    
    $askedName = false;
    $askedCompany = false;
    $askedEmail = false;
    $askedPhone = false;
    $askedType = false;
    $askedSector = false;
    $askedRange = false;
    $askedGeography = false;
    $askedTerms = false;
    
    foreach ($assistantTexts as $t) {
      if (strpos($t, 'vollständiger name') !== false || strpos($t, 'wie lautet ihr name') !== false) $askedName = true;
      if (strpos($t, 'unternehmen') !== false || strpos($t, 'firma') !== false || strpos($t, 'institution') !== false) $askedCompany = true;
      if (strpos($t, 'e-mail-adresse') !== false || strpos($t, 'email') !== false) $askedEmail = true;
      if (strpos($t, 'telefonnummer') !== false) $askedPhone = true;
      if (strpos($t, 'investorentyp') !== false) $askedType = true;
      if (strpos($t, 'sektoren') !== false) $askedSector = true;
      if (strpos($t, 'investitionsvolumen') !== false) $askedRange = true;
      if (strpos($t, 'regionen oder geografien') !== false) $askedGeography = true;
      if (strpos($t, 'datenschutzerklärung') !== false) $askedTerms = true;
    }

    if (!$askedName) return "Ausgezeichnet! Registrieren wir Sie als Investor. Wie lautet Ihr vollständiger Name?";
    if (!$askedCompany) return "Vielen Dank. Welches Unternehmen, welchen Fonds oder welche Institution vertreten Sie?";
    if (!$askedEmail) return "Verstanden. Wie lautet Ihre geschäftliche E-Mail-Adresse?";
    if (!$askedPhone) return "Perfekt. Unter welcher Telefonnummer können wir Sie für Rückfragen erreichen (optional, schreiben Sie 'Nein' zum Überspringen)?";
    if (!$askedType) return "Welcher Investorentyp beschreibt Sie am besten (z. B. Family Office, Private Equity, Pensionskasse, Bank, Privatperson)?";
    if (!$askedSector) return "In welche Sektoren investieren Sie primär (z. B. Erneuerbare Energien, Infrastruktur, Wohnungsbau, Stadtentwicklung)?";
    if (!$askedRange) return "Wie hoch ist Ihr typisches Investitionsvolumen (z. B. unter 5 Mio. €, 5-25 Mio. €, 25-100 Mio. €)?";
    if (!$askedGeography) return "Welche Regionen oder Geografien bevorzugen Sie (z. B. Deutschland, DACH, EU, International)?";
    if (!$askedTerms) return "Sind Sie damit einverstanden, dass wir Sie kontaktieren und Ihre Daten gemäß unserer Datenschutzerklärung verarbeiten? (Antworten Sie mit Ja oder Nein)";

    // Compile summary
    $investorName = getAnswerAfterQuestion($messages, "vollständiger name");
    $investorCompany = getAnswerAfterQuestion($messages, "unternehmen");
    $investorEmail = getAnswerAfterQuestion($messages, "e-mail-adresse");
    $investorPhone = getAnswerAfterQuestion($messages, "telefonnummer");
    $investorType = getAnswerAfterQuestion($messages, "investorentyp");
    $investorSector = getAnswerAfterQuestion($messages, "sektoren");
    $investorRange = getAnswerAfterQuestion($messages, "investitionsvolumen");
    $investorGeo = getAnswerAfterQuestion($messages, "regionen oder geografien");

    return "Vielen Dank für Ihre Angaben! Hier ist eine Zusammenfassung Ihrer Registrierung als Investor:\n\n" .
           "- **Name**: " . $investorName . "\n" .
           "- **Company**: " . $investorCompany . "\n" .
           "- **Email**: " . $investorEmail . "\n" .
           "- **Phone**: " . $investorPhone . "\n" .
           "- **Investor Type**: " . $investorType . "\n" .
           "- **Sector interest**: " . $investorSector . "\n" .
           "- **Investment range**: " . $investorRange . "\n" .
           "- **Preferred geography**: " . $investorGeo . "\n\n" .
           "Ein Partner von Civita Capital wird Ihre Angaben prüfen und sich innerhalb von zwei Werktagen persönlich mit Ihnen in Verbindung setzen.\n\n" .
           "Your inquiry has been recorded.";
  }

  // 2. City flow questions
  if ($isCityFlow) {
    $assistantTexts = [];
    foreach ($messages as $m) {
      if ($m['role'] === 'assistant' && isset($m['parts'])) {
        foreach ($m['parts'] as $p) {
          if (isset($p['text'])) $assistantTexts[] = strtolower($p['text']);
        }
      }
    }
    
    $askedName = false;
    $askedContact = false;
    $askedEmail = false;
    $askedPhone = false;
    $askedProject = false;
    $askedSize = false;
    $askedFinancing = false;
    $askedDescription = false;
    $askedTerms = false;
    
    foreach ($assistantTexts as $t) {
      if (strpos($t, 'name ihrer gemeinde') !== false || strpos($t, 'stadt') !== false || strpos($t, 'kommune') !== false) $askedName = true;
      if (strpos($t, 'zuständige kontaktperson') !== false || strpos($t, 'ansprechpartner') !== false) $askedContact = true;
      if (strpos($t, 'offizielle e-mail-adresse') !== false || strpos($t, 'email') !== false) $askedEmail = true;
      if (strpos($t, 'telefonnummer') !== false) $askedPhone = true;
      if (strpos($t, 'art von projekt') !== false) $askedProject = true;
      if (strpos($t, 'geschätzte investitionsvolumen') !== false) $askedSize = true;
      if (strpos($t, 'finanzierungsart') !== false) $askedFinancing = true;
      if (strpos($t, 'kurze beschreibung') !== false) $askedDescription = true;
      if (strpos($t, 'datenschutzerklärung') !== false) $askedTerms = true;
    }

    if (!$askedName) return "Sehr gut! Registrieren wir Ihr städtisches Projekt. Wie lautet der Name Ihrer Gemeinde, Stadt oder öffentlichen Einrichtung?";
    if (!$askedContact) return "Vielen Dank. Wer ist die zuständige Kontaktperson für dieses Vorhaben?";
    if (!$askedEmail) return "Wie lautet die offizielle E-Mail-Adresse für die Kontaktaufnahme?";
    if (!$askedPhone) return "Unter welcher Telefonnummer können wir Sie erreichen (optional, 'Nein' zum Überspringen)?";
    if (!$askedProject) return "Um welche Art von Projekt handelt es sich (z. B. Schulbau, Windpark, Kitabau, Quartiersentwicklung)?";
    if (!$askedSize) return "Wie hoch ist das geschätzte Investitionsvolumen für dieses Projekt (in EUR)?";
    if (!$askedFinancing) return "Welche Finanzierungsart wird angestrebt (z. B. Eigenkapital, Fremdkapital, ÖPP, Zuschuss)?";
    if (!$askedDescription) return "Bitte geben Sie uns eine kurze Beschreibung des Projekts (2-3 Sätze):";
    if (!$askedTerms) return "Sind Sie damit einverstanden, dass wir Sie kontaktieren und Ihre Daten gemäß unserer Datenschutzerklärung verarbeiten? (Antworten Sie mit Ja oder Nein)";

    // Compile summary
    $cityName = getAnswerAfterQuestion($messages, "name ihrer gemeinde");
    $cityContact = getAnswerAfterQuestion($messages, "zuständige kontaktperson");
    $cityEmail = getAnswerAfterQuestion($messages, "e-mail-adresse");
    $cityPhone = getAnswerAfterQuestion($messages, "telefonnummer");
    $cityProject = getAnswerAfterQuestion($messages, "art von projekt");
    $citySize = getAnswerAfterQuestion($messages, "geschätzte investitionsvolumen");
    $cityFinancing = getAnswerAfterQuestion($messages, "finanzierungsart");
    $cityDesc = getAnswerAfterQuestion($messages, "kurze beschreibung");

    return "Vielen Dank für Ihre Angaben! Hier ist eine Zusammenfassung Ihres städtischen Projekts:\n\n" .
           "- **Municipality**: " . $cityName . "\n" .
           "- **Contact person**: " . $cityContact . "\n" .
           "- **Email**: " . $cityEmail . "\n" .
           "- **Phone**: " . $cityPhone . "\n" .
           "- **Project type**: " . $cityProject . "\n" .
           "- **Investment size**: " . $citySize . "\n" .
           "- **Financing type**: " . $cityFinancing . "\n" .
           "- **Description**: " . $cityDesc . "\n\n" .
           "Ein Partner von Civita Capital wird Ihr Projekt prüfen und sich innerhalb von zwei Werktagen persönlich mit Ihnen in Verbindung setzen.\n\n" .
           "Your inquiry has been recorded.";
  }

  return "Bitte wählen Sie eine der folgenden Optionen aus, damit ich Ihnen weiterhelfen kann:\n\n- **Investor** (auf der Suche nach Anlagemöglichkeiten)\n- **Stadt / Kommune** (auf der Suche nach Projektfinanzierung)";
}

function getAnswerAfterQuestion($messages, $questionKeyword) {
  $len = count($messages);
  for ($i = 0; $i < $len - 1; $i++) {
    $msg = $messages[$i];
    if ($msg['role'] === 'assistant' && isset($msg['parts'])) {
      $text = '';
      foreach ($msg['parts'] as $p) {
        if (isset($p['text'])) $text .= $p['text'];
      }
      $text = strtolower($text);
      
      if (strpos($text, $questionKeyword) !== false) {
        // Find next user message
        for ($j = $i + 1; $j < $len; $j++) {
          if ($messages[$j]['role'] === 'user' && isset($messages[$j]['parts'])) {
            $ans = '';
            foreach ($messages[$j]['parts'] as $up) {
              if (isset($up['text'])) $ans .= $up['text'];
            }
            return trim($ans);
          }
        }
      }
    }
  }
  return "N/A";
}

// Generate Response
$response = getMockBotResponse($messages);

// Stream out characters
$chunkSize = 3;
$totalLen = strlen($response);
for ($i = 0; $i < $totalLen; $i += $chunkSize) {
  $chunk = substr($response, $i, $chunkSize);
  echo $chunk;
  usleep(15000); // 15ms simulated streaming delay
  flush();
}
?>
