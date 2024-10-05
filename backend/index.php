<?php
// Datos de conexión
$servidor = "localhost";  // Puede ser '127.0.0.1' o una dirección IP
$usuario = "root";  // El nombre de usuario de la base de datos
$password = "";  // La contraseña del usuario
$base_datos = "to do list";  // El nombre de tu base de datos

// Crear la conexión
$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

var_dump("hola");
$conexion->close();
?>

