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
  let editItemIsChecked = false;
  
  if (windowScreen <= 360) {
    addInput.setAttribute('maxlength', 25);
    counter.innerText = 25;
  } else {
    addInput.setAttribute('maxlength', 28);
    counter.innerText = 28;
  }
  
  //**************** functions ****************//
  /**
   * @description - adds an item to the list
   * @param e - the click event
   */
  const addTodoItem = e => {
    let inputValue = addInput.value.trim();
    const id = new Date().getTime().toString();
    
    let isChecked = false;
    
    if (inputValue && !isEditing) {
      /* let attr = document.createAttribute('data-id');
      attr.value = id;

      const template = document.querySelector('#template');
      const clone = document.importNode(template.content, true);
      clone.querySelector('.todo-item').setAttributeNode(attr);
      clone.querySelector('.item').textContent = inputValue.trim();
      clone
        .querySelector('.checkbox')
        .addEventListener('click', completedTodoItem);
      isChecked = clone
        .querySelector('.checkbox')
        .classList.contains('completed');
      clone.querySelector('.checkbox').checked = isChecked;

      listHead.appendChild(clone); */
      createListItem(id, inputValue, isChecked);
      
      addToLocalStorage(id, inputValue, isChecked);
      setToDefaultSettings();
    } else if (inputValue && isEditing) {
      editItem.innerHTML = inputValue;
      updateEditToLocalStorage(editID, inputValue, editItemIsChecked);
      updateIsCheckedToLocalStorage(editID, editItemIsChecked);
      setToDefaultSettings();
      
      swal('Your todo item was successfully edited!', {
        icon: 'success',
      });
      return;
    } else {
      swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
      return;
    }
  }; // end of addTodoItem function
  
  /**
   * @description - adds the class completed to the todo and updates the
   * localStorage
   * @param e - the click event
   */
  const completedTodoItem = e => {
    const id = e.target.parentElement.parentElement.dataset.id;
    if (e.target.checked === true) {
      e.target.setAttribute('class', 'completed');
      updateIsCheckedToLocalStorage(id, true);
    } else {
      e.target.removeAttribute('class', 'completed');
      updateIsCheckedToLocalStorage(id, false);
    }
  }; //end of completedTodoItem function
  
  /**
   * @description -
   * @param {*} id
   * @param {*} todoItem
   * @param {*} isChecked
   */
  function createDisplayListItem(id, todoItem, isChecked) {
    let attr = document.createAttribute('data-id');
    attr.value = id;
    
    const template = document.querySelector('#template');
    const clone = document.importNode(template.content, true);
    clone.querySelector('.todo-item').setAttributeNode(attr);
    clone.querySelector('.item').textContent = todoItem;
    clone
      .querySelector('.checkbox')
      .addEventListener('click', completedTodoItem);
    isChecked
      ? clone.querySelector('.checkbox').classList.add('completed')
      : clone.querySelector('.checkbox').classList.remove('completed');
    clone.querySelector('.checkbox').checked = isChecked;
    
    list.appendChild(clone);
  } // end of createDisplayListItem function
  
  /**
   * @description - creates a todo item and add it to the list
   * @param id
   * @param todoItem
   * @param isChecked
   */
  function createListItem(id, todoItem, isChecked) {
    let attr = document.createAttribute('data-id');
    attr.value = id;
    
    const template = document.querySelector('#template');
    const clone = document.importNode(template.content, true);
    clone.querySelector('.todo-item').setAttributeNode(attr);
    clone.querySelector('.item').textContent = todoItem;
    clone
      .querySelector('.checkbox')
      .addEventListener('click', completedTodoItem);
    isChecked = clone
      .querySelector('.checkbox')
      .classList.contains('completed');
    clone.querySelector('.checkbox').checked = isChecked;
    
    listHead.appendChild(clone);
  } //end of the createListItem function
  
  /**
   * @description - deletes an item from the list and updates the localStorage object
   * @param e - the click event
   */
  const deleteTodoItem = e => {
    if (e.target.classList.contains('fa-trash-alt')) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, impossible to recover!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          const todo = e.target.parentElement.parentElement;
          const id = todo.dataset.id;
          
          const todoItemContent =
            e.target.parentNode.parentNode.querySelector(
              '.item'
            ).textContent;
          
          listHead.removeChild(todo);
          setToDefaultSettings();
          removeFromLocalStorage(id);
          
          swal('Your todo item has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your todo item is safe!');
          return;
        }
      });
    }
  }; //end of deleteTodoItem function
  
  /**
   * @description - edits an item in the list
   * @param e
   */
  const editTodoItem = e => {
    if (e.target.classList.contains('fa-edit')) {
      const todoItem = e.target.parentElement.parentElement;
      editID = todoItem.dataset.id;
      let elem =
        e.target.parentElement.parentElement.childNodes[1].childNodes[0]
          .nextSibling;
      editItemIsChecked = hasClass(elem, 'completed');
      
      isEditing = true;
      addButton.innerText = 'Edit Item';
      editItem = e.target.parentNode.parentNode.querySelector('.item');
      editItemText = editItem.textContent;
      addInput.value = editItemText;
      getCharacterCount();
      addInput.focus();
    }
  }; //end of editToItem function
  
  /**
   * @description - adds an item to the list with pressing enter key
   * @param e - the keydown event
   */
  const enterTodoItem = e => {
    
    if (e.keyCode === 13) {
      let inputValue = addInput.value.trim();
      const id = new Date().getTime().toString();
      let isChecked = false;
      
      if (inputValue && !isEditing) {
        let attr = document.createAttribute('data-id');
        attr.value = id;
        isChecked = hasClass('input.checkbox', 'completed');
        
        /* const template = document.querySelector('#template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('.todo-item').setAttributeNode(attr);
        clone.querySelector('.item').textContent = inputValue.trim();
        clone.querySelector('.checkbox').checked = isChecked;
        clone
          .querySelector('.checkbox')
          .addEventListener('click', completedTodoItem);

        listHead.appendChild(clone); */
        createListItem(id, inputValue, isChecked);
        addToLocalStorage(id, inputValue, isChecked);
        setToDefaultSettings();
        
      } else if (inputValue && isEditing) {
        editItem.innerHTML = inputValue.trim();
        
        updateEditToLocalStorage(
          editID,
          inputValue.trim(),
          editItemIsChecked
        );
        updateIsCheckedToLocalStorage(editID, editItemIsChecked);
        setToDefaultSettings();
        
        swal('Your todo item was successfully edited!', {
          icon: 'success',
        });
        return;
      } else {
        swal('Invalid Entry', 'Enter A Valid Entry!', 'error');
        return;
      }
    }
  }; //end of the enterTodoItem function
  
  /**
   * @description - checks whether an element has a particular class
   * @param {*} elem
   * @param {*} namedClass
   * @returns - true if the element has a particular class; otherwise false.
   */
  function hasClass(elem, namedClass) {
    return ('' + elem.className + '').indexOf('' + namedClass + '') > -1;
  } //end of hasClass function
  
  /**
   * @description - displays the items in the array list from localStorage
   */
  function displayTodoItems() {
    localToDoList = getLocalStorage();
    if (localToDoList.length > 0) {
      localToDoList.forEach(function (todo) {
        createDisplayListItem(todo.id, todo.todoItem, todo.isChecked);
      });
    }
  } //end of displayTodoItems function
  
  /**
   * @description - creates an todo and adds it to the localStorage array
   * @param id - item id
   * @param todoItem - item text content
   * @param isChecked - item is checked or not
   */
  function addToLocalStorage(id, todoItem, isChecked) {
    const todo = {
      id,
      todoItem,
      isChecked,
    };
    let localToDoListArr = getLocalStorage();
    localToDoListArr.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of addToLocalStorage function
  
  /**
   * @description - removes an item from the localStorage array
   * @param id - the item id
   */
  function removeFromLocalStorage(id) {
    let localToDoListArr = getLocalStorage();
    localToDoListArr = localToDoListArr.filter(function (todo) {
      if (todo.id !== id) {
        return todo;
      }
    });
    
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of removeFromLocalStorage function
  
  /**
   * @description - updates isChecked in the localStorage
   * @param {*} id
   * @param {*} isChecked
   */
  function updateIsCheckedToLocalStorage(id, isChecked) {
    let localToDoListArr = getLocalStorage();
    localToDoListArr = localToDoListArr.map(function (todo) {
      if (todo.id === id) {
        todo.isChecked = isChecked;
      }
      return todo;
    });
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of updateIsCheckedToLocalStorage function
  
  /**
   * @description - updates the editing of an item and adds to the localStorage
   * @param id - the item id
   * @param todoItem - the item text content
   * @param isChecked - the boolean value indicating whether the item is checked or not
   */
  function updateEditToLocalStorage(id, todoItem, isChecked) {
    let localToDoListArr = getLocalStorage();
    localToDoListArr = localToDoListArr.map(function (todo) {
      if (todo.id === id) {
        todo.todoItem = todoItem;
        todo.isChecked = isChecked;
      }
      return todo;
    });
    
    localStorage.setItem('toDoList', JSON.stringify(localToDoListArr));
  } //end of updateEditToLocalStorage function
  
  /**
   * @description - get the toDoList from localStorage
   * @returns {*[]|any}
   */
  function getInitialTodoList() {
    //**************** get the todoList ****************//
    const localTodoList = localStorage.getItem('toDoList');
    
    //*** parse todoList to json format if not empty ***//
    if (localTodoList) {
      return JSON.parse(localTodoList);
    }
    //**************** localStorage is empty, set it to 'todoList' ****************//
    localStorage.setItem('toDoList', []);
    return [];
  } //end of getInitialTodoList function
  
  /**
   * @description - get the toDoList from localStorage (merely a shorter code than the
   * getInitialTodoList function)
   * @returns {any|*[]}
   */
  function getLocalStorage() {
    return localStorage.getItem('toDoList')
      ? JSON.parse(localStorage.getItem('toDoList'))
      : [];
  } //end of getLocalStorage function
  
  /**
   * @description - resets the different variables to initial values
   */
  function setToDefaultSettings() {
    addButton.innerText = 'Add Item';
    isEditing = false;
    editID = '';
    editItemIsChecked = false;
    
    setTimeout(() => {
      addInput.value = '';
      getCharacterCount();
    }, 250);
    addInput.focus();
  } //end of setToDefaultSettings function
  
  /**
   * @description - get the character count of input[type=text] and add the value to
   * the counter innerText.
   */
  function getCharacterCount() {
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
