const registro = () => {
    // Obtener los valores de los campos de entrada
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
    const confirmarClave = document.getElementById('confirmarClave').value;

    // Validar que los campos no estén vacíos
    if (!usuario || !clave || !confirmarClave) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    // Validar que las contraseñas coincidan
    if (clave !== confirmarClave) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Verificar si el nombre de usuario ya está registrado en localStorage
    if (localStorage.getItem(usuario)) {
        alert('El nombre de usuario ya está registrado. Por favor, inicia sesión.');
        return;
    }

    // Guardar el nombre de usuario y la clave en localStorage
    localStorage.setItem(usuario, clave);
    console.log(`Datos guardados en localStorage: ${usuario} = ${localStorage.getItem(usuario)}`);

    // Mostrar un mensaje de éxito
    alert('Usuario registrado con éxito');

    // Limpiar los campos de entrada
    document.getElementById('usuario').value = '';
    document.getElementById('clave').value = '';
    document.getElementById('confirmarClave').value = '';

    // Redirigir a la página de login
    window.location.href = 'login.html'; // Cambia la ruta según tu estructura de archivos
};

// Asignar la función al botón de registro
document.getElementById('registerButton').addEventListener('click', registro);