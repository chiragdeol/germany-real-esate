<?php
/**
 * Database connection & file system fallback helper
 */

require_once __DIR__ . '/config.php';

// Try to establish PDO connection
function getDbConnection() {
  if (!defined('DB_HOST') || empty(DB_HOST) || empty(DB_USER) || empty(DB_NAME)) {
    return null; // Configurations are blank, use server files
  }

  try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT . ";charset=utf8mb4";
    $options = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    return new PDO($dsn, DB_USER, DB_PASS, $options);
  } catch (PDOException $e) {
    // Log error internally and fallback silently
    error_log("MySQL connection failed: " . $e->getMessage());
    return null;
  }
}

// Server File Fallback Helper Functions
function getServerFileDirectory() {
  $dir = __DIR__ . '/../../data';
  if (!file_exists($dir)) {
    mkdir($dir, 0755, true);
  }
  return $dir;
}

function readJsonFileFallback($filename, $defaultContent = '[]') {
  $dir = getServerFileDirectory();
  $filepath = $dir . '/' . $filename;
  if (!file_exists($filepath)) {
    file_put_contents($filepath, $defaultContent);
  }
  $raw = file_get_contents($filepath);
  return json_decode($raw, true) ?: [];
}

function writeJsonFileFallback($filename, $data) {
  $dir = getServerFileDirectory();
  $filepath = $dir . '/' . $filename;
  file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
?>
