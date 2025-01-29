const todoInput = document.getElementById('todoInput');
const imageInput = document.getElementById('imageInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos(filter = 'all') {
      todoList.innerHTML = '';
      const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true;
      });

      filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.draggable = true;

        li.innerHTML = `
          <img src="${todo.image || ''}" alt="Task Image">
          <span class="text">${todo.text}</span>
          <div class="actions">
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="deleteTodo(${index})">❌</button>
          </div>
        `;

        todoList.appendChild(li);
      });
    }

    addTodoBtn.addEventListener('click', () => {
      const text = todoInput.value.trim();
      const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

      if (!text) return alert('Task cannot be empty !!!');

      todos.push({ text, image, completed: false });
      saveTodos();
      renderTodos();
      todoInput.value = '';
      imageInput.value = '';
    });

    function toggleComplete(index) {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    }

    function deleteTodo(index) {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTodos(btn.dataset.filter);
      });
    });

    // Initial render
    renderTodos();