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

    const enterTodoItem = e => {
        let inputValue = addInput.value;
        if (e.keyCode === 13) {
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
        }

    }; //end of the enterTodoItem function


    //**************** add event listeners ****************//
    addButton.addEventListener('click', addTodoItem);
    addInput.addEventListener('keyup', enterTodoItem);

};//end of window.onload function