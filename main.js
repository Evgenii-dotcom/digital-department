const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Загружаем список задач из localStorage при загрузке страницы
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo.text, todo.completed));
}

// Добавляем новую задачу
function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText) {
        addTodoToList(taskText, false);
        todoInput.value = '';
    }
}

// Функция добавления задачи в DOM
function addTodoToList(text, completed) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.onchange = () => saveTodos();

    const label = document.createElement('span');
    label.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => {
        todoList.removeChild(listItem);
        saveTodos();
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    saveTodos();
}

// Сохраняем текущее состояние списка в localStorage
function saveTodos() {
    const todos = Array.from(todoList.children).map(item => {
        return {
            text: item.querySelector('span').textContent,
            completed: item.querySelector('input').checked
        };
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Очистка списка задач
function clearTodos() {
    todoList.innerHTML = '';
    localStorage.removeItem('todos');
}

// Добавляем обработчики событий
addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click', clearTodos);
window.addEventListener('load', loadTodos);