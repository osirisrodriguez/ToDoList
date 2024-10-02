<?php
require 'config.php';

$stmt = $pdo->query("SELECT * FROM tasks ORDER BY date ASC");
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);
?>