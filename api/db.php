<?php
/**
 * Ortak veritabanı bağlantısı ve yardımcı fonksiyonlar.
 * Tüm API uçları bu dosyayı require eder.
 */

header('Content-Type: application/json; charset=utf-8');

/**
 * JSON yanıtı döndürür ve script'i sonlandırır.
 */
function json_response($data, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    json_response([
        'success' => false,
        'message' => 'config.php bulunamadı. config.example.php dosyasını kopyalayıp config.php olarak doldurun.'
    ], 500);
}

$config = require $configFile;

// CORS başlıkları
$origin = $config['allowed_origin'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Key');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Veritabanı bağlantısı (PDO)
try {
    $dsn = "mysql:host={$config['db_host']};dbname={$config['db_name']};charset={$config['db_charset']}";
    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    json_response(['success' => false, 'message' => 'Veritabanı bağlantı hatası.'], 500);
}

/**
 * Yönetici anahtarını doğrular. Hatalıysa 401 döner.
 */
function require_admin(array $config): void
{
    $key = $_SERVER['HTTP_X_ADMIN_KEY'] ?? ($_POST['admin_key'] ?? '');
    $expected = (string) ($config['admin_key'] ?? '');
    if ($expected === '' || !hash_equals($expected, (string) $key)) {
        json_response(['success' => false, 'message' => 'Yetkisiz işlem. Yönetim anahtarı hatalı.'], 401);
    }
}

/**
 * Türkçe karakterleri de dikkate alan slug üretir.
 */
function slugify(string $text): string
{
    $text = mb_strtolower($text, 'UTF-8');
    $tr = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'â', 'î', 'û'];
    $en = ['c', 'g', 'i', 'o', 's', 'u', 'a', 'i', 'u'];
    $text = str_replace($tr, $en, $text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');
    return $text !== '' ? $text : 'urun';
}
