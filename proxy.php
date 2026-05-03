<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit; }
if (!isset($_GET["url"]) || empty($_GET["url"])) { echo json_encode(["error" => "No URL specified"], JSON_UNESCAPED_UNICODE); exit; }
$url = $_GET["url"];
$allowedDomains = ["maps.dls.gov.jo"];
$parsed = parse_url($url);
if (!$parsed || !isset($parsed["host"])) { echo json_encode(["error" => "Invalid URL"], JSON_UNESCAPED_UNICODE); exit; }
$host = strtolower($parsed["host"]);
$allowed = false;
foreach ($allowedDomains as $domain) { if (strpos($host, $domain) !== false) { $allowed = true; break; } }
if (!$allowed) { echo json_encode(["error" => "Domain not allowed"], JSON_UNESCAPED_UNICODE); exit; }
$ch = curl_init();
curl_setopt_array($ch, [
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_TIMEOUT => 60,
  CURLOPT_CONNECTTIMEOUT => 30,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_SSL_VERIFYHOST => false,
  CURLOPT_HTTPHEADER => [
    "Referer: https://maps.dls.gov.jo/dlsweb/",
    "Origin: https://maps.dls.gov.jo",
    "Accept: application/json,text/plain,*/*",
    "Connection: keep-alive"
  ],
  CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);
if ($response === false) { echo json_encode(["error" => "cURL failed", "details" => $error], JSON_UNESCAPED_UNICODE); exit; }
http_response_code($httpCode);
echo $response;
?>
