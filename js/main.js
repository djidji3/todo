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

/* pelda a listara */
let todos = [];
/*  [{
            title: 'Ebed Amcsival',
            value: true
        },
        {
            title: 'Bevasarlas',
            value: false
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
const localDB = {
    /* localDB.setTodoItem('todos2', todos); */
    setTodoItem(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
    /*  localDB.getTodoItem('todos2'); */
    getTodoItem(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);

    },
    /* localDB.removeTodoItems('todos2'); */
    removeTodoItems(key) {
        localStorage.removeItem(key);
    }
};


/* SEGEDFUGGVENY: localStorage adatainak beolvasasa valtozoba, ha vannak adatok*/
function loadLocalstorageItemsToApp() {
    const savedTodos = localDB.getTodoItem('todos');
    if (savedTodos) {
        todos = savedTodos;
    }
};

/* SEGEDFUGGVENY: newTaskInput bevitelimezonek a tartalmat megjelenitem a listaban */
function createNewTodoListItem() {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerText = newTaskInput.value;
    newTaskInput.value = '';
};

/* SEGEDFUGGVENY: newTaskInput bevitelimezonek a tartalma alapjan feltoltom a todos tombot */
const addNewTodo = () => {
    const value = newTaskInput.value;
    if (value === '') {
        alert('Please type a todo !');
        return;
    }
    /* todos tomb egy objectuma igy nez ki (false megmondja hogy el van-e vegezve a feladt)*/
    const todo = {
        text: value,
        done: false
    };

    /* az objectumot feltoltjuk a todos tombbe */
    todos.push(todo);

    /* key:feladatok value:todos tomb objectumai   */
    localDB.setTodoItem('feladatok', todos);
};

/*  SEGEDFUGGVENY: newTaskInput mezo tartalmat letarolom a localstorage-ben */
const createNewTodoStorageItem = () => {
    let newTask = newTaskInput.value;
    localDB.setTodoItem('todos', todos);
};


/*  SEGEDFUGGVENY: ESEMENYKEZELO FUGGVENYEK */
/* + gombra kattintaskor */
/* addButton.addEventListener('click', createNewTodoListItem); */
addButton.addEventListener('click', addNewTodo);

/* MAIN */
displayDayOfTheWeek();
displayDate();
/* createNewTodoListItem(); */





























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