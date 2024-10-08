<?php
// Parámetros de conexión
$servername = "localhost";  // O IP del servidor de MariaDB
$username = "";   // El usuario de la base de datos
$password = ""; // La contraseña del usuario
$dbname = "to_do_list";     // El nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Verificar si se han enviado los datos vía POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recibir los datos del formulario
    $usuario = $_POST['usuario'];
    $clave = $_POST['clave'];

    // Verificar si el usuario ya existe
    $sql_check = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        echo "El usuario ya está registrado. Por favor, elige otro nombre.";
    } else {
        // Insertar el nuevo usuario en la base de datos
        $sql = "INSERT INTO usuarios (usuario, password) VALUES ('$usuario', '$clave')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Usuario registrado con éxito";
        } else {
            echo "Error al registrar el usuario: " . $conn->error;
        }
    }
}

// Cerrar la conexión
$conn->close();
?>