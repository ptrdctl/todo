'use strict';

const field = document.querySelector('.field');
const button = document.querySelector('.add');
const list = document.querySelector('.list');

button.addEventListener('click', addTask);
document.addEventListener('keydown', function(event) {
  if( event.key === 'Enter' ) {addTask()}
});
document.addEventListener('pointerdown', onPointerDown);


function createTask(value) {
  
  const task = document.createElement('div');
  const textBlock = document.createElement('div');
  textBlock.textContent = value;
  task.append(textBlock);
  task.classList.add('task');
  const target = task.firstChild;
  target.classList.add('dontChangeCursor');
  
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('status');
  task.append(checkbox);
  checkbox.addEventListener('click', completeTask);
  
  return task;
  
}


function addTask() {
  
  if( field.value.trim() !== '' ) {
    
    const newTask = createTask(field.value);
    list.prepend(newTask);
    field.value = '';
    
  }
  
}


function completeTask(event) {
  
  const target = event.target;
  
  if( target.checked ) {
    target.parentElement.classList.add('success');
  } else {
    target.parentElement.classList.remove('success');
  }
  
}


function startEditTask(event, task) {
  
  const text = task.firstChild.textContent;
  task.firstChild.remove();
  task.lastChild.remove();
  const textArea = document.createElement('textarea');
  textArea.textContent = text;
  task.append(textArea);
  
  const button = document.createElement('button');
  button.textContent = 'Ok';
  task.append(button);
  button.addEventListener('click', finishEditTaskByOk);
  
  document.addEventListener('keydown', pressEnterToEndEditTask);
  
  function pressEnterToEndEditTask(event) {
    
    if( event.key === 'Enter' ) {
      finishEditTaskByEnter(task);
    }
    
  }
  
  function finishEditTaskByEnter(task) {
    
    if( task.firstChild.value.trim() === '' ) return;
    finishEditTask(task);
    document.removeEventListener('keydown', pressEnterToEndEditTask);
    
  }
  
  function finishEditTaskByOk(event) {
    
    if( event.target.previousElementSibling.value.trim() === '' ) return;
  
    const task = event.target.parentElement;
    finishEditTask(task);
    document.removeEventListener('keydown', pressEnterToEndEditTask);
    
  }
  
}


function finishEditTask(task) {
  
  const text = task.firstChild.value.trim();
  task.firstChild.remove();
  task.lastChild.remove();
  const textBlock = document.createElement('div');
  task.appendChild(textBlock);
  task.firstChild.textContent = text;
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('status');
  task.firstChild.classList.add('dontChangeCursor');
  
  task.append(checkbox);
  checkbox.addEventListener('click', completeTask);
  document.addEventListener('pointerdown', onPointerDown);
  
}


function getTask(event) { 

  const target = event.target;
  if( !(target.className === 'task' || target.parentElement.className === 'task') 
    || target.className === 'status' ) return;
  let task;
  if( target.parentElement.className === 'task' ) {
    task = target.parentElement;
  } else if( target.className === 'task' ) {
    task = target;
  }
  return task;
  
}


function onPointerDown(event) {
  
  const task = getTask(event);
  if(!task) return;
  
  event.preventDefault();
  
  let isPointerUp = false;
  
  document.addEventListener('pointerup', onPointerUp);
  
  function onPointerUp() {
    
    isPointerUp = true;
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerdown', onDoublePointerDown);
    let isDoublePointerDown = false;
    
    function onDoublePointerDown(event) {
      
      const task = getTask(event);
      if( !task ) return;
      document.removeEventListener('pointerdown', onDoublePointerDown);
      isDoublePointerDown = true;
      startEditTask(event, task);
      
    }
    
    setTimeout(cancelDoublePointerDown, 300);
    
    function cancelDoublePointerDown() {
      
      if(isDoublePointerDown) return;
      document.removeEventListener('pointerdown', onDoublePointerDown);
      document.addEventListener('pointerdown', onPointerDown);
      
    }
    
  }
  
  if(isPointerUp) return;
  
  deleteTask(event, task);
  
}


function deleteTask(event, task) {
  
  task.setPointerCapture(event.pointerId);
  const startX = event.clientX;
  
  document.addEventListener('pointerup', onPointerUpAfterPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  let isCancelingByPointerUpAfterPointerDown = false;
  
  function onPointerUpAfterPointerDown() {
    
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUpAfterPointerDown);
    isCancelingByPointerUpAfterPointerDown = true;
    
  }
  
  if( isCancelingByPointerUpAfterPointerDown ) return;
  
  
  let isCancelingByPointerUpAfterPointerShortMove = false;
  let IsCancelingDeleteByUndo = false;
  const cancelButton = document.createElement('button');
  
  function onPointerMove(event) {
      
    if( event.clientX > startX + 10 ) {
      
      task.classList.add('deleting');
      document.removeEventListener('pointerup', onPointerUpAfterPointerDown);
      document.addEventListener('pointerup', onPointerUpAfterShortPointerMove);
      
    }
  
    if( event.clientX > startX + 50 ) {
      
      document.removeEventListener('pointerup', onPointerUpAfterShortPointerMove);
      document.removeEventListener('pointermove', onPointerMove);
      task.lastChild.style.display = 'none';
      cancelButton.textContent = "Undo";
      task.append(cancelButton);
      cancelButton.addEventListener('click', cancelOfDelete);
      
      if( !IsCancelingDeleteByUndo ) {
        setTimeout(removeTask, 4000);
      }
      
    }
    
  }
  
  function onPointerUpAfterShortPointerMove() {
    
    task.classList.remove('deleting');
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUpAfterShortPointerMove);
    isCancelingByPointerUpAfterPointerShortMove = true;
    
  }
  
  function cancelOfDelete() {
  
    cancelButton.removeEventListener('click', cancelOfDelete);
    task.lastChild.remove();
    task.firstChild.style.display = 'inline-block';
    task.lastChild.style.display = 'inline-block';
    task.classList.remove('deleting');
    IsCancelingDeleteByUndo = true;
    
  }

  function removeTask() {
    
    if( IsCancelingDeleteByUndo ) return;
    task.remove();
    
  }
  
}