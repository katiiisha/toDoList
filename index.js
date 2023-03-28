//создание переменных 
const search = document.querySelector('.search');
const add = document.querySelector('.add');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.task-board');

//массив для хранения задач
const tasks = [];

// функция добавления задач в массив 
const addTask = (task) => { 
    tasks.push(task)
}
// создание объекта при клике 
btn.addEventListener('click', () => { 
    const task = {}
    task.text = add.value;
    task.id = new Date().getTime()
    task.done = false;
    addTask(task);
})

console.log(tasks);