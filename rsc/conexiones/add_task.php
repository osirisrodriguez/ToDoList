<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $text = $_POST['text'];
    $date = $_POST['date'];

    if (!empty($title) && !empty($text)) {
        $stmt = $pdo->prepare("INSERT INTO tasks (title, text, date) VALUES (:title, :text, :date)");
        $stmt->execute(['title' => $title, 'text' => $text, 'date' => $date]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Campos vacíos']);
    }
}
?>