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
    "title" => "Wir strukturieren Kapital für komplexe Immobilienprojekte und Akquisitionen",
    "subtitle" => "Ab 5 Mio. | Mezzanine - Bridge - Fremdkapital. Stadtfinanzen.de begleitet bei der Beschaffung und Strukturierung von Immobilienfinanzierungen. Mit über 20 Jahren Erfahrung im Finanzierungsmarkt und einem europaweiten Netzwerk aus Mezzaninefonds, Banken, Debt-Fonds und Family Offices erschließen wir Kapitalquellen, die klassischen Wegen verschlossen bleiben. Persönliche Beratung, Schnelligkeit und Diskretion sind für uns besonders wichtig.",
    "videoUrl" => "",
    "bgType" => "video",
    "imageUrl" => "",
    "stats" => [
      ["value" => "20+", "label" => "Jahre Erfahrung"],
      ["value" => "Ab 5M", "label" => "Finanzierungsvolumen"],
      ["value" => "0 €", "label" => "Listing-Fee"],
      ["value" => "100 %", "label" => "Persönliche Betreuung"]
    ]
  ],
  "videos" => [
    "cityVideoUrl" => "",
    "investorVideoUrl" => ""
  ],
  "videoSectionTexts" => [
    "cityTitle" => "Für Projektentwickler & Kommunen",
    "cityCopy" => "Wie Sie über Stadtfinanzen.de strukturiertes Kapital ansprechen, ohne sensible Details öffentlich preiszugeben.",
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
    ["title" => "Mezzanine Kapital", "copy" => "Zur Ergänzung des bestehenden Eigenkapitals, um geforderte Eigenkapitalquoten bei Banken zu erfüllen.", "icon" => "Layers"],
    ["title" => "Bridge Finance", "copy" => "Für schnelle Zwischenfinanzierungen von Grundstücksankäufen bis zur Anschlussfinanzierung.", "icon" => "Zap"],
    ["title" => "Fremdkapital", "copy" => "Senior und Junior Debt, Haircut-Verhandlungen mit Banken und alternativen Kapitalgebern.", "icon" => "Building2"],
    ["title" => "Equity / Joint Venture", "copy" => "Eigenkapital, Preferred Equity, und strategische Joint-Venture Partner zur operativen Absicherung.", "icon" => "Users"],
    ["title" => "Debt Advisory", "copy" => "Strukturierung von Kapitaltranchen bei Neubau, Ankäufen, Revitalisierungen und Bestandsportfolios.", "icon" => "Compass"]
  ],
  "pricingTiers" => [
    ["title" => "Für Kapitalgeber", "copy" => "Für institutionelle, angemeldete Investoren ist unsere Dienstleistung kostenfrei."],
    ["title" => "Für Projektentwickler & Kommunen", "copy" => "Das reine Listing Ihrer Projekte ist kostenfrei. Im Erfolgsfall fällt eine geringe Provision von 0,5 % des eingeworbenen Kapitals pro Jahr an."],
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
    "title" => "So läuft die Zusammenarbeit",
    "subtitle" => "Ablauf",
    "steps" => [
      ["n" => "01", "title" => "Projektvorstellung", "copy" => "Sie stellen uns Ihr Projekt und Ihren Kapitalbedarf vor - formlos und vertraulich."],
      ["n" => "02", "title" => "Strukturvorschlag und Investorenauswahl", "copy" => "Wir analysieren Ihre Kapitalstruktur und identifizieren geeignete Investoren aus unserem Netzwerk."],
      ["n" => "03", "title" => "Term Sheets und Verhandlungen", "copy" => "Wir koordinieren die Term-Sheet Phase und begleiten auf Wunsch den gesamten Verhandlungsprozess."],
      ["n" => "04", "title" => "Abschluß und Auszahlung", "copy" => "Sie schließen den Vertrag direkt mit dem Kapitalgeber - wir bleiben bis zum Vertragsabschluß an Ihrer Seite."]
    ]
  ],
  "homepageWhyUs" => [
    "title" => "Warum Stadtfinanzen.de?",
    "subtitle" => "Vorteile",
    "items" => [
      ["icon" => "ShieldCheck", "title" => "Direkter Zugang", "copy" => "Direkter Zugang zu spezialisierten und ausgewählten Finanzierungspartnern."],
      ["icon" => "Handshake", "title" => "Volle Unabhängigkeit", "copy" => "Volle Unabhängigkeit: Wir beraten Sie neutral – Sie entscheiden."],
      ["icon" => "Building2", "title" => "Erfahrung", "copy" => "Über 20 Jahre Erfahrung in der Strukturierung komplexer Finanzierungen."],
      ["icon" => "Sparkles", "title" => "Klare Positionierung", "copy" => "Klare Positionierung: Keine Standardlösungen, keine Privatfinanzierungen."]
    ]
  ],
  "homepageCta" => [
    "title" => "Bereit für den nächsten Schritt?",
    "subtitle" => "Kommunale und strukturierte Finanzierung modern, diskret und effizient. Registrieren Sie sich noch heute kostenlos.",
    "buttonText" => "Projekt einreichen"
  ],
  "impressum" => [
    "text" => "# Angaben gemäß § 5 TMG\n\n**Stadtfinanzen.de**\nStadtfinanzen.de, Deutschland\n\nE-Mail: kontakt@stadtfinanzen.de\nTel.: +49 (0) 30 555 01 20\n\n## Haftung für Inhalte\n\nDie Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.\n\nAls Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.\n\n## Urheberrecht\n\nDie durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.\n\n## Haftung für Links\n\nUnser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.\n\n## Widerspruch Werbe-Mails\n\nDer Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor."
  ],
  "datenschutz" => [
    "text" => "# 1. Datenschutz auf einen Blick\n\n### Allgemeine Hinweise\nDie folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.\n\n### Datenerfassung auf unserer Website\nDie Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.\n\n# 2. Allgemeine Hinweise und Pflichtinformationen\n\n### Datenschutz\nDie Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.\n\nWenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.\n\n### Hinweis zur verantwortlichen Stelle\nDie verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist der Betreiber (siehe Kontaktdaten im Impressum).\n\n# 3. Ihre Rechte bezüglich Ihrer Daten\n\nSie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.\n\n# 4. Datenerfassung und Analyse-Tools\n\n### Cookies\nUnsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.\n\n### Kontaktformular und Whitepaper-Download\nWenn Sie uns per Kontaktformular oder über die Whitepaper-Anforderung Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
  ],
  "cookies" => [
    "text" => "# 1. Was sind Cookies?\n\nCookies sind kleine Textdateien, die von einer Website auf Ihrem Computer oder Mobilgerät gespeichert werden, wenn Sie die Website besuchen. Sie ermöglichen es der Website, sich über einen bestimmten Zeitraum hinweg an Ihre Aktionen und Präferenzen (wie Login, Sprache, Schriftgröße und andere Anzeigeeinstellungen) zu erinnern.\n\n# 2. Wie verwenden wir Cookies?\n\nWir verwenden Cookies, um die Funktion unserer Website zu gewährleisten, die Benutzererfahrung zu verbessern und die Interaktionen auf unserer Website zu analysieren:\n\n* **Notwendige Cookies**: Diese Cookies sind für das Funktionieren der Website unerlässlich (z. B. zur Speicherung von Sicherheits-Token oder Formulardaten).\n* **Funktionale Cookies**: Diese Cookies ermöglichen es uns, Ihre bevorzugten Einstellungen zu speichern, z. B. die gewählte Sprache des Übersetzungs-Tools.\n* **Analyse-Cookies**: Wir verwenden diese, um auf aggregierter Basis statistische Daten über die Nutzung unserer Website zu erheben.\n\n# 3. Verwaltung von Cookies\n\nSie können Cookies nach Belieben steuern und/oder löschen. Sie können alle bereits auf Ihrem Computer gespeicherten Cookies löschen und die meisten Browser so einstellen, dass sie das Platzieren von Cookies verhindern. Wenn Sie dies tun, müssen Sie jedoch möglicherweise einige Einstellungen bei jedem Besuch einer Seite manuell anpassen, und einige Dienste und Funktionen funktionieren möglicherweise nicht."
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
          
          "homepageHowItWorks" => $parseJson('homepage_how_it_works', $defaultContent['homepageHowItWorks']),
          "homepageWhyUs" => $parseJson('homepage_why_us', $defaultContent['homepageWhyUs']),
          "homepageCta" => $parseJson('homepage_cta', $defaultContent['homepageCta']),
          "impressum" => [
            "text" => isset($settingsMap['impressum_text']) ? $settingsMap['impressum_text'] : $defaultContent['impressum']['text']
          ],
          "datenschutz" => [
            "text" => isset($settingsMap['datenschutz_text']) ? $settingsMap['datenschutz_text'] : $defaultContent['datenschutz']['text']
          ],
          "cookies" => [
            "text" => isset($settingsMap['cookies_text']) ? $settingsMap['cookies_text'] : $defaultContent['cookies']['text']
          ]
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

      $impressumText = isset($newContent['impressum']['text']) ? $newContent['impressum']['text'] : '';
      $saveSetting->execute(["impressum_text", $impressumText, $impressumText]);

      $datenschutzText = isset($newContent['datenschutz']['text']) ? $newContent['datenschutz']['text'] : '';
      $saveSetting->execute(["datenschutz_text", $datenschutzText, $datenschutzText]);

      $cookiesText = isset($newContent['cookies']['text']) ? $newContent['cookies']['text'] : '';
      $saveSetting->execute(["cookies_text", $cookiesText, $cookiesText]);

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
