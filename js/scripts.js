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

    localToDoList = getInitialTodoList();

    //**************** variables ****************//
    const addButton = document.getElementById("add-button");
    const addInput = document.getElementById("add-input");
    const listHead = document.getElementById("list");

    let todoItems = 0;

    //**************** functions ****************//
    const addTodoItem = e => {
        let inputValue = addInput.value.trim();
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

    };// end of addTodoItem function

    const completedTodoItem = e => {
        if (e.target.checked === true) {
            e.target.setAttribute('class', 'completed');

        } else {
            e.target.removeAttribute('class');
        }
    }//end of completedTodoItem function

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
                        const todoItem = e.target.parentNode.querySelector('.item').textContent;
                        const index = localToDoList.indexOf(todoItem.toString());
                        const toDoList = localStorage.getItem('todoList');
                        if (toDoList) {
                            const todoListArr = JSON.parse(toDoList);
                            todoListArr.splice(index, 1);
                            localStorage.setItem('todoList', JSON.stringify(todoListArr));
                        }

                        listHead.removeChild(e.target.parentElement);

                    } else {
                        swal("Your todo item is safe!");
                        return;
                    }
                });
        }
    }; //end of deleteTodoItem function

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

    function getInitialTodoList() {
        //!**************** get the todoList ****************!//
        const localTodoList = localStorage.getItem('todoList');

        //!*** parse todoList to json format if not empty ***!//
        if (localTodoList) {
            return JSON.parse(localTodoList);
        }
        //!**************** localStorage is empty, set it to 'todoList' ****************!//
        localStorage.setItem('todoList', []);
        return [];
    }//end of getInitialTodoList function

    //**************** add event listeners ****************//
    addButton.addEventListener('click', addTodoItem);
    addInput.addEventListener('keyup', enterTodoItem);
    listHead.addEventListener('click', deleteTodoItem);

    displayTodoItems();

};//end of window.onload function