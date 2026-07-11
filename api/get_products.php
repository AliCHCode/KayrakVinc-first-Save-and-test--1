<?php
/**
 * Ürün listesini (her ürünün resim sayısıyla birlikte) döndürür.
 * GET /api/get_products.php
 */
require __DIR__ . '/db.php';

$sql = "SELECT p.id, p.name, p.slug, COUNT(i.id) AS image_count
        FROM products p
        LEFT JOIN images i ON i.product_id = p.id
        GROUP BY p.id, p.name, p.slug
        ORDER BY p.name ASC";

try {
    $products = $pdo->query($sql)->fetchAll();
} catch (PDOException $e) {
    json_response([
        'success' => false,
        'message' => 'Urunler alinamadi. Veritabani tablolarini ve baglanti bilgilerini kontrol edin.'
    ], 500);
}

// Sayısal alanları int'e çevir
foreach ($products as &$p) {
    $p['id'] = (int) $p['id'];
    $p['image_count'] = (int) $p['image_count'];
}

json_response(['success' => true, 'products' => $products]);
