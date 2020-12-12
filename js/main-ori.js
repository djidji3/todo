'use strict';

/* hasznalt htmlelem azonositok */
let day = document.querySelector('.body__day');
let date = document.querySelector('.body__date');
let newTaskInput = document.querySelector('.newTaskInput');
let addButton = document.querySelector('.addButton');
let actualTodoNumber = document.querySelector('.todo__number');
let pendingItemsCounter = document.querySelector('.pendingItemsCounter');
let todoListItems = document.querySelector('.todo__list--items');
let todoList = document.querySelector('.todo__list');
let todoListDone = document.querySelector('.todo__list--done');
let ul = document.querySelector('.ul');
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
    }
};


/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadExistingLocalStorageItemsToTodo() {
    const savedTodos = storageManager.getTodoItem('feladatok');
    if (savedTodos) {
        todos = savedTodos;
    }
};

/* SEGEDFUGGVENY: a parameterkent kapott todo-t megjelenitem a listaban */
function showTodo(todo) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML = `${todo}`;

    newTaskInput.value = '';
};

/* SEGEDFUGGVENY: todos objectumban levo elemeket betoltom a listaba a showTodo segitsegevel  */
function loadExistingTodoItems() {
    if (todos && Array.isArray(todos)) {
        /*   todos.forEach(todo => console.log(todo.text)); */
        todos.forEach(item => showTodo(item.task));
    }
};

/* SEGEDFUGGVENY: newTaskInput bevitelimezonek a tartalmat hozzaadom  */
/* a todos objectumhoz,majd a localstorage-hoz */
const addNewTodo = () => {
    /* ellenorzom hogy lett-e vmi beirva a bevitelimezobe */
    const task = newTaskInput.value;
    if (task === '') {
        alert('Please type a todo !');
        return;
    }
    /* todo objectuma igy nez ki ('status' megmondja hogy el van-e vegezve a feladat)*/
    const todo = {
        task: task,
        status: false
    };

    /* az objectumot feltoltjuk a todos tombbe */
    todos.push(todo);

    /* a todos tartalmat feltoljuk a localStorage-ba 'feladatok' neven */
    storageManager.setTodoItem('feladatok', todos);

    /* newTaskInput bevitelimezonek a tartalmat megjelenitem a listaban */
    showTodo(newTaskInput.value);
};



/*  SEGEDFUGGVENY:      ESEMENYKEZELO FUGGVENYEK */
/* + gombra kattintaskor */
addButton.addEventListener('click', addNewTodo);

/* MAIN */
displayDayOfTheWeek();
displayDate();
loadExistingLocalStorageItemsToTodo();
loadExistingTodoItems();
addNewTodo();






























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