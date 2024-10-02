
const login = () => {
    // Obtener los valores de los campos de entrada
    const usuarioIngresado = document.getElementById('usuario').value;
    const passwordIngresado = document.getElementById('clave').value;

    // Validar que los campos no estén vacíos
    if (usuarioIngresado === "" || passwordIngresado === "") {
        alert('Por favor, rellena todos los campos');
        return;
    }

    // Enviar los datos al servidor usando fetch
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: usuarioIngresado, clave: passwordIngresado })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login exitoso');
            window.location.href = 'agenda.html'; // Redirigir a la página de agenda
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con el servidor. Inténtalo de nuevo más tarde.');
    });
};