<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'method_not_allowed','message'=>'POST only'], JSON_UNESCAPED_UNICODE); exit; }

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) { http_response_code(400); echo json_encode(['error'=>'bad_json','message'=>'JSON غير صالح'], JSON_UNESCAPED_UNICODE); exit; }

$question = trim((string)($payload['question'] ?? ''));
$mode = trim((string)($payload['mode'] ?? 'investment'));
$context = $payload['context'] ?? [];
if ($question === '') { http_response_code(400); echo json_encode(['error'=>'empty_question','message'=>'السؤال فارغ'], JSON_UNESCAPED_UNICODE); exit; }
if (mb_strlen($question, 'UTF-8') > 2000) { http_response_code(400); echo json_encode(['error'=>'question_too_long','message'=>'السؤال طويل جداً'], JSON_UNESCAPED_UNICODE); exit; }

$config = [];
$configFile = __DIR__ . '/config.php';
if (file_exists($configFile)) { $loaded = include $configFile; if (is_array($loaded)) $config = $loaded; }
$apiKey = getenv('OPENAI_API_KEY') ?: ($config['OPENAI_API_KEY'] ?? '');
$model = getenv('OPENAI_MODEL') ?: ($config['OPENAI_MODEL'] ?? 'gpt-5.5');
if (!$apiKey || strpos($apiKey, 'ضع_') === 0) {
  http_response_code(503);
  echo json_encode([
    'error' => 'missing_api_key',
    'message' => 'لم يتم إعداد OPENAI_API_KEY على الخادم. انسخ api/config.sample.php إلى api/config.php وضع المفتاح، أو عرّف OPENAI_API_KEY كمتغير بيئة.'
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$system = "أنت مساعد ذكي متخصص في الاستثمار السياحي والتحليل المكاني لتطبيق GIS في الأردن. أجب بالعربية الرسمية الواضحة. اعتمد فقط على السياق المرسل من التطبيق والبيانات المكانية/الإحصائية المتاحة فيه. لا تخترع أرقاماً رسمية غير موجودة في السياق. إذا كانت البيانات غير كافية قل ذلك بوضوح. نظّم الإجابة إلى: الخلاصة، نوع الاستثمار/الفعالية/المسار عند الحاجة، مبرر مكاني، تحليل البنية التحتية، المخاطر، التوصيات. لا تطلب بيانات شخصية.";
$userInput = [
  ['type' => 'input_text', 'text' => "نمط التحليل: {$mode}\nالسؤال: {$question}\n\nسياق الخريطة والبيانات:\n" . json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]
];
$body = [
  'model' => $model,
  'input' => [
    ['role' => 'system', 'content' => [['type'=>'input_text','text'=>$system]]],
    ['role' => 'user', 'content' => $userInput]
  ],
  'max_output_tokens' => 1200
];

$ch = curl_init('https://api.openai.com/v1/responses');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
  ],
  CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
  CURLOPT_TIMEOUT => 60
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) { http_response_code(502); echo json_encode(['error'=>'curl_error','message'=>$curlError], JSON_UNESCAPED_UNICODE); exit; }
$data = json_decode($response, true);
if ($httpCode < 200 || $httpCode >= 300) {
  http_response_code($httpCode);
  echo json_encode(['error'=>'openai_error','message'=>$data['error']['message'] ?? 'OpenAI API error','details'=>$data], JSON_UNESCAPED_UNICODE);
  exit;
}

$answer = $data['output_text'] ?? '';
if (!$answer && isset($data['output']) && is_array($data['output'])) {
  foreach ($data['output'] as $item) {
    foreach (($item['content'] ?? []) as $content) {
      if (isset($content['text'])) $answer .= $content['text'];
    }
  }
}

echo json_encode(['answer'=>$answer, 'model'=>$model], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
