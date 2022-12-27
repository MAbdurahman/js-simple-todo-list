/*=============================================
          js-simple-todo-list scripts
================================================*/
window.onload = function () {

    //**************** variables ****************//
    const addButton = document.getElementById("add-button");
    const addInput = document.getElementById("add-input");
    const listHead = document.getElementById("list");

    let todoItems = 0;

    //**************** functions ****************//
    const addTodoItem = e => {
        let inputValue = addInput.value;
        if (!inputValue) {
            swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
            console.log('invalid entry');
            return;
        }

        const template = document.querySelector("#template");
        const clone = document.importNode(template.content, true);
        clone.querySelector('.item').textContent = inputValue;
        clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);
        todoItems++;

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
    }; //end of completedTodoItem function

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
        let inputValue = addInput.value;
        if (e.keyCode === 13) {
            if (!inputValue) {
                swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
                return;
            }

            const template = document.querySelector("#template");
            const clone = document.importNode(template.content, true);
            clone.querySelector('.item').textContent = inputValue;
            clone.querySelector('.checkbox').addEventListener('click', completedTodoItem);
            listHead.appendChild(clone);

            todoItems++;

            setTimeout(() => {
                addInput.value = '';
            }, 250);
            addInput.focus();
        }

    }; //end of the enterTodoItem function

    //**************** add event listeners ****************//
    addButton.addEventListener('click', addTodoItem);
    addInput.addEventListener('keyup', enterTodoItem);
    listHead.addEventListener('click', deleteTodoItem);

};//end of window.onload function