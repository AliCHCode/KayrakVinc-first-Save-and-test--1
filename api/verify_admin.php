<?php
/**
 * Yönetim anahtarını doğrular.
 * POST /api/verify_admin.php
 * Alanlar: admin_key (veya X-Admin-Key header)
 */
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST isteği gerekli.'], 405);
}

require_admin($config);

json_response(['success' => true, 'message' => 'Yonetim anahtari dogrulandi.']);
