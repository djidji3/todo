'use strict';

/* hasznalt html elemazonositok */
let day = document.querySelector('.body__day');
let date = document.querySelector('.body__date');
let newTaskInput = document.querySelector('.newTaskInput');
let addButton = document.querySelector('.addButton');
let actualTodoNumber = document.querySelector('.todo__number');
let pendingItemsCounter = document.querySelector('.pendingItemsCounter');
let doneItemsCounter = document.querySelector('.doneItemsCounter');
let todoListItems = document.querySelector('.todo__list--items');
let todoList = document.querySelector('.todo__list');
let todoListPending = document.querySelector('.todo__list--pending');
let todoListDone = document.querySelector('.todo__list--done');
/* let ul = document.querySelector('.ul');  */
let footer = document.querySelector('.footer');
let footerBtnComplete = document.querySelector('.footer__btn--complete');
let footerBtnClear = document.querySelector('.footer__btn--clear');

/* pelda a todos tomb-objectum tartalmara */
let todos = [];
/*  [{
            task: 'Ebed Amcsival',
            status: true
        },
        {
            text: 'Bevasarlas',
            done: false
        } 
];
*/


/* SEGEDFUGGVENY: jelenitse meg a het napjanak nevet itt: day*/
function displayDayOfTheWeek() {
    day.innerText = new Date()
        .toDateString()
        .split(' ')[0];
};

/* SEGEDFUGGVENY: jelenitse meg a datumot itt: date*/
function displayDate() {
    date.innerText = new Date()
        .toLocaleDateString()
        .replaceAll('. ', '-');
};


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
    /* storageManager.removeTodoItems('feladatok'); */
    removeTodoItems(key) {
        localStorage.removeItem(key);
    },
    /* storageManager.clearTodoItems('feladatok'); */
    clearTodoItems(key) {
        localStorage.clear(key);
    }
};


/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadInput2Todos() {
    /* ellenorzom hogy lett-e vmi beirva a bevitelimezobe */
    const task = newTaskInput.value;
    if (task === '') {
        alert('Please type a todo !');
        return;
    }
    /* todo objectuma igy nez ki */
    /* task attributom a bevitelimezo tartalma */
    /* ('status' megmondja hogy el van-e vegezve a feladat) */
    const todo = {
        task: task,
        status: false
    };

    /* a todo objectumot feltoltjuk a todos tombbe */
    todos.push(todo);
    /* li lista tartalmat uritjuk */

    /* betoltjuk a todos tartalmat az li-be */
    loadTodo2Li(todo);

    /*frissitjuk az elvegezendo feladatok szamat */
    refreshPendingItemsCounter();

    /* localStorage-ba a feltoljuk a todos tartalmat 'feladatok' neven */
    loadTodos2LocalStorage('feladatok', todos);
};


/* SEGEDFUGGVENY: egy todo-t megjeleni a listaban */
function loadTodo2Li(todo) {
    let ul = document.createElement('ul');
    todoListPending.appendChild(ul);
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML = todo.task;


    /*  let ul = document.querySelector('.ul');
     pendingItemsCounter.appendChild(ul);
     let li = document.createElement('li');
     ul.appendChild(li);
     li.innerHTML = todo.task;

     newTaskInput.value = ''; */
};
/* SEGEDFUGGVENY: todos-t  megjeleniti a listaban */
function loadTodos2Li() {
    if (todos && Array.isArray(todos)) {
        todos.forEach(item => loadTodo2Li(item));

    }
};

/* a todos tartalmat feltoljuk a localStorage-ba 'feladatok' neven */
/*igy kell meghivni loadTodos2LocalStorage('feladatok', todos); */
function loadTodos2LocalStorage(key, value) {
    storageManager.setTodoItem(key, value);
};


/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadLocalStorage2Todos() {
    const savedTodos = storageManager.getTodoItem('feladatok');
    if (savedTodos) {
        todos = savedTodos;
    }
};

/* frissiti a folyamatban levo task-ok szamat jelzo mezot */
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

/* torli az osszes feladatot */
/* clearAllTodos('feladatok'); */
function clearAllTodos() {
    todos = [];
    storageManager.clearTodoItems('feladatok');




};

/*                            ESEMENYKEZELO FUGGVENYEK */
/* + gombra kattintaskor */
addButton.addEventListener('click', loadInput2Todos);

/* 'Clear All' gombra kattintaskor */
footerBtnClear.addEventListener('click', clearAllTodos);


/*                                  MAIN */
displayDayOfTheWeek();
displayDate();
loadLocalStorage2Todos();
loadTodos2Li();
refreshPendingItemsCounter();


























/* regibol maradt */

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}