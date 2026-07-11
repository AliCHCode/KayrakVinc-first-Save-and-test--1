<?php
/**
 * Yeni ürün ekler.
 * POST /api/add_product.php
 * Alanlar: name, admin_key (veya X-Admin-Key header)
 */
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST isteği gerekli.'], 405);
}

require_admin($config);

$name = trim($_POST['name'] ?? '');
if ($name === '') {
    json_response(['success' => false, 'message' => 'Ürün adı zorunlu.'], 422);
}
if (mb_strlen($name) > 150) {
    json_response(['success' => false, 'message' => 'Ürün adı en fazla 150 karakter olabilir.'], 422);
}

$slug = slugify($name);

try {
    $stmt = $pdo->prepare("INSERT INTO products (name, slug) VALUES (?, ?)");
    $stmt->execute([$name, $slug]);
    $id = (int) $pdo->lastInsertId();

    json_response([
        'success' => true,
        'product' => [
            'id'          => $id,
            'name'        => $name,
            'slug'        => $slug,
            'image_count' => 0,
        ],
    ]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        json_response(['success' => false, 'message' => 'Bu ürün zaten mevcut.'], 409);
    }
    json_response(['success' => false, 'message' => 'Ürün eklenemedi.'], 500);
}
