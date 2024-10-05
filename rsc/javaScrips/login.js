
const login = () => {
    // Obtener los valores de los campos de entrada
    const usuarioIngresado = document.getElementById('usuario').value;
    const passwordIngresado = document.getElementById('clave').value;

    // Validar que los campos no estén vacíos
    if (usuarioIngresado === "" || passwordIngresado === "") {
        alert('Por favor, rellena todos los campos');
        return;
    }

    // Obtener los datos del usuario almacenado en localStorage
    const usuarioGuardado = localStorage.getItem(usuarioIngresado);

    // Validar si el usuario existe
    if (!usuarioGuardado) {
        // Mostrar alerta con opción de redirigir a la página de registro
        if (confirm('El usuario no está registrado. ¿Deseas registrarte?')) {
            // Si se acepta, redirigir a la página de registro
            window.location.href = 'http://127.0.0.1:5500/rsc/vista/index.html'; // Cambia a la ruta de tu página de registro
        }
        return;
    }

    // Si el usuario existe, proceder sin validar la contraseña
    localStorage.setItem('usuario', JSON.stringify({
        nombreUsuario: usuarioIngresado,
        ultimoLogin: new Date().toLocaleString()
    }));

    alert('Login exitoso');
    window.location.href = 'Agenda.html'; // Redirigir a la página de agenda
};

// Asignar la función al botón de inicio de sesión
document.getElementById('loginButton').addEventListener('click', login);