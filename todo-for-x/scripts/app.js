let todos = [];
const TODO_KEY = "TODO_KEY";

const todosContainer = document.getElementById("days");
const nextTodo = document.querySelector(".todo__day");

function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = "";
  for (const index in todos) {
    const element = document.createElement("div");
    element.classList.add("todo");
    if (todos[index].completed) {
      element.innerHTML = `
        <div class="todo__dayChecked">Дело ${Number(index) + 1}</div>
        <div class="todo__commentChecked">${todos[index].data}</div>
        <button class="todo__delete" onclick="deleteTodo(${index})">
          <img src="./images/delete.svg" alt="Удалить дело ${Number(index) + 1}" />
        </button>`;
    } else {
      element.innerHTML = `
        <div class="todo__day">Дело ${Number(index) + 1}</div>
        <div class="todo__comment">${todos[index].data}</div>
        <input type="text" class="todo__input" onblur="cancelEdit(${index}, this)" onkeyup="if(event.keyCode === 13) editTodo(${index}, this)" value="${todos[index].data}" />
        <button class="todo__check" onclick="completeTodo(${index})">
          <img src="./images/check.svg" alt="Завершить дело ${Number(index) + 1}" />
        </button>
        <button class="todo__delete" onclick="deleteTodo(${index})">
          <img src="./images/delete.svg" alt="Удалить дело ${Number(index) + 1}" />
        </button>`;
    }
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}

/* work with todos */
function addTodo() {
  const dataElement = document.getElementById("comment");
  const data = dataElement.value.trim();
  if (!data) {
    return;
  }

  todos.push({ data, completed: false });
  dataElement.value = "";

  rerender();
  saveData();
}

function deleteTodo (index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

function cancelEdit (index, input) {
  input.value = todos[index].data;
}

function editTodo (index, input) {
  todos[index].data = input.value.trim() || todos[index].data;
  rerender();
  saveData();
}

function completeTodo (index) {
  todos[index].completed = true;
  rerender();
  saveData();
}

/* init */
(() => {
  loadData();
  rerender();
})();