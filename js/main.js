'use strict';

/* hasznalt html elemazonositok */
let day = document.querySelector('.body__day');
let date = document.querySelector('.body__date');
let newTaskInput = document.querySelector('.newTaskInput');
let addButton = document.querySelector('.addButton');
let actualTodoNumber = document.querySelector('.todo__number');
let pendingItemsCounter = document.querySelector('.pendingItemsCounter');
let doneItemsCounter = document.querySelector('.doneItemsCounter');
let todoListItems = document.querySelectorAll('.todo__list--item');
let todoList = document.querySelector('.todo__list');
let todoListPending = document.querySelector('.todo__list--pending');
let todoListDone = document.querySelector('.todo__list--done');
let todoListDeleteBtn = document.querySelectorAll('.todo__list--deleteBtn');
let taskRow = document.querySelectorAll('.todo__list--item');
let footer = document.querySelector('.footer');
let footerBtnCompleted = document.querySelector('.footer__btn--complete');
let footerBtnClear = document.querySelector('.footer__btn--clear');

/* ----------------------------------------------------------------- */
/* pelda a todos tomb-objectum tartalmara */
let todos = [];
/*  [{
            id: 33245,
            task: 'Ebed Amcsival',
            status: true
        },
        {
            id: 12345,
            text: 'Bevasarlas',
            done: false
        } 
];
*/

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: jelenitse meg a het napjanak nevet itt: day*/
function displayDayOfTheWeek() {
    day.innerText = new Date()
        .toDateString()
        .split(' ')[0];
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: jelenitse meg a datumot itt: date*/
function displayDate() {
    date.innerText = new Date()
        .toLocaleDateString()
        .replaceAll('. ', '-');
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: lokalis todo objectumot kezelo */
/* title a key a localstorageben */
/* value az objectum teljes tartalma vagyis egy tomb,benne az objectum soraival*/
const storageManager = {
    /* storageManager.setTodoItem('feladatok', todos); */
    setTodoItem(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
    /*  storageManager.getTodoItem('feladatok'); */
    getTodoItem(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);

    },
    /* storageManager.removeTodoItem('feladat1'); */
    removeTodoItem(key, value) {
        localStorage.removeItem(key, value.task);
    },
    /* storageManager.clearTodoItems('feladatok'); */
    clearTodoItems(key) {
        localStorage.clear(key);
    }
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadInput2Todos() {
    /* SEGEDFUGGVENY: input mezo adatanak beolvasasa 'todos' objectumba*/
    /* ellenorzom hogy lett-e vmi beirva a bevitelimezobe */
    const task = newTaskInput.value;
    if (task === '') {
        alert('Please type a todo !');
        return;
    }
    /* todo objectuma igy nez ki */
    /* id mezo egy veletlen szam,mely egyedileg azonositja a bejegyzest */
    /* task attribtum a bevitelimezo tartalma */
    /* ('status' megmondja hogy el van-e vegezve a feladat) */
    let idCounter = Math.floor((Math.random() * 100000));
    const todo = {
        id: idCounter,
        task: task,
        status: false
    };

    /* a todo objectumot feltoltjuk a todos tombbe */
    todos.push(todo);

    /* div lista elemeket toroljuk, vagyis kitisztitjuk a listat */
    removeListItems();

    /* betoltjuk a todos tartalmat a pending es done div-be */
    loadTodos2Divs();

    /*frissitjuk az elvegezendo/elvegzett feladatok szamat */
    refreshPendingItemsCounter();
    refreshDoneItemsCounter()

    /* localStorage-ba a feltoljuk a todos tartalmat 'feladatok' neven */
    loadTodos2LocalStorage('feladatok', todos);
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: todos-t  megjelenitese a div listaban */
function loadTodos2Divs() {
    if (todos && Array.isArray(todos)) {
        todos.forEach(item => {
            if (item.status === false) {
                loadTodo2PendingDiv(item);
            } else {
                loadTodo2DoneDiv(item);
            }
        })
    }
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: egy todo-t megjelenitese a pending listaban */
function loadTodo2PendingDiv(todo) {
    let todoItem = document.createElement('div');
    todoItem.className = 'todo__list--item';
    todoItem.setAttribute('data-id', `${todo.id}`);
    todoListPending.appendChild(todoItem);
    todoItem.innerHTML = `
    <input class='' type="checkbox" name="" id="">
    <span class='task'>${todo.task}</span>
    <button data-id=${todo.id} class='todo__list-deleteBtn'>Törlés</button>
    `;
    newTaskInput.value = '';
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: egy todo-t megjelenitese a done listaban */
function loadTodo2DoneDiv(todo) {
    let todoItem = document.createElement('div');
    todoItem.className = 'todo__list--item';
    todoItem.setAttribute('data-id', `${todo.id}`);
    todoListDone.appendChild(todoItem);
    todoItem.innerHTML = `
    <input class='checkBox-doneItem' type="checkbox" name="" id="">
    <span class='task'>${todo.task}</span>
    `;
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: div listaelemek torlese a listaban */
function removeListItems() {
    let todoListItems = document.querySelectorAll('.todo__list--item');
    for (let i = 0; i < todoListItems.length; i += 1) {
        todoListItems[i].remove();
    }
};

/* ----------------------------------------------------------------- */
/* a todos tartalmat feltoljuk a localStorage-ba 'feladatok' neven */
/*igy kell meghivni loadTodos2LocalStorage('feladatok', todos); */
function loadTodos2LocalStorage(key, value) {
    storageManager.setTodoItem(key, value);
};

/* ----------------------------------------------------------------- */
/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadLocalStorage2Todos() {
    const savedTodos = storageManager.getTodoItem('feladatok');
    if (savedTodos) {
        todos = savedTodos;
    }
};

/* ----------------------------------------------------------------- */
/* frissiti a pending-ben  levo task-ok szamat jelzo mezot */
function refreshPendingItemsCounter() {
    let feladatok = todos;
    let counter = 0;
    feladatok.map((item) => {
        if (item.status === false) {
            counter += 1;
        }
    })
    pendingItemsCounter.innerText = counter;
};

/* ----------------------------------------------------------------- */
/* frissiti a kesz allapotu task-ok szamat jelzo mezot */
function refreshDoneItemsCounter() {
    let feladatok = todos;
    let counter = 0;
    feladatok.map((item) => {
        if (item.status === true) {
            counter += 1;
        }
    })
    if (counter === 0) {
        doneItemsCounter.innerText = '0';
    } else
        doneItemsCounter.innerText = Math.floor(counter / todos.length * 100);
};

/* ----------------------------------------------------------------- */
/* egy todo elem torlese */
function deleteTodoItem(todo) {
    storageManager.removeTodoItems(todo)
}

/* ----------------------------------------------------------------- */
/* torli az osszes feladatot, localstorage tartalmat, div elemeket */
/* clearAllTodos('feladatok'); */
function clearAllTodos() {
    todos = [];
    storageManager.clearTodoItems('feladatok');
    removeListItems();
    refreshPendingItemsCounter();
    refreshDoneItemsCounter();
};


/* ----------------------------------------------------------------- */
/* torol egy sort a feladat listabol, a tasknev alapjan */
function deleteTaskRow(event) {
    if (event.target.className === 'todo__list-deleteBtn') {
        let task = (event.target.parentElement.children[1].innerText);
        /* console.log(task); */
        let taskParent = event.target.parentElement;
        taskParent.remove();
        todos.forEach(function(element, index) {
            if (element.task === task)
                todos.splice(index, 1)
        })
    }
    loadTodos2LocalStorage('feladatok', todos);
};

/* ----------------------------------------------------------------- */
/*                            ESEMENYKEZELO FUGGVENYEK */

/* 'bmelyik todo elem done checkbox-anak bekattintasakor hivodik meg */
function switchItemStatus(event) {
    if (event.target.type === 'checkbox') {
        const parent = event.target.parentElement;
        /* console.log(parent); */
        const todoID = parent.getAttribute('data-id');
        /* console.log(todoID); */
        const todoIndex = todos.findIndex(todo => todo.id == todoID);
        /*  console.log(todoIndex); */
        /* atbillentem a statust a masik ertekre */
        todos[todoIndex].status = !todos[todoIndex].status;
        removeListItems();
        loadTodos2LocalStorage();
        loadTodos2Divs();
        refreshPendingItemsCounter();
        refreshDoneItemsCounter();
    }
};


/* 'Show complete'gombjara valo kattintaskor hivodik meg */
/* megjeleniti vagy elrejti a 'todo__list--done' osztalyt */
function showFooterBtnCompleted() {
    todoListDone.classList.toggle('list__done--hide');
};


/* + gombra kattintaskor hivodik meg*/
addButton.addEventListener('click', loadInput2Todos);

/* 'Clear All' gombra kattintaskor hivodik meg */
footerBtnClear.addEventListener('click', clearAllTodos);

/* 'bmelyik todo elem checkbox-anak bekattintasakor hivodik meg */
todoList.addEventListener('click', switchItemStatus);

/* bmelyik todo elem delete gombjara valo kattintaskor hivodik meg */
todoList.addEventListener('click', deleteTaskRow);

/* 'Show complete'gombjara valo kattintaskor hivodik meg */
footerBtnCompleted.addEventListener('click', showFooterBtnCompleted);

/* ----------------------------------------------------------------- */



/*                                  MAIN                               */
displayDayOfTheWeek();
displayDate();
loadLocalStorage2Todos();
loadTodos2Divs();
refreshPendingItemsCounter();
refreshDoneItemsCounter();