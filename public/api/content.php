<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-Token, x-admin-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

require_once __DIR__ . '/db.php';

if (!function_exists('getallheaders')) {
  function getallheaders() {
    $headers = [];
    foreach ($_SERVER as $name => $value) {
      if (substr($name, 0, 5) == 'HTTP_') {
        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
      }
    }
    return $headers;
  }
}

// Default content fallback structure
$defaultContent = [
  "headerScripts" => "",
  "hero" => [
    "title" => "Städtische Projekte mit privaten Investoren finanzieren.",
    "subtitle" => "Banken · Family Offices · Fondsgesellschaften — national und international. Für Infrastruktur, Schulen, Kindergärten und Quartiere. Persönlich vermittelt, kein automatisches Matching, keine Listing-Fee.",
    "videoUrl" => "",
    "bgType" => "video",
    "imageUrl" => "",
    "stats" => [
      ["value" => "3.000+", "label" => "Investoren & Banken"],
      ["value" => "0,5 %", "label" => "Provision p.a."],
      ["value" => "0 €", "label" => "Listing-Fee"],
      ["value" => "100 %", "label" => "Persönliche Betreuung"]
    ]
  ],
  "videos" => [
    "cityVideoUrl" => "",
    "investorVideoUrl" => ""
  ],
  "videoSectionTexts" => [
    "cityTitle" => "Für Städte & Kommunen",
    "cityCopy" => "Wie Sie über Stadtfinanzen.de seriöses Kapital ansprechen, ohne sensible Details öffentlich preiszugeben.",
    "investorTitle" => "Für Investoren",
    "investorCopy" => "Wie institutionelle Investoren frühzeitig Zugang zu kuratierten Off-Market-Projekten in Deutschland und Europa erhalten."
  ],
  "contact" => [
    "email" => "kontakt@stadtfinanzen.de",
    "phone" => "+49 (0) 30 555 01 20",
    "address" => "Stadtfinanzen.de, Deutschland"
  ],
  "blog" => [
    "title" => "Beiträge unserer Partner zum kommunalen Investmentumfeld."
  ],
  "posts" => [
    [
      "id" => "post-1",
      "tag" => "Stadtentwicklung",
      "title" => "Warum mittelgroße deutsche Städte zur nächsten institutionellen Assetklasse werden",
      "excerpt" => "Mittelstädte in Deutschland liefern auf risikoadjustierter Basis zunehmend bessere Renditen als die Metropolen. Was wir in unserer Pipeline sehen.",
      "content" => "Die Attraktivität von Mittelstädten (sogenannten B- und C-Standorten) wächst stetig. Während A-Metropolen wie Berlin, München oder Hamburg unter extrem niedrigen Renditen und hoher Regulierung leiden, bieten mittelgroße deutsche Städte ein stabiles wirtschaftliches Fundament mit deutlich attraktiveren Renditechancen.\n\n### Wachsende Nachfrage nach regionaler Infrastruktur\nKommunen abseits der Metropolen stehen vor großen Herausforderungen. Von der Sanierung öffentlicher Schulen bis hin zur Modernisierung von Verkehrswegen und Glasfasernetzen ist der Investitionsbedarf gigantisch. Da klassische Bankkredite durch regulatorische Hürden oft schwer zugänglich sind, gewinnen private Finanzierungspartnerschaften (ÖPP) an Bedeutung.\n\n### Vorteile für institutionelle Investoren:\n1. **Geringere Volatilität**: Die Mietmärkte und Immobilienwerte in mittleren Städten sind historisch stabiler.\n2. **Höhere Renditespreads**: Renditen liegen oft 1,0 bis 2,5 % über denen der Metropolen.\n3. **Partnerschaftliche Kooperation**: Kommunen zeigen sich bei Projektentwicklungen oft kooperativer und flexibler.",
      "date" => "März 2026",
      "read" => "6 Min. Lesezeit"
    ],
    [
      "id" => "post-2",
      "tag" => "Energie & Infrastruktur",
      "title" => "Geduldiges Kapital für kommunale Erneuerbare",
      "excerpt" => "Wie langfristige Infrastrukturmandate und EU-Förderinstrumente die Finanzierung der Energiewende auf kommunaler Ebene verändern.",
      "content" => "Kommunale Energieversorgung ist der Schlüssel zur Energiewende in Deutschland. Windparks, Solaranlagen und Fernwärmenetze erfordern jedoch erhebliche Vorabinvestitionen, die kommunale Haushalte allein nicht tragen können. Hier kommt sogenanntes „geduldiges Kapital“ ins Spiel.\n\n### Was ist geduldiges Kapital?\nGeduldiges Kapital beschreibt langfristig orientierte Investitionen, meist von Pensionskassen, Versicherungsgesellschaften oder Stiftungen. Diese Akteure suchen keine schnellen Spekulationsgewinne, sondern stabile, inflationsgeschützte Erträge über 15 bis 30 Jahre.\n\n### Kommunen profitieren doppelt:\n* **Planungssicherheit**: Langfristige Zinsbindungen und feste Abnahmeverträge schaffen verlässliche Haushaltsposten.\n* **Technologie-Vorsprung**: Investoren finanzieren oft modernste Speichertechnologien (Batterien) und intelligente Stromnetze gleich mit.",
      "date" => "Februar 2026",
      "read" => "8 Min. Lesezeit"
    ],
    [
      "id" => "post-3",
      "tag" => "Öffentlich-private Partnerschaft",
      "title" => "ÖPP-Strukturen, die wirklich zur Unterschrift führen",
      "excerpt" => "Ein kompakter Leitfaden für Kämmerer und Stadträte zu Strukturen, die vom MoU bis zur Signatur tragen, ohne Marktvertrauen zu verspielen.",
      "content" => "Öffentlich-Private Partnerschaften (ÖPP) gelten oft als bürokratisch und schwerfällig. Doch richtig strukturiert sind sie ein mächtiges Werkzeug, um öffentliche Projekte schneller und budgetkonformer umzusetzen.\n\n### Der Weg zum erfolgreichen Vertragsabschluss\nEin häufiger Fehler liegt in mangelhafter Vorbereitung. Eine klare Definition der Risikoverteilung zwischen öffentlicher Hand und privatem Partner ist der wichtigste Baustein.\n\n### Die Phasen einer erfolgreichen ÖPP-Struktur:\n1. **Bedarfsanalyse**: Eindeutige Definition, was gebaut oder betrieben werden soll.\n2. **Letter of Intent (LoI) / MoU**: Frühzeitige Festlegung der Kernpunkte, um das Interesse qualifizierter Investoren zu sichern.\n3. **Transparente Ausschreibung**: Klare Kriterien und zügige Vergabeprozesse.\n4. **Risikoallokation**: Risiken wie Baukostenüberschreitungen sollten bei der Partei liegen, die sie am besten kontrollieren kann (meist dem privaten Baupartner).",
      "date" => "Januar 2026",
      "read" => "5 Min. Lesezeit"
    ]
  ],
  "projectTypesList" => [
    ["title" => "Infrastruktur", "copy" => "Mittelgroße deutsche Städte haben massiven Nachholbedarf bei Straßen, Brücken, Datacentern und Glasfaser.", "icon" => "Building2"],
    ["title" => "Energie & Umwelt", "copy" => "Finanzierung von Windparks, Solaranlagen, Fernwärmenetzen und Batteriespeichern direkt auf kommunaler Ebene.", "icon" => "Zap"],
    ["title" => "Bildung & Soziales", "copy" => "Neubau und Sanierung von Schulen, Kindergärten und Sportstätten durch langfristiges, geduldiges Kapital.", "icon" => "GraduationCap"],
    ["title" => "Quartiere & Wohnungsbau", "copy" => "Entwicklung neuer Wohngebiete und sozialer Wohnungsbau in Kooperation mit kommunalen Wohnungsgesellschaften.", "icon" => "Hammer"]
  ],
  "homepageServices" => [
    ["title" => "Projektberatung", "copy" => "Unsere Experten besprechen Ihr Projekt mit Ihnen und entwickeln die passende Strategie, um Investoren anzuziehen.", "icon" => "Compass"],
    ["title" => "Strukturierte Finanzierung", "copy" => "Meist gibt es mehrere Finanzierungsmöglichkeiten. Wir beraten Sie bei der optimalen Strukturierung.", "icon" => "Layers"],
    ["title" => "Investoren-Matching", "copy" => "Mit Zugang zu weit über 3.000 Investoren und Banken. Auch ohne öffentliche Platzierung „matchen“ wir Sie manuell mit passenden Investoren.", "icon" => "Users"]
  ],
  "pricingTiers" => [
    ["title" => "Für Kapitalgeber", "copy" => "Für institutionelle, angemeldete Investoren ist unsere Dienstleistung kostenfrei."],
    ["title" => "Für Städte & Gemeinden", "copy" => "Das reine Listing Ihrer Projekte ist kostenfrei. Im Erfolgsfall fällt eine geringe Provision von 0,5 % des eingeworbenen Kapitals pro Jahr an."],
    ["title" => "Beratungsgespräche", "copy" => "Konkrete Einzelberatung können Sie online buchen – 298 € pro Stunde."],
    ["title" => "Einzelansprache & Club Deals", "copy" => "Diskrete Einzelansprache und Club-Deal-Strukturierung nach gesonderter Absprache."]
  ],
  "about" => [
    "title" => "Wie funktioniert es genau?",
    "introTitle" => "Sie bleiben in Kontrolle",
    "introText1" => "Sie entscheiden, ob Ihr Projekt mit allen Daten oder anonymisiert gelistet wird und welche Informationen Sie bekannt geben möchten. Wir pflegen alle Angaben ein und warten auf Ihre Freigabe – erst dann wird das Projekt platziert.",
    "introText2" => "Anfragen von Investoren leiten wir direkt an Sie weiter. Sie entscheiden, mit welchem Investor Sie zusammenarbeiten möchten, und informieren uns, sobald Sie einen Finanzierungspartner gefunden haben oder die Platzierung beenden möchten. Wir nehmen kein Kapital entgegen, sondern stellen Ihnen geeignete Investorenkontakte zur Verfügung.",
    "projectTypes" => [
      "Infrastruktur: Straßen, Brücken, Datacenter, Häfen, Glasfaser",
      "Stadtentwicklung: neue Wohngebiete & sozialer Wohnungsbau",
      "Energie: Wind, Solar, Batteriespeicher",
      "Städtische Einrichtungen: Schulen, Kindergärten",
      "Öffentlich-private Partnerschaften (ÖPP)",
      "Tourismus, Kultur & öffentliche Mobilität"
    ]
  ],
  "homepageHowItWorks" => [
    "title" => "In vier Schritten zur Finanzierung.",
    "subtitle" => "Wie geht´s?",
    "steps" => [
      ["n" => "01", "title" => "Formular ausfüllen", "copy" => "Stellen Sie Ihr Projekt über unser Kontaktformular kurz vor – auch anonymisiert möglich."],
      ["n" => "02", "title" => "Inhalte freigeben", "copy" => "Wir pflegen Ihre Angaben ein. Veröffentlicht wird erst nach Ihrer ausdrücklichen Freigabe."],
      ["n" => "03", "title" => "Anfragen erhalten", "copy" => "Investorenanfragen leiten wir direkt an Sie weiter. Sie entscheiden, mit wem Sie sprechen."],
      ["n" => "04", "title" => "Direkt verhandeln", "copy" => "Sie verhandeln Konditionen direkt mit dem Investor. Wir begleiten Sie bei der Finanzierung."]
    ]
  ],
  "homepageWhyUs" => [
    "title" => "Hier finden Sie Investoren.",
    "subtitle" => "Ihre Vorteile",
    "items" => [
      ["icon" => "ShieldCheck", "title" => "Sie behalten die Kontrolle", "copy" => "Sie bestimmen, welche Informationen Sie bekannt geben – auf Wunsch auch vollständig anonym."],
      ["icon" => "Handshake", "title" => "Kein automatisches Matching", "copy" => "Wir leiten Investoren direkt und persönlich an Sie weiter – keine Algorithmen, kein Massenversand."],
      ["icon" => "Building2", "title" => "Keine Listing-Fee", "copy" => "Das Einstellen Ihres Projekts ist kostenfrei. Eine geringe Provision fällt nur im Erfolgsfall an."],
      ["icon" => "Sparkles", "title" => "Persönliche Betreuung", "copy" => "Ein fester Ansprechpartner begleitet Sie von der Anfrage bis zur Finanzierungszusage."]
    ]
  ],
  "homepageCta" => [
    "title" => "Bereit für den nächsten Schritt?",
    "subtitle" => "Kommunale Finanzierung modern, diskret und effizient. Registrieren Sie sich noch heute kostenlos.",
    "buttonText" => "Projekt einreichen"
  ]
];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $db = getDbConnection();
  if ($db) {
    try {
      // Run database column migrations check
      $check = $db->query("SHOW COLUMNS FROM blog_posts LIKE 'content'");
      if ($check->rowCount() === 0) {
        $db->query("ALTER TABLE blog_posts ADD COLUMN content LONGTEXT NOT NULL DEFAULT ''");
      }

      // Fetch settings
      $stmt = $db->query("SELECT * FROM site_settings");
      $settingsRows = $stmt->fetchAll();
      
      $settingsMap = [];
      foreach ($settingsRows as $row) {
        $settingsMap[$row['setting_key']] = $row['setting_value'];
      }

      // Fetch posts
      $stmtPosts = $db->query("SELECT * FROM blog_posts ORDER BY created_at DESC");
      $postsRows = $stmtPosts->fetchAll();
      
      $posts = [];
      foreach ($postsRows as $row) {
        $posts[] = [
          "id" => $row['id'],
          "tag" => $row['tag'],
          "title" => $row['title'],
          "excerpt" => $row['excerpt'],
          "content" => isset($row['content']) ? $row['content'] : "",
          "date" => $row['date_text'],
          "read" => $row['read_time']
        ];
      }

      // Helper to parse JSON
      $parseJson = function($key, $fallback) use ($settingsMap) {
        if (!isset($settingsMap[$key])) return $fallback;
        $decoded = json_decode($settingsMap[$key], true);
        return is_array($decoded) ? $decoded : $fallback;
      };

      if (!empty($settingsMap)) {
        $dbContent = [
          "headerScripts" => isset($settingsMap['header_scripts']) ? $settingsMap['header_scripts'] : "",
          "hero" => [
            "title" => isset($settingsMap['hero_title']) ? $settingsMap['hero_title'] : $defaultContent['hero']['title'],
            "subtitle" => isset($settingsMap['hero_subtitle']) ? $settingsMap['hero_subtitle'] : $defaultContent['hero']['subtitle'],
            "videoUrl" => isset($settingsMap['hero_video_url']) ? $settingsMap['hero_video_url'] : "",
            "bgType" => isset($settingsMap['hero_bg_type']) ? $settingsMap['hero_bg_type'] : "video",
            "imageUrl" => isset($settingsMap['hero_image_url']) ? $settingsMap['hero_image_url'] : "",
            "stats" => $parseJson('hero_stats', $defaultContent['hero']['stats'])
          ],
          "videos" => [
            "cityVideoUrl" => isset($settingsMap['video_city_url']) ? $settingsMap['video_city_url'] : "",
            "investorVideoUrl" => isset($settingsMap['video_investor_url']) ? $settingsMap['video_investor_url'] : ""
          ],
          "videoSectionTexts" => $parseJson('video_section_texts', $defaultContent['videoSectionTexts']),
          "contact" => [
            "email" => isset($settingsMap['contact_email']) ? $settingsMap['contact_email'] : $defaultContent['contact']['email'],
            "phone" => isset($settingsMap['contact_phone']) ? $settingsMap['contact_phone'] : $defaultContent['contact']['phone'],
            "address" => isset($settingsMap['contact_address']) ? $settingsMap['contact_address'] : $defaultContent['contact']['address']
          ],
          "blog" => [
            "title" => isset($settingsMap['blog_title']) ? $settingsMap['blog_title'] : $defaultContent['blog']['title']
          ],
          "posts" => empty($posts) ? $defaultContent['posts'] : $posts,
          
          "projectTypesList" => $parseJson('project_types_list', $defaultContent['projectTypesList']),
          "homepageServices" => $parseJson('homepage_services', $defaultContent['homepageServices']),
          "pricingTiers" => $parseJson('pricing_tiers', $defaultContent['pricingTiers']),
          "about" => [
            "title" => isset($settingsMap['about_title']) ? $settingsMap['about_title'] : $defaultContent['about']['title'],
            "introTitle" => isset($settingsMap['about_intro_title']) ? $settingsMap['about_intro_title'] : $defaultContent['about']['introTitle'],
            "introText1" => isset($settingsMap['about_intro_text1']) ? $settingsMap['about_intro_text1'] : $defaultContent['about']['introText1'],
            "introText2" => isset($settingsMap['about_intro_text2']) ? $settingsMap['about_intro_text2'] : $defaultContent['about']['introText2'],
            "projectTypes" => $parseJson('about_project_types', $defaultContent['about']['projectTypes'])
          ],
          
          // Layout variables
          "homepageHowItWorks" => $parseJson('homepage_how_it_works', $defaultContent['homepageHowItWorks']),
          "homepageWhyUs" => $parseJson('homepage_why_us', $defaultContent['homepageWhyUs']),
          "homepageCta" => $parseJson('homepage_cta', $defaultContent['homepageCta'])
        ];
        
        echo json_encode($dbContent);
        exit;
      }
    } catch (PDOException $e) {
      error_log("SQL query error in content.php: " . $e->getMessage());
    }
  }

  // File fallback
  $content = readJsonFileFallback('content.json', json_encode($defaultContent));
  echo json_encode($content);
  exit;
}

if ($method === 'POST') {
  // Authentication check
  $headers = getallheaders();
  
  $adminToken = '';
  foreach ($headers as $key => $val) {
    if (strtolower($key) === 'x-admin-token') {
      $adminToken = $val;
      break;
    }
  }

  if ($adminToken !== 'admin-secret-token') {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
  }

  $newContent = json_decode(file_get_contents('php://input'), true);
  if (!$newContent) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid payload"]);
    exit;
  }

  $db = getDbConnection();
  if ($db) {
    try {
      // Run database column migrations check
      $check = $db->query("SHOW COLUMNS FROM blog_posts LIKE 'content'");
      if ($check->rowCount() === 0) {
        $db->query("ALTER TABLE blog_posts ADD COLUMN content LONGTEXT NOT NULL DEFAULT ''");
      }

      // Helper to save settings
      $saveSetting = $db->prepare("
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?
      ");

      $saveSetting->execute(["header_scripts", isset($newContent['headerScripts']) ? $newContent['headerScripts'] : '', isset($newContent['headerScripts']) ? $newContent['headerScripts'] : '']);
      $saveSetting->execute(["hero_title", $newContent['hero']['title'], $newContent['hero']['title']]);
      $saveSetting->execute(["hero_subtitle", $newContent['hero']['subtitle'], $newContent['hero']['subtitle']]);
      $saveSetting->execute(["hero_video_url", isset($newContent['hero']['videoUrl']) ? $newContent['hero']['videoUrl'] : '', isset($newContent['hero']['videoUrl']) ? $newContent['hero']['videoUrl'] : '']);
      $saveSetting->execute(["hero_bg_type", isset($newContent['hero']['bgType']) ? $newContent['hero']['bgType'] : 'video', isset($newContent['hero']['bgType']) ? $newContent['hero']['bgType'] : 'video']);
      $saveSetting->execute(["hero_image_url", isset($newContent['hero']['imageUrl']) ? $newContent['hero']['imageUrl'] : '', isset($newContent['hero']['imageUrl']) ? $newContent['hero']['imageUrl'] : '']);
      $saveSetting->execute(["video_city_url", isset($newContent['videos']['cityVideoUrl']) ? $newContent['videos']['cityVideoUrl'] : '', isset($newContent['videos']['cityVideoUrl']) ? $newContent['videos']['cityVideoUrl'] : '']);
      $saveSetting->execute(["video_investor_url", isset($newContent['videos']['investorVideoUrl']) ? $newContent['videos']['investorVideoUrl'] : '', isset($newContent['videos']['investorVideoUrl']) ? $newContent['videos']['investorVideoUrl'] : '']);
      $saveSetting->execute(["contact_email", $newContent['contact']['email'], $newContent['contact']['email']]);
      $saveSetting->execute(["contact_phone", $newContent['contact']['phone'], $newContent['contact']['phone']]);
      $saveSetting->execute(["contact_address", $newContent['contact']['address'], $newContent['contact']['address']]);
      $saveSetting->execute(["blog_title", $newContent['blog']['title'], $newContent['blog']['title']]);
      
      $statsJson = json_encode($newContent['hero']['stats'], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["hero_stats", $statsJson, $statsJson]);
      
      $projectTypesListJson = json_encode(isset($newContent['projectTypesList']) ? $newContent['projectTypesList'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["project_types_list", $projectTypesListJson, $projectTypesListJson]);
      
      $homepageServicesJson = json_encode(isset($newContent['homepageServices']) ? $newContent['homepageServices'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["homepage_services", $homepageServicesJson, $homepageServicesJson]);

      $pricingTiersJson = json_encode(isset($newContent['pricingTiers']) ? $newContent['pricingTiers'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["pricing_tiers", $pricingTiersJson, $pricingTiersJson]);

      $aboutTitle = isset($newContent['about']['title']) ? $newContent['about']['title'] : '';
      $saveSetting->execute(["about_title", $aboutTitle, $aboutTitle]);

      $aboutIntroTitle = isset($newContent['about']['introTitle']) ? $newContent['about']['introTitle'] : '';
      $saveSetting->execute(["about_intro_title", $aboutIntroTitle, $aboutIntroTitle]);

      $aboutIntroText1 = isset($newContent['about']['introText1']) ? $newContent['about']['introText1'] : '';
      $saveSetting->execute(["about_intro_text1", $aboutIntroText1, $aboutIntroText1]);

      $aboutIntroText2 = isset($newContent['about']['introText2']) ? $newContent['about']['introText2'] : '';
      $saveSetting->execute(["about_intro_text2", $aboutIntroText2, $aboutIntroText2]);

      $aboutProjTypesJson = json_encode(isset($newContent['about']['projectTypes']) ? $newContent['about']['projectTypes'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["about_project_types", $aboutProjTypesJson, $aboutProjTypesJson]);

      // Layout variables
      $videoSectionTextsJson = json_encode(isset($newContent['videoSectionTexts']) ? $newContent['videoSectionTexts'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["video_section_texts", $videoSectionTextsJson, $videoSectionTextsJson]);

      $homepageHowItWorksJson = json_encode(isset($newContent['homepageHowItWorks']) ? $newContent['homepageHowItWorks'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["homepage_how_it_works", $homepageHowItWorksJson, $homepageHowItWorksJson]);

      $homepageWhyUsJson = json_encode(isset($newContent['homepageWhyUs']) ? $newContent['homepageWhyUs'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["homepage_why_us", $homepageWhyUsJson, $homepageWhyUsJson]);

      $homepageCtaJson = json_encode(isset($newContent['homepageCta']) ? $newContent['homepageCta'] : [], JSON_UNESCAPED_UNICODE);
      $saveSetting->execute(["homepage_cta", $homepageCtaJson, $homepageCtaJson]);

      // Save blog posts
      $db->query("DELETE FROM blog_posts");
      if (isset($newContent['posts']) && is_array($newContent['posts'])) {
        $insertPost = $db->prepare("
          INSERT INTO blog_posts (id, tag, title, excerpt, content, date_text, read_time)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        foreach ($newContent['posts'] as $post) {
          $insertPost->execute([
            $post['id'],
            $post['tag'],
            $post['title'],
            $post['excerpt'],
            isset($post['content']) ? $post['content'] : "",
            $post['date'],
            $post['read']
          ]);
        }
      }

      echo json_encode(["ok" => true]);
      exit;
    } catch (PDOException $e) {
      error_log("SQL save error in content.php: " . $e->getMessage());
    }
  }

  // File fallback
  writeJsonFileFallback('content.json', $newContent);
  echo json_encode(["ok" => true]);
  exit;
}
?>
