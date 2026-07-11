<?php
/**
 * Resim yükler ve veritabanına kaydeder.
 * POST (multipart/form-data) /api/upload_image.php
 * Alanlar: product_id, image (dosya), admin_key (veya X-Admin-Key header)
 */
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST isteği gerekli.'], 405);
}

require_admin($config);

$productId = (int) ($_POST['product_id'] ?? 0);
if ($productId <= 0) {
    json_response(['success' => false, 'message' => 'Lütfen bir ürün seçin.'], 422);
}

// Ürün var mı?
$chk = $pdo->prepare("SELECT id FROM products WHERE id = ?");
$chk->execute([$productId]);
if (!$chk->fetch()) {
    json_response(['success' => false, 'message' => 'Seçilen ürün bulunamadı.'], 404);
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    json_response(['success' => false, 'message' => 'Dosya yüklenemedi. Lütfen bir resim seçin.'], 422);
}

$file = $_FILES['image'];

// Boyut kontrolü (max 8 MB)
$maxSize = 8 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    json_response(['success' => false, 'message' => 'Dosya çok büyük (en fazla 8 MB).'], 422);
}

// Gerçek MIME türü kontrolü
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
];
if (!isset($allowed[$mime])) {
    json_response(['success' => false, 'message' => 'Sadece JPG, PNG, WEBP veya GIF yükleyebilirsiniz.'], 422);
}

$ext = $allowed[$mime];
$dir = __DIR__ . '/uploads';
if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
    json_response(['success' => false, 'message' => 'Yükleme klasörü oluşturulamadı.'], 500);
}

// Tahmin edilemez, güvenli dosya adı
$fname = bin2hex(random_bytes(16)) . '.' . $ext;
$dest = $dir . '/' . $fname;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    json_response(['success' => false, 'message' => 'Dosya kaydedilemedi.'], 500);
}

$relPath = 'uploads/' . $fname;
$originalName = mb_substr((string) $file['name'], 0, 255);

try {
    $stmt = $pdo->prepare("INSERT INTO images (product_id, file_path, original_name) VALUES (?, ?, ?)");
    $stmt->execute([$productId, $relPath, $originalName]);
    $id = (int) $pdo->lastInsertId();
} catch (PDOException $e) {
    @unlink($dest);
    json_response(['success' => false, 'message' => 'Kayıt oluşturulamadı.'], 500);
}

json_response([
    'success' => true,
    'image'   => [
        'id'            => $id,
        'product_id'    => $productId,
        'file_path'     => $relPath,
        'original_name' => $originalName,
    ],
]);
