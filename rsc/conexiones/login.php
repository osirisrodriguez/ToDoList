<?php
// Conectar a la base de datos
$host = 'localhost'; // Cambia por la dirección de tu servidor de base de datos
$dbname = 'nombre_de_tu_base_de_datos';
$username = 'tu_usuario';
$password = 'tu_contraseña';

$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error al conectar a la base de datos.']));
}

// Obtener el contenido del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);
$usuario = $data['usuario'];
$clave = $data['clave'];

// Verificar si el usuario existe
$query = $conn->prepare('SELECT password FROM usuarios WHERE usuario = ?');
$query->bind_param('s', $usuario);
$query->execute();
$query->store_result();

// Verificar si el usuario fue encontrado
if ($query->num_rows > 0) {
    $query->bind_result($hashedPassword);
    $query->fetch();

    // Verificar la contraseña (si usas hashing)
    if (password_verify($clave, $hashedPassword)) {
        echo json_encode(['success' => true, 'message' => 'Login exitoso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}

$query->close();
$conn->close();
?>