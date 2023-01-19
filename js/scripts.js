/* ============================================
            preloader
===============================================*/
$(window).on('load', function () {
  // makes sure that whole site is loaded
  $('#preloader-gif, #preloader').fadeOut(3000, function () {});
});
/*=============================================
          js-simple-todo-list scripts
================================================*/
window.onload = function () {
  localToDoList = getInitialTodoList();
  
  //**************** variables ****************//
  const addButton = document.getElementById('add-button');
  const addInput = document.getElementById('add-input');
  const listHead = document.getElementById('list');
  const counter = document.getElementById('counter');
  const maxLength = addInput.getAttribute('maxlength');
  const windowScreen = window.screen.availWidth;
  
  let isEditing = false;
  let editID = '';
  let editItem;
  let editItemText;
  
  if (windowScreen <= 320) {
    addInput.setAttribute('maxlength', 25);
    counter.innerText = 25;
  } else {
    addInput.setAttribute('maxlength', 31);
    counter.innerText = 31;
  }
  
  //**************** functions ****************//
  /**
   * addTodoItem function - add an item to the list
   * @param e - the click event
   */
  const addTodoItem = (e) => {
    let inputValue = addInput.value.trim();
    const id = new Date().getTime().toString();
    
    if (inputValue && !isEditing) {
      let attr = document.createAttribute('data-id');
      attr.value = id;
      
      const template = document.querySelector('#template');
      const clone = document.importNode(template.content, true);
      clone.querySelector('.todo-item').setAttributeNode(attr);
      clone.querySelector('.item').textContent = inputValue.trim();
      clone
        .querySelector('.checkbox')
        .addEventListener('click', completedTodoItem);
      
      listHead.appendChild(clone);
      
      addToLocalStorage(id, inputValue);
      setToDefaultSettings();
    } else if (inputValue && isEditing) {
      editItem.innerHTML = inputValue;
      updateEditToLocalStorage(editID, inputValue);
      setToDefaultSettings();
      
      swal('Your todo item was successfully edited!', {
        icon: 'success'
      });
      return;
    } else {
      swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
      return;
    }
  }; // end of addTodoItem function
  
  /**
   * completedTodoItem function - adds the class completed to todoItem
   * @param e - the click event
   */
  const completedTodoItem = (e) => {
    if (e.target.checked === true) {
      e.target.setAttribute('class', 'completed');
    } else {
      e.target.removeAttribute('class');
    }
  }; //end of completedTodoItem function
  
  /**
   * deleteTodoItem function - deletes an item from the list
   * @param e - the click event
   */
  const deleteTodoItem = (e) => {
    if (e.target.classList.contains('fa-trash-alt')) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, impossible to recover!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          const todoItem = e.target.parentElement.parentElement;
          const id = todoItem.dataset.id;
          
          const todoItemContent =
            e.target.parentNode.parentNode.querySelector('.item').textContent;
          
          listHead.removeChild(todoItem);
          setToDefaultSettings();
          removeFromLocalStorage(id);
          
          swal('Your todo item has been deleted!', {
            icon: 'success'
          });
        } else {
          swal('Your todo item is safe!');
          return;
        }
      });
    }
  }; //end of deleteTodoItem function
  
  /**
   * editTodoItem function - edits an item in the list
   * @param e
   */
  const editTodoItem = (e) => {
    if (e.target.classList.contains('fa-edit')) {
      const todoItem = e.target.parentElement.parentElement;
      editID = todoItem.dataset.id;
      
      isEditing = true;
      addButton.innerText = 'Editing';
      editItem = e.target.parentNode.parentNode.querySelector('.item');
      editItemText = editItem.textContent;
      addInput.value = editItemText;
      getCharacterCount();
      addInput.focus();
    }
  }; //end of editToItem function
  
  /**
   * enterTodoItem function - adds an item to the list with pressing enter key
   * @param e - the keydown event
   */
  const enterTodoItem = (e) => {
    /*let inputValue = addInput.value.trim();*/
    if (e.keyCode === 13) {
      let inputValue = addInput.value.trim();
      const id = new Date().getTime().toString();
      
      if (inputValue && !isEditing) {
        let attr = document.createAttribute('data-id');
        attr.value = id;
        
        const template = document.querySelector('#template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('.todo-item').setAttributeNode(attr);
        clone.querySelector('.item').textContent = inputValue.trim();
        clone
          .querySelector('.checkbox')
          .addEventListener('click', completedTodoItem);
        
        listHead.appendChild(clone);
        
        addToLocalStorage(id, inputValue);
        setToDefaultSettings();
      } else if (inputValue && isEditing) {
        editItem.innerHTML = inputValue.trim();
        
        updateEditToLocalStorage(editID, inputValue.trim());
        setToDefaultSettings();
        
        swal('Your todo item was successfully edited!', {
          icon: 'success'
        });
        return;
      } else {
        swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
        return;
      }
    }
  }; //end of the enterTodoItem function
  
  /**
   * createListItem function - creates an list item for the list
   * @param id
   * @param todoItem
   */
  function createListItem (id, todoItem) {
    let attr = document.createAttribute('data-id');
    attr.value = id;
    
    const template = document.querySelector('#template');
    const clone = document.importNode(template.content, true);
    clone.querySelector('.todo-item').setAttributeNode(attr);
    clone.querySelector('.item').textContent = todoItem;
    clone
      .querySelector('.checkbox')
      .addEventListener('click', completedTodoItem);
    
    listHead.appendChild(clone);
  } //end of the createListItem function
  
  /**
   * displayTodoItems function - display the items in the list from localStorage
   */
  function displayTodoItems () {
    localToDoList = getLocalStorage();
    if (localToDoList.length > 0) {
      localToDoList.forEach(function (todo) {
        createListItem(todo.id, todo.todoItem);
      });
    }
  } //end of displayTodoItems function
  
  /**
   * addToLocalStorage function - creates an item and adds it to the localStorage list
   * @param id - item id
   * @param todoItem - item text content
   */
  function addToLocalStorage (id, todoItem) {
    const todo = {
      id,
      todoItem
    };
    let localToDoListArr = getLocalStorage();
    localToDoListArr.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of addToLocalStorage function
  
  /**
   * removeFromLocalStorage function - removes an item from the localStorage list
   * @param id - the item id
   */
  function removeFromLocalStorage (id) {
    let localToDoListArr = getLocalStorage();
    localToDoListArr = localToDoListArr.filter(function (todo) {
      if (todo.id !== id) {
        return todo;
      }
    });
    
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of removeFromLocalStorage function
  
  /**
   * updateEditToLocalStorage function - updates the editing of an item and adds to the localStorage
   * @param id - the item id
   * @param todoItem - the item text content
   */
  function updateEditToLocalStorage (id, todoItem) {
    let localToDoListArr = getLocalStorage();
    localToDoListArr = localToDoListArr.map(function (todo) {
      if (todo.id === id) {
        todo.todoItem = todoItem;
      }
      return todo;
    });
    
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of updateEditToLocalStorage function
  
  /**
   * getInitialTodoList function - gets the toDoList from localStorage
   * @returns {*[]|any}
   */
  function getInitialTodoList () {
    //!**************** get the todoList ****************!//
    const localTodoList = localStorage.getItem('toDoList');
    
    //!*** parse todoList to json format if not empty ***!//
    if (localTodoList) {
      return JSON.parse(localTodoList);
    }
    //!**************** localStorage is empty, set it to 'todoList' ****************!//
    localStorage.setItem('toDoList', []);
    return [];
  } //end of getInitialTodoList function
  
  /**
   * getLocalStorage function - gets the toDoList from localStorage
   * @returns {any|*[]}
   */
  function getLocalStorage () {
    return localStorage.getItem('toDoList')
      ? JSON.parse(localStorage.getItem('toDoList'))
      : [];
  } //end of getLocalStorage function
  
  /**
   * setToDefaultSettings function - resets the diffent variables to initial values
   */
  function setToDefaultSettings () {
    addButton.innerText = 'Add Item';
    isEditing = false;
    editID = '';
    
    setTimeout(() => {
      addInput.value = '';
      getCharacterCount();
    }, 250);
    addInput.focus();
  } //end of setToDefaultSettings function
  
  /**
   * getCharacterCount function - get character count of input[type=text] and
   * add the value to counter innerText.
   */
  function getCharacterCount () {
    let characterCount = maxLength - addInput.value.length;
    if (characterCount < 10) {
      counter.innerText = `0${characterCount}`;
    } else {
      counter.innerText = `${characterCount}`;
    }
  } //end of the getCharacterCount function
  
  //**************** add event listeners ****************//
  window.addEventListener('DOMContentLoaded', getInitialTodoList);
  addButton.addEventListener('click', addTodoItem);
  addInput.addEventListener('keydown', enterTodoItem);
  addInput.addEventListener('keyup', getCharacterCount);
  listHead.addEventListener('click', deleteTodoItem);
  listHead.addEventListener('click', editTodoItem);
  
  displayTodoItems();
}; //end of window.onload function
