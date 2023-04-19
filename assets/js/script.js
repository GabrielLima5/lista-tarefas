const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.task-list');
const editForm = document.querySelector('#task-edit');
const editInput = document.querySelector('#task-edit input');
const cancelEditBtn = document.querySelector('#cancel-edition');
let oldInputValue;

function initEvents(){
    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        const taskInput = document.querySelector('#task-form input')
        const taskName = taskInput.value
        taskInput.value = ''

        if (taskName){
            saveTask(taskName)
            toggleScroll()
        }
    });

    document.addEventListener('click', e => {
        const targetEl = e.target
        const parentEl = targetEl.closest('.task')
        let taskTitle;

        if (parentEl && parentEl.querySelector('span')){
            taskTitle = parentEl.querySelector('span').innerText
        }

        if (targetEl.classList.contains('done-task')){
            parentEl.classList.toggle('done')
        }

        if (targetEl.classList.contains('delete-task')){
            parentEl.remove()
            toggleScroll()
        }

        if (targetEl.classList.contains('edit-task')){
            toggleForms();
            editInput.value = taskTitle
            oldInputValue = taskTitle
        }

        if (targetEl.classList.contains('cancel')){
            toggleForms()
        }
    });
    
    editForm.addEventListener('submit', e => {
        e.preventDefault();
        const editInputValue = editInput.value
     
        if (editInputValue){
            updateTask(editInputValue)
        }

        toggleForms();
    });
}

initEvents();

function toggleForms(){
    taskForm.classList.toggle('hide')
    editForm.classList.toggle('hide')
    taskList.classList.toggle('hide')
}

function updateTask(taskName){
    const allTasks = document.querySelectorAll('.task');

    allTasks.forEach(task => {

        let taskTitle = task.querySelector('span')

        if (taskTitle.innerText == oldInputValue){
            taskTitle.innerText = taskName
        }
    })
}

function saveTask(taskName){
    let div = document.createElement('div')
    div.innerHTML = `
        <div class="task-name">
            <span class="task-name">${taskName}</span>
        </div>

        <div class="task-buttons">
            <button class="done-task">
                <i class="done-task fa-solid fa-check"></i>
            </button>
            <button class="edit-task">
                <i class="edit-task fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete-task">
                <i class="delete-task fa-solid fa-delete-left"></i>
            </button>
        </div>`

    div.classList.add('task')
    taskList.appendChild(div)
}

function toggleScroll(){
    const allTasks = document.querySelectorAll('.task');
    const container = document.querySelector('.container')
    allTasks.forEach((task, index) => {
        if (index > 4){
            container.style.overflowY = 'scroll'
        } else {
            container.style.overflowY = 'unset'
        }
    })
}