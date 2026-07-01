<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-Token, x-admin-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

require_once __DIR__ . '/db.php';

// Polyfill getallheaders if it does not exist
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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  // Authentication check
  $headers = getallheaders();
  
  // Normalize header names to lowercase
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

  $db = getDbConnection();
  if ($db) {
    try {
      $stmt = $db->query("SELECT * FROM leads ORDER BY submitted_at DESC");
      $rows = $stmt->fetchAll();
      
      $leads = [];
      foreach ($rows as $row) {
        $details = [];
        if (!empty($row['details'])) {
          $details = json_decode($row['details'], true) ?: [];
        }
        
        $leads[] = [
          "id" => $row['id'],
          "type" => $row['type'],
          "submittedAt" => date('c', strtotime($row['submitted_at'])),
          "data" => array_merge([
            "name" => $row['name'],
            "company" => $row['company'],
            "email" => $row['email'],
            "phone" => $row['phone'],
            "investorType" => $row['investor_type'],
            "range" => $row['investment_range']
          ], $details)
        ];
      }
      echo json_encode($leads);
      exit;
    } catch (PDOException $e) {
      error_log("SQL query error in leads.php: " . $e->getMessage());
    }
  }

  // File fallback
  $leads = readJsonFileFallback('leads.json', '[]');
  echo json_encode($leads);
  exit;
}

if ($method === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);
  if (!$input || !isset($input['type']) || !isset($input['data'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid payload"]);
    exit;
  }

  $type = $input['type'];
  $data = $input['data'];
  $id = substr(md5(uniqid(rand(), true)), 0, 7);
  $submittedAt = date('c');

  $newLead = [
    "id" => $id,
    "type" => $type,
    "submittedAt" => $submittedAt,
    "data" => $data
  ];

  $db = getDbConnection();
  if ($db) {
    try {
      $stmt = $db->prepare("
        INSERT INTO leads (id, type, name, company, email, phone, investor_type, investment_range, details, submitted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ");
      $stmt->execute([
        $id,
        $type,
        isset($data['name']) ? $data['name'] : 'N/A',
        isset($data['company']) ? $data['company'] : null,
        isset($data['email']) ? $data['email'] : 'N/A',
        isset($data['phone']) ? $data['phone'] : null,
        isset($data['investorType']) ? $data['investorType'] : null,
        isset($data['range']) ? $data['range'] : null,
        json_encode($data, JSON_UNESCAPED_UNICODE),
        date('Y-m-d H:i:s')
      ]);

      echo json_encode(["ok" => true, "lead" => $newLead]);
      exit;
    } catch (PDOException $e) {
      error_log("SQL save error in leads.php: " . $e->getMessage());
    }
  }

  // File fallback
  $leads = readJsonFileFallback('leads.json', '[]');
  $leads[] = $newLead;
  writeJsonFileFallback('leads.json', $leads);

  echo json_encode(["ok" => true, "lead" => $newLead]);
  exit;
}
?>
