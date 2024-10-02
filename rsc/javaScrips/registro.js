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

    // Validar que las claves coincidan
    if (clave !== confirmarClave) {
        alert('Las claves no coinciden');
        return;
    }

    // Verificar si el nombre de usuario ya está registrado
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

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'file:///C:/Users/sisoo/Desktop/to_do_list/rsc/vista/login.html';  
};

// Asignar la función al botón de registro
document.getElementById('registerButton').addEventListener('click', registro);