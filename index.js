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

search.addEventListener('keyup', () => {
    RenderTask();
})

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
        inp.value = task.text
        btn_del.innerHTML = '<img src="/image/delete.svg">'

       //меняем стиль инпута с задачей при клике на чекбокс
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                inp.classList.add('green')
            } else { 
                inp.classList.remove('green')
            }
        })
        

        
    })
}

