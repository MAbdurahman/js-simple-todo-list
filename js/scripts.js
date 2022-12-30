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

    console.log(localToDoList);

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
        /*clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);*/

        const todoItem = clone.textContent.trim();
        /*console.log(clone.textContent.trim());*/
        /*localToDoList.push(clone.textContent.trim());*/
        localToDoList.push(todoItem);
        const toDoList = localStorage.getItem('todoList');
        /*const todoList = localStorage.getItem('todoList');*/
        if (toDoList) {
            const todoListArr = JSON.parse(toDoList);
            todoListArr.push(todoItem);
            localStorage.setItem('todoList', JSON.stringify(todoListArr));

        } else {
            localStorage.setItem('todoList', JSON.stringify([...todoItem]));
        }
        /*listHead.appendChild(clone);*/

        /*console.log(clone);*/
        /*        localTodoList.push(clone.querySelector('.item'.value));*/
        /*console.log(localToDoList);*/
        /*console.log(todoListArr);*/

        todoItems++;
        displayTodoItems();

        setTimeout(() => {
            addInput.value = '';
        }, 250);
        addInput.focus();

    };// end of addTodoItem function

    function completedTodoItem(e) {
        /*if (e.target.checked === true) {
            e.target.setAttribute('class', 'completed');

        } else {
            e.target.removeAttribute('class');
        }*/
        console.log('completedTodoItem clicked!')
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
                        listHead.removeChild(e.target.parentElement);
                        todoItems--;

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
            /*clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);*/

            const todoItem = clone.textContent.trim();

            localToDoList.push(todoItem);
            const toDoList = localStorage.getItem('todoList');

            if (toDoList) {
                const todoListArr = JSON.parse(toDoList);
                todoListArr.push(todoItem);
                localStorage.setItem('todoList', JSON.stringify(todoListArr));

            } else {
                localStorage.setItem('todoList', JSON.stringify([...todoItem]));
            }
            /*listHead.appendChild(clone);*/

            todoItems++;
            displayTodoItems();

            setTimeout(() => {
                addInput.value = '';
            }, 250);
            addInput.focus();
        }

    }; //end of the enterTodoItem function

    function displayTodoItems() {
        let todoItems = '';

        for (let i = 0; i < localToDoList.length; i++) {
            todoItems += `
                <li class="todo-item">
                    <label class="custom">
                        <input class="checkbox" type="checkbox" name="item"/>
                        <span class="item">${localToDoList[i]}</span>
                        <span class="checkmark" onclick="alert('checkmark')"></span>
                    </label>
                    <i class="fas fa-trash-alt"></i>
                </li>
            `;
        }

        listHead.innerHTML = todoItems;

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

    function getNumberTodoItems() {
        return todoItems;
    }//end of getNumberTodoItems function



    //**************** add event listeners ****************//
    addButton.addEventListener('click', addTodoItem);
    addInput.addEventListener('keyup', enterTodoItem);
    listHead.addEventListener('click', deleteTodoItem);

    displayTodoItems();

};//end of window.onload function