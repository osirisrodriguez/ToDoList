const dateNumber = document.getElementById("dateNumber");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
const dateText = document.getElementById("dateText");

// Mostrar la fecha actual
const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.getDate();
    dateMonth.textContent = date.toLocaleString('es', { month: 'long' });
    dateYear.textContent = date.getFullYear();
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
};

setDate();

// Inicializar las tareas desde localStorage o un array vacío si no hay tareas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const tasksContainer = document.getElementById('tasksContainer');

// Renderizar todas las tareas al cargar la página
const renderTasks = () => {
    tasksContainer.innerHTML = '';  // Limpiar el contenedor de tareas

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', 'roundBorder');
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskElement.appendChild(taskText);

        // Botón de editar tarea
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => openEditModal(index);
        taskElement.appendChild(editButton);

        // Botón de eliminar tarea
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => openDeleteModal(index);
        taskElement.appendChild(deleteButton);

        tasksContainer.appendChild(taskElement);
    });

    // Guardar las tareas en localStorage y en la consola
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tareas actuales:', tasks);
};

// Abrir modal para agregar nueva tarea
const openAddTaskModal = () => {
    document.getElementById('addTaskModal').style.display = 'block';
};

// Cerrar modal de agregar tarea
const closeAddTaskModal = () => {
    document.getElementById('addTaskModal').style.display = 'none';
};

// Guardar nueva tarea desde el modal
const saveNewTask = () => {
    const newTitle = document.getElementById('newTaskTitle').value.trim();
    const newDate = document.getElementById('newTaskDate').value;
    const newText = document.getElementById('newTaskText').value.trim();

    if (newTitle === '' || newText === '') return;  // Validar campos vacíos

    const newTask = { 
        text: newText,
        title: newTitle,
        date: newDate || new Date().toISOString().split('T')[0]  // Fecha actual si no se especifica
    };

    tasks.push(newTask);
    closeAddTaskModal();
    renderTasks();
};

// Inicializar eventos de modal de agregar tarea
document.getElementById('closeAddTaskModal').onclick = closeAddTaskModal;
document.getElementById('saveNewTaskButton').onclick = saveNewTask;

// Funciones para abrir y cerrar otros modales (editar, eliminar)
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

closeModal.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    } else if (event.target == document.getElementById('addTaskModal')) {
        closeAddTaskModal();
    }
};

// Abrir modal para editar tarea
const openEditModal = (index) => {
    const modalBody = document.getElementById('modalBody');
    const task = tasks[index];
    modalBody.innerHTML = `
        <h2>Editar Tarea</h2>
        <label for="editTaskTitle">Título:</label>
        <input type="text" id="editTaskTitle" value="${task.title}" />
        
        <label for="editTaskDate">Fecha:</label>
        <input type="date" id="editTaskDate" value="${task.date}" />
        
        <label for="editTaskInput">Descripción:</label>
        <textarea id="editTaskInput">${task.text}</textarea>
        
        <button onclick="saveTask(${index})">Guardar</button>
        <button onclick="closeModal()">Cancelar</button>
    `;
    modal.style.display = 'block';
};

// Guardar cambios en la tarea
const saveTask = (index) => {
    const newTitle = document.getElementById('editTaskTitle').value.trim();
    const newDate = document.getElementById('editTaskDate').value;
    const newText = document.getElementById('editTaskInput').value.trim();

    if (newTitle !== '' && newText !== '') {
        tasks[index].title = newTitle;
        tasks[index].date = newDate;
        tasks[index].text = newText;
        modal.style.display = 'none';
        renderTasks();
    }
};

// Abrir modal para confirmar eliminación de tarea
const openDeleteModal = (index) => {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>Eliminar Tarea</h2>
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
        <button onclick="deleteTask(${index})">Sí, eliminar</button>
        <button onclick="closeModal()">Cancelar</button>
    `;
    modal.style.display = 'block';
};

// Eliminar una tarea
const deleteTask = (index) => {
    tasks.splice(index, 1);
    modal.style.display = 'none';
    renderTasks();
};

// Función para ordenar las tareas por fecha
const renderOrderedTasks = () => {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderTasks();
};

// Inicializar la aplicación renderizando las tareas
renderTasks();