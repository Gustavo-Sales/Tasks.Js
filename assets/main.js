function app() {

    const inputTask = document.querySelector('#input-task');
    const btnAddTask = document.querySelector('#btn-add-task');
    const tasks = document.querySelector('#tasks-list');

    const createTagLi = () => document.createElement('li');

    const createButtonDelete = (li) => {
        const btnDelete = document.createElement('button');
        btnDelete.innerText = 'delete';
        btnDelete.setAttribute('id', 'delete-task');
        li.appendChild(btnDelete);
    };

    function clearInput() {
        inputTask.value = '';
        inputTask.focus();
    };

    function saveTasks() {
        const listTasks = tasks.querySelectorAll('li');
        const allTasks = [];

        for (let task of listTasks) {
            let taskText = task.innerText;
            taskText = taskText.replace('delete', '').trim();
            allTasks.push(taskText);
        }

        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }

    function recoverTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        const allTasks = JSON.parse(tasks);

        for (let task of allTasks) {
            createTask(task);
        };
    }

    function createTask(text) {
        const li = createTagLi();
        li.textContent = text;
        tasks.appendChild(li);
        clearInput();
        createButtonDelete(li);
        saveTasks();
    };

    inputTask.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            if (!inputTask.value) return;
            createTask(inputTask.value);
        };
    });

    btnAddTask.addEventListener('click', (e) => {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    });

    document.addEventListener('click', (e) => {
        if (e.target.id === 'delete-task') {
            e.target.parentElement.remove();
            saveTasks();
        };
    })

    recoverTasksFromLocalStorage();
}

app()
