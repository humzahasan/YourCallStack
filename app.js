//Selector
const input = document.querySelector('.input');
const add = document.querySelector('.add');
const todo = document.querySelector('.todo__list');

//Event Listner
document.addEventListener('DOMContentLoaded', getFromLocal);
add.addEventListener('click', addTodo);
todo.addEventListener('click', deleteCheck);

//Functions
function addTodo(e) {
  e.preventDefault();
  const container = document.createElement('div');
  container.classList.add('todo__container');
  const item = document.createElement('li');
  item.classList.add('todo__item');
  item.innerText = input.value;
  addToLocal(input.value);
  container.appendChild(item);
  const done = document.createElement('button');
  done.classList.add('completed');
  done.innerHTML = '<i class="fas fa-check"></i>';
  container.appendChild(done);
  const trash = document.createElement('button');
  trash.classList.add('trash');
  trash.innerHTML = '<i class="fas fa-trash"></i>';
  container.appendChild(trash);
  todo.appendChild(container);
  input.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === 'trash') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    deleteFromLocal(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  } else if (item.classList[0] === 'completed') {
    item.parentElement.classList.toggle('done');
  }
}

function addToLocal(todo) {
  let todos;
  console.log(todo);
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(todos);
  todos.push(todo);
  console.log(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromLocal() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (el) {
    const container = document.createElement('div');
    container.classList.add('todo__container');
    const item = document.createElement('li');
    item.classList.add('todo__item');
    item.innerText = el;
    container.appendChild(item);
    const done = document.createElement('button');
    done.classList.add('completed');
    done.innerHTML = '<i class="fas fa-check"></i>';
    container.appendChild(done);
    const trash = document.createElement('button');
    trash.classList.add('trash');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    container.appendChild(trash);
    todo.appendChild(container);
  });
}

function deleteFromLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log();
  const indexTodo = todos.indexOf(todo.children[0].innerText);
  if (indexTodo > -1) {
    todos.splice(indexTodo, 1);
    console.log(indexTodo);
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}
