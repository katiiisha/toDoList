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
    RenderTask();
    add.value = '';
})
const RenderTask = (task) => { 
    
    ul.innerHTML = '';
    //добавляем задачу на страницу
    tasks.forEach(task => { 
        
        //создаем элементы 
        const li = document.createElement('li');
        const inp = document.createElement('input');
        const btn_del = document.createElement('button');
        const checkbox = document.createElement('input');

        // задаем клаасы элементам 
        li.className = 'li';
        inp.className = 'task';
        btn_del.className = 'btn_del';
        checkbox.className = 'check_input';
        checkbox.type= 'checkbox'
        

        // добавляем элементы в html разметку
        li.append(inp, btn_del, checkbox);
        ul.append(li);
        inp.value = task.text
        btn_del.innerHTML = '<img src="/image/delete.svg">'
    })
}
