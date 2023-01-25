//хранение переменных
const dom = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'), 
}

//массив задач
const tasks = [];

//отседили клик по кнопке и добавили новую задачу
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if (newTaskText && isNotHaveTask(newTaskText, tasks)) { 
        addTask(newTaskText, tasks)
        // после добавления задачи очищаем поле ввода
        dom.new.value = '';
        tasksRender(tasks);
    }

}

 // функция добавления задачи 
function addTask(text, list) {
    // переменная для получения id, тк функция фиксирует уникальное время 
    const timestamp = Date.now();
      const task = {
         id: timestamp,
         //название перенной совпадет со свойством функции можно не просивыть значение оно установится с полученной переменной
         text,
         isComplete: false,
      }
    list.push(task)
} 

 // проверка на наличие аналогичной задачи 
function isNotHaveTask(text, list) {
    const isNotHave = true; 
    list.forEach(task => {
        if (task.text === text) { 
            alert('Задача уже существует')
            isNotHave = false; 
        }
          
    });
    return isNotHave;
}

 // функция вывода задач на сайт 
 function tasksRender(list) {
     let htmlList = '';
     
     list.forEach((task) => { 
         const cls = task.isComplete
             ? 'todo-task todo-task-complete'
             : 'todo-task'
         const cheсked = task.isComplete ? 'cheсked' : ''
         const taskHtml = `
        <div class="${cls}" id="${task.id}">
        <div class="todo-task-text">
            ${task.text} 
        </div>
        <label class="todo-checkbox">
            <input type="checkbox" ${cheсked }>
            <div class="todo-checkbox-div"></div>
        </label>
        <div class="todo-del">
            <img src="img/delete.svg" alt="">
         </div>
        </div>
         `
         htmlList = htmlList + taskHtml;
     })
     dom.tasks.innerHTML = htmlList;
     
 }

 //отслеживаем клик по чекбоксу задачи
dom.tasks.onclick = (event) => { 
    const target = event.target;
    
    const isCheckboxEl = target.classList.contains('todo-checkbox-div')
    if (isCheckboxEl) { 
        const task = target.parentElement.parentElement; 
        const taskId = task.getAttribute('id');  
        changeTaskStatus(taskId, tasks);
        tasksRender(tasks);
    }
   
}
// отлеживание статуса, так как при выводе задчи атоматически стоял статус выполненой 
function changeTaskStatus(id, list) {
    list.forEach((task) => { 
        if (task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
}











// let cbox = document.querySelector('.cbox');
// let text = document.querySelector('.todo-task-title')
// let cb = document.querySelector('.cb');
//  cbox.addEventListener("change", function () {
//     if (this.checked) {
//         text.style.borderColor = '#01504A';
//         text.style.textDecoration = 'line-through';
//         text.style.textDecorationThickness = '2px';
//         text.style.color = 'grey';
//         cb.style.borderColor = '#01504A';

//     } else {
//         text.style.borderColor = '#A13822';
//         text.style.textDecoration = 'none';
//         text.style.color = '#402922';
//         cb.style.borderColor = '#A13822';
//     }
// })
