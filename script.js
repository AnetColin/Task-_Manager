document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const priorityInput = document.getElementById('priorityInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const progressBar = document.getElementById('progressBar');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    progressBar.value = total ? (completed / total) * 100 : 0;
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('task-item', `priority-${task.priority}`);
      if (task.completed) li.classList.add('completed');

      const details = document.createElement('div');
      details.classList.add('task-details');
      details.innerHTML = `
        <span><strong>${task.name}</strong></span>
        <span>Deadline: ${task.deadline}</span>
        <span>Priority: ${task.priority}</span>
      `;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(details);
      li.appendChild(checkbox);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
    updateProgress();
  }

  function addTask() {
    const name = taskInput.value.trim();
    const deadline = deadlineInput.value;
    const priority = priorityInput.value;

    if (name && deadline && priority) {
      tasks.push({ name, deadline, priority, completed: false });
      saveTasks();
      taskInput.value = '';
      deadlineInput.value = '';
      priorityInput.value = 'Low';
      renderTasks();
    }
  }

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
  });

  renderTasks();
});
