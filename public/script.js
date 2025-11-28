document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Load todos on page load
  loadTodos();

  // Add todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      addTodo(text);
      todoInput.value = '';
    }
  });

  // Delete todo
  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.parentElement.dataset.id;
      deleteTodo(id);
    }
  });

  async function loadTodos() {
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      renderTodos(todos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }

  async function addTodo(text) {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        loadTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function toggleTodo(id) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        loadTodos();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        loadTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.dataset.id = todo.id;
      li.className = todo.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${todo.text}</span>
        <button class="toggle-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }
});
