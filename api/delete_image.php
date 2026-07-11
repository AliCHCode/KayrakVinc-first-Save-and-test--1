<?php
/**
 * Resim siler (hem dosyayı hem kaydı).
 * POST /api/delete_image.php
 * Alanlar: id, admin_key (veya X-Admin-Key header)
 */
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST isteği gerekli.'], 405);
}

require_admin($config);

$id = (int) ($_POST['id'] ?? 0);
if ($id <= 0) {
    json_response(['success' => false, 'message' => 'Geçersiz resim.'], 422);
}

$stmt = $pdo->prepare("SELECT file_path FROM images WHERE id = ?");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) {
    json_response(['success' => false, 'message' => 'Resim bulunamadı.'], 404);
}

$path = __DIR__ . '/' . $row['file_path'];
if (is_file($path)) {
    @unlink($path);
}

$del = $pdo->prepare("DELETE FROM images WHERE id = ?");
$del->execute([$id]);

json_response(['success' => true]);
