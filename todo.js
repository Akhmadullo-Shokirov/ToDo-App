const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const todosL = JSON.parse(localStorage.getItem("todos"));
todosL.forEach(todoL => {
    addTodo(todoL);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    addTodo();
});

// adds a new todo item to the list
function addTodo(todo) {
    let todoText = input.value;

    if(todo) {
        todoText = todo.text;
    }
    if(todoText) {
        const todoEl = document.createElement("li");

        if(todo && todo.completed) {
            todoEl.classList.add("completed");
        }
        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle("completed"); 
            updateLS();   
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todos.appendChild(todoEl);
        updateLS();
        input.value = '';
    }
}

// updates the local storage
function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}