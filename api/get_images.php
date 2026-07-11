<?php
/**
 * Resimleri döndürür. product_id verilirse sadece o ürünün resimleri,
 * verilmezse tüm resimler döner.
 * GET /api/get_images.php            -> tümü
 * GET /api/get_images.php?product_id=3 -> tek ürün
 */
require __DIR__ . '/db.php';

$productId = isset($_GET['product_id']) ? (int) $_GET['product_id'] : 0;

if ($productId > 0) {
    $stmt = $pdo->prepare(
        "SELECT i.id, i.product_id, i.file_path, i.original_name, p.name AS product_name
         FROM images i
         JOIN products p ON p.id = i.product_id
         WHERE i.product_id = ?
         ORDER BY i.id DESC"
    );
    $stmt->execute([$productId]);
} else {
    $stmt = $pdo->query(
        "SELECT i.id, i.product_id, i.file_path, i.original_name, p.name AS product_name
         FROM images i
         JOIN products p ON p.id = i.product_id
         ORDER BY i.id DESC"
    );
}

$images = $stmt->fetchAll();
foreach ($images as &$img) {
    $img['id'] = (int) $img['id'];
    $img['product_id'] = (int) $img['product_id'];
}

json_response(['success' => true, 'images' => $images]);
