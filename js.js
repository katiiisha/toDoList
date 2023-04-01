const inp = document.querySelector('.search');
const btn = document.querySelector('.add');
const ul = document.querySelector('.btn');
const inpFind = document.querySelector('.task-board');
const progress = document.querySelector('progress');

//массив для хранения задач
const tasks = [];
const createTasks = (task) => {
    tasks.push(task);

}
//делаем объект при клике
btn.addEventListener('click', () => {
    const task = {};
    task.text = inp.value;
    task.id = new Date().getTime()
    task.done = false;
    createTasks(task);
    renderTaskList();
    inp.value = '';
    inpFind.value = '';
})

inpFind.addEventListener('keyup', () => {
    renderTaskList();
})


const renderTaskList = () => {
    ul.innerHTML = '';
    //фильтр 
    const query = inpFind.value || '';
    const fTasks = tasks.filter((task) => {
        if (query == '') return true;
        return task.text.toLowerCase().includes(query.toLowerCase());

    })
    let countDone = 0;
    fTasks.forEach(task => {
        //создаем элементы на страницк
        const li = document.createElement('li');
        const inp = document.createElement('input');
        const delbtn = document.createElement('button');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        const customCheck = document.createElement('span');

        // задаем клаасы элементам 
        li.className = 'li';
        inp.className = 'inp';
        delbtn.className = 'delbtn';
        customCheck.className = 'check_box';
        checkbox.className = 'check_input';
        label.className = 'check option'
        // добавляем элементы в html разметку
        label.append(checkbox, customCheck);
        li.append(inp, label, delbtn);
        ul.append(li);

        // customCheck.append(checkbox);
        // customCheck.innerHTML = '<img src="image/check_box_outline.svg">'
        delbtn.innerHTML = '<img src="/image/delete.svg">'
        inp.value = task.text;

        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        if (task.done == true) countDone++
        progress.max = fTasks.length
        progress.value = countDone;


        if (checkbox.checked) inp.classList.add('green');

        checkbox.addEventListener('click', (y) => {
            renderTaskList();
            markTask(task, checkbox.checked);

        })

        //создаем событие при клике на кнопку удаления 
        delbtn.addEventListener('click', () => {
            removeTask(task);
            renderTaskList();
        })

    })
}
//меняем состояние чекбокса 
const markTask = (task, mark) => {
    const index = tasks.findIndex((t) => { return t.id === task.id; })
    tasks[index].done = !!mark
}
// удаляем задачу из массива
const removeTask = (task) => {
    const index = tasks.findIndex((t) => { return t.id === task.id })
    tasks.splice(index, 1);
}