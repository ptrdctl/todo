'use strict';

const field = document.querySelector('.field');
const button = document.querySelector('.add');
button.addEventListener('click', addTask);
const list = document.querySelector('.list');

function createTask(value) {
  
  const task = document.createElement('div');
  task.textContent = value;
  task.classList.add('task');
  
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('status');
  task.append(checkbox);
  checkbox.addEventListener('click', completeTask);
  
  return task;
  
}

function addTask() {
  
  if( field.value !== '' ) {
    const newTask = createTask(field.value);
    list.appendChild(newTask);
    field.value = '';
    
  }
}

function completeTask(event) {
  
  const target = event.target;
  
  if(target.checked) {
    target.parentElement.classList.add('success');
  } else {
    target.parentElement.classList.remove('success');
  }
}

