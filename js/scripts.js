/* ============================================
            preloader
===============================================*/
$(window).on('load', function () {
    // makes sure that whole site is loaded
    $('#preloader-gif, #preloader').fadeOut(3000, function () {
    });
});
/*=============================================
          js-simple-todo-list scripts
================================================*/
window.onload = function () {

    /*localToDoList = getInitialTodoList();*/

    //**************** variables ****************//
    const addButton = document.getElementById("add-button");
    const addInput = document.getElementById("add-input");
    const listHead = document.getElementById("list");


    let todoItems = 0;
    let isEditing = false;
    let itemIndex;
    let editID = '';
    let editElement;

    //**************** functions ****************//
    const addTodoItem = e => {
        let inputValue = addInput.value.trim();
        const id = new Date().getTime().toString();

        if (inputValue && !isEditing) {
            let attr = document.createAttribute("data-id");
            attr.value = id;

            const template = document.querySelector("#template");
            const clone = document.importNode(template.content, true);
            clone.querySelector('.todo-item').setAttributeNode(attr);
            clone.querySelector('.item').textContent = inputValue.trim();
            clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);

            // const todoItem = clone.textContent.trim();


            listHead.appendChild(clone);

            addToLocalStorage(id, inputValue);
            setToDefaultSettings();

        } else if (inputValue && isEditing) {

            console.log('editing');

            editElement.innerHTML = inputValue;

            updateEditToLocalStorage(editID, inputValue);
            setToDefaultSettings();

            swal("Your todo item was successfully edited!", {
                icon: "success",
            });
            return;

        } else {
            swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
            return;

        }


        // if (isEditing) {
        //     localToDoList.splice(itemIndex, 1);
        //     localToDoList.splice(itemIndex, 0, todoItem);
        //     console.log(localToDoList)
        //
        // } else {
        //
        //     localToDoList.push(todoItem);
        // }
        //
        // console.log(localToDoList);
        // const toDoList = localStorage.getItem('todoList');
        //
        // if (toDoList) {
        //     const todoListArr = JSON.parse(toDoList);
        //
        //     todoListArr.push(todoItem);
        //     localStorage.setItem('todoList', JSON.stringify(todoListArr));
        //
        // }


    };// end of addTodoItem function

    const completedTodoItem = e => {
        if (e.target.checked === true) {
            e.target.setAttribute('class', 'completed');

        } else {
            e.target.removeAttribute('class');
        }
    };//end of completedTodoItem function

    const deleteTodoItem = e => {
        if (e.target.classList.contains('fa-trash-alt')) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, impossible to recover!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Your todo item has been deleted!", {
                            icon: "success",
                        });
                        // const todoItem = e.target.parentNode.parentNode.querySelector('.item').textContent;
                        // const index = localToDoList.indexOf(todoItem.toString());
                        // const toDoList = localStorage.getItem('todoList');
                        // if (toDoList) {
                        //     const todoListArr = JSON.parse(toDoList);
                        //     todoListArr.splice(index, 1);
                        //     localStorage.setItem('todoList', JSON.stringify(todoListArr));
                        // }
                        //
                        // listHead.removeChild(e.target.parentElement.parentElement);

                        console.log('deleteTodoItem');
                        const todoItem = e.target.parentElement.parentElement;
                        const id = todoItem.dataset.id;
                        /*const todoItem = e.currentTarget.parentElement.parentElement;*/
                        /*const todoItem = e.target.parentNode.parentNode.querySelector('.item');*/
                        /*const id = todoItem.dataset.id;*/
                        const todoItemContent = e.target.parentNode.parentNode.querySelector('.item').textContent;

                        listHead.removeChild(todoItem);
                        setToDefaultSettings();
                        removeFromLocalStorage(id);

                    } else {
                        swal("Your todo item is safe!");
                        return;
                    }
                });
        }
    }; //end of deleteTodoItem function

    const editTodoItem = e => {
        if (e.target.classList.contains('fa-edit')) {
            console.log('editTodoItem');

            const todoItem = e.target.parentElement.parentElement;
            editID = todoItem.dataset.id;

            isEditing = true;
            addButton.innerText = 'Editing';
            const editItemText = e.target.parentNode.parentNode.querySelector('.item').textContent;
            addInput.value = editItemText;
            addInput.focus();
            editElement = e.target.parentNode.parentNode.querySelector('.item');

            // swal("Your todo item was successfully edited!", {
            //     icon: "success",
            // });
            // return;


        }
        /*const element = e.target.parentElement.parentElement;
        console.log(element);
        isEditing = true;
        console.log(isEditing);
        addButton.innerText = 'Editing';
        const editItemText = e.target.parentNode.parentNode.querySelector('.item').textContent;
        console.log(editItemText);
        addInput.value = editItemText;

        const editItemIndex = localToDoList.indexOf(editItemText);
        itemIndex = editItemIndex;
        console.log(editItemIndex);
        addInput.focus();
        isEditing = true;*/
        /*if (addInput.focus()) {
            itemIndex = localToDoList.indexOf(editItemText);
            localToDoList.splice(editItemIndex, 1);
            listHead.removeChild(e.parentElement.parentElement);
               }

            /*let inputValue = addInput.value.trim();

            if (!inputValue) {
                swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
                return;
            }
            const template = document.querySelector('#template');
            const clone = document.importNode(template.content, true);
            clone.querySelector('.item').textContent = inputValue.trim();
            clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);

            const todoItemText = clone.textContent.trim();
            localToDoList.splice(editItemIndex, 0, todoItemText);
            console.log(localToDoList);
            const toDoList = localStorage.getItem('todoList');
            if (toDoList) {
                const todoListArr = JSON.parse(toDoList);
                todoListArr.splice(editItemIndex, 0, todoItemText);
                localStorage.setItem('todoListArr', JSON.stringify(todoListArr));

            }
            listHead.appendChild(clone);

            setTimeout(() => {
                addInput.value = '';
            }, 250);
            addInput.focus();*/


        /*let inputValue = addInput.value.trim();

        if (!inputValue) {
            swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
            return;
        }

        const template = document.querySelector('#template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('.item').textContent = inputValue.trim();
        clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);

        const todoItemText = clone.textContent.trim();
        localToDoList.splice(editItemIndex, 0, todoItemText);

        const toDoList = localStorage.getItem('todoList');
        if (toDoList) {
            const todoListArr = JSON.parse(toDoList);
            todoListArr.splice(editItemIndex, 0, todoItemText);
            localStorage.setItem('todoListArr', JSON.stringify(todoListArr));

        }
        listHead.appendChild(clone);

        setTimeout(() => {
            addInput.value = '';
        }, 250);
        addInput.focus();*/


    }; //end of editToItem function

    const enterTodoItem = e => {
        let inputValue = addInput.value.trim();
        if (e.keyCode === 13) {
            if (!inputValue) {
                swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
                return;
            }

            const template = document.querySelector("#template");
            const clone = document.importNode(template.content, true);
            clone.querySelector('.item').textContent = inputValue.trim();
            clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);

            const todoItem = clone.textContent.trim();

            localToDoList.push(todoItem);
            const toDoList = localStorage.getItem('todoList');

            if (toDoList) {
                const todoListArr = JSON.parse(toDoList);
                todoListArr.push(todoItem);
                localStorage.setItem('todoList', JSON.stringify(todoListArr));

            }
            listHead.appendChild(clone);

            setTimeout(() => {
                addInput.value = '';
            }, 250);
            addInput.focus();
        }
    }; //end of the enterTodoItem function

    function displayTodoItems() {

        for (let i = 0; i < localToDoList.length; i++) {
            const template = document.querySelector('#template');
            const clone = document.importNode(template.content, true);
            clone.querySelector('.item').textContent = localToDoList[i];
            clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);
            listHead.appendChild(clone);
        }

        return listHead;

    }//end of displayTodoItems function

    function addToLocalStorage(id, todoItem) {

        console.log(`addToLocalStorage -> ${id} - ${todoItem}`);
        const todo = {
            id,
            todoItem
        };
        let localToDoListArr = getLocalStorage();
        localToDoListArr.push(todo);
        localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));

    };//end of addToLocalStorage function

    function removeFromLocalStorage(id) {

        console.log(`removeFromLocalStorage -> ${id}`);

        let localToDoListArr = getLocalStorage();
        localToDoListArr = localToDoListArr.filter(function(todo) {
            if (todo !== id) {
                return todo;
            }
        });

        localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));

    };//end of removeFromLocalStorage function

    function updateEditToLocalStorage(id, todoItem) {
        console.log(`updateEditToLocalStorage -> ${id} - ${todoItem}`);
    };//end of updateEditToLocalStorage function

    function getInitialTodoList() {
        //!**************** get the todoList ****************!//
        const localTodoList = localStorage.getItem('toDoList');

        //!*** parse todoList to json format if not empty ***!//
        if (localTodoList) {
            return JSON.parse(localTodoList);
        }
        //!**************** localStorage is empty, set it to 'todoList' ****************!//
        localStorage.setItem('toDoList', []);
        return [];
    }//end of getInitialTodoList function

    function getLocalStorage() {
        return localStorage.getItem("toDoList")
            ? JSON.parse(localStorage.getItem("toDoList"))
            : [];

    };//end of getLocalStorage function

    function setToDefaultSettings() {
        addButton.innerText = 'Add Item';
        isEditing = false;
        editID = '';

        setTimeout(() => {
            addInput.value = '';
        }, 250);
        addInput.focus();

        console.log('setToDefaultSettings');

    };//end of setToDefaultSettings function

    //**************** add event listeners ****************//
    addButton.addEventListener('click', addTodoItem);
    addInput.addEventListener('keydown', enterTodoItem);
    listHead.addEventListener('click', deleteTodoItem);
    listHead.addEventListener('click', editTodoItem);

    /*displayTodoItems();*/

};//end of window.onload function