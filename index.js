//создание переменных 
const search = document.querySelector('.search');
const add = document.querySelector('.add');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.task-board');
const progress = document.querySelector('progress');
const progress_bar = document.querySelector('.progress-bar');

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
    add.value = '';
    search.value = '';
    addTask(task);
    RenderTask();
   
    
    
})

search.addEventListener('keyup', () => {
    RenderTask();
})

let countDone = 0
let progress_bar_max = 0 
const RenderTask = (task) => { 
    ul.innerHTML = '';
    //поиск по задачам 
    const query = search.value || '';
    const SearchTask = tasks.filter((task) => { 
        if (query == '') return true;
        return task.text.toLowerCase().includes(query.toLowerCase());
    })
    //добавляем задачу на страницу
    SearchTask.forEach(task => { 
        
        //создаем элементы 
        const li = document.createElement('li');
        const inp = document.createElement('input');
        const btn_del = document.createElement('button');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        const customCheck = document.createElement('span');

        // задаем клаасы элементам 
        li.className = 'li';
        inp.className = 'task';
        btn_del.className = 'btn_del';
        customCheck.className = 'check_box';
        checkbox.className = 'check_input';
        checkbox.type = 'checkbox';
        label.className = 'check option';
        

        // добавляем элементы в html разметку
        label.append(checkbox, customCheck);
        li.append(inp, label, btn_del );
        ul.append(li);

        inp.value = task.text;
        btn_del.innerHTML = '<img src="./image/delete.svg">';

        checkbox.checked = task.done;
        //вычисляем переменные для прогресс-бара 
        progress_bar_max = SearchTask.length;
        x = Math.abs(countDone * 100 / progress_bar_max) + '%';
        progress_bar.style.width = x;
        //создаем событие при клике
        checkbox.addEventListener('click', (y) => {
            checkbox.checked == true ? countDone++ : countDone--
            markTask(task, checkbox.checked); 
            RenderTask();
            
        })
        //создаем событие при клике на кнопку удаления 
        btn_del.addEventListener('click', () => {
            checkbox.checked == true ? countDone-- : countDone

            removeTask(task);
            RenderTask();
        })
        styleCheck(checkbox.checked, inp);
    })
}

//меняем цвет задачи при ее выполнении
const styleCheck = (check, elem) => {
    if (check == true) elem.classList.add('green');
}
//меняем состояние чекбокса
const markTask = (task, mark) => {
    const index = tasks.findIndex((t) => { return t.id === task.id; });
    tasks[index].done = !!mark;
}
// удаляем задачу из массива
const removeTask = (task) => {
    const index = tasks.findIndex((t) => { return t.id === task.id });
    tasks.splice(index, 1);   
}

