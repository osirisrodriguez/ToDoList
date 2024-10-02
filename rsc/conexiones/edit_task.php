<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $text = $_POST['text'];
    $date = $_POST['date'];

    if (!empty($id) && !empty($title) && !empty($text)) {
        $stmt = $pdo->prepare("UPDATE tasks SET title = :title, text = :text, date = :date WHERE id = :id");
        $stmt->execute(['title' => $title, 'text' => $text, 'date' => $date, 'id' => $id]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Campos vacíos']);
    }
}
?>