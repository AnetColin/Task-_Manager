document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to create a new task item
    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        
        // Add event listener for toggling completion
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Add event listener for deleting the task
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the parent 'li' click event
            li.remove();
        });

        return li;
    }

    // Function to handle adding a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = createTaskItem(taskText);
            taskList.appendChild(newTask);
            taskInput.value = ''; // Clear the input field
        }
    }

    // Add task on button click
    addTaskBtn.addEventListener('click', addTask);

    // Add task on pressing Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});