<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

if ($path === '/api/health' || str_ends_with($path, '/backend/api.php')) {
    echo json_encode([
        'success' => true,
        'service' => 'Practical Science Platform API',
        'status' => 'online',
        'timestamp' => gmdate('c'),
    ], JSON_PRETTY_PRINT);
    exit;
}

http_response_code(404);
echo json_encode(['success' => false, 'message' => 'Endpoint not found']);
