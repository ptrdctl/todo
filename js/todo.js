'use strict';

const field = document.querySelector('.field');
const button = document.querySelector('.add');
const list = document.querySelector('.list');

button.addEventListener('click', addTask);
document.addEventListener('keydown', function(event) {
  if(event.key == 'Enter') {addTask()}
});
document.addEventListener('dblclick', startEditTask);
document.addEventListener('pointerdown', deleteTask);


function createTask(value) {
  
  const task = document.createElement('div');
  const textBlock = document.createElement('div');
  textBlock.textContent = value;
  task.append(textBlock);
  task.classList.add('task');
  task.firstChild.classList.add('dontChangeCursor');
  
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


function startEditTask(event) {
  
  const target = event.target;
  if( target.className !== 'task' ) return;
  
  document.removeEventListener('dblclick', startEditTask);
  document.removeEventListener('pointerdown', deleteTask);
  
  const task = target;
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
    
    if( event.key == 'Enter' ) {
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
  document.addEventListener('dblclick', startEditTask);
  document.addEventListener('pointerdown', deleteTask);
  
}



function deleteTask (event) {
  
  
  const target = event.target;
  if( !(target.className === 'task' || target.parentElement.className === 'task') || target.className === 'status' ) return;
  let task;
  if( target.parentElement.className == 'task' ) {
    task = target.parentElement;
  } else if( target.className == 'task' ) {
    task = target;
  }
  
  event.preventDefault();
  /*console.log(target);
  task.onselectstart = task.onmousedown 
  = task.firstChild.onselectstart = task.firstChild.onmousedown
  task.onpointerdown = task.firstChild.onpointerdown = function() {
    console.log('select was prevented')
    return false
  }*/
  //task.onmousedown = null; // rewrite handler
  
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
    
    if( event.clientX > startX + 60 ) {
      
      document.removeEventListener('pointerup', onPointerUpAfterShortPointerMove);
      document.removeEventListener('pointermove', onPointerMove);
      task.lastChild.style.display = 'none';
      cancelButton.textContent = "Undo";
      task.append(cancelButton);
      cancelButton.addEventListener('click', cancelOfDelete);
      
      if(!IsCancelingDeleteByUndo) {
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
  
  if( isCancelingByPointerUpAfterPointerShortMove ) return;
  
  function cancelOfDelete() {
    
    cancelButton.removeEventListener('click', cancelOfDelete);
    task.lastChild.remove();
    task.firstChild.style.display = 'inline-block';
    task.lastChild.style.display = 'inline-block';
    task.classList.remove('deleting');
    IsCancelingDeleteByUndo = true;

  }
  
  function removeTask() {
    if(IsCancelingDeleteByUndo) return;
    task.remove();
  }
  
}



// development code:

//const test = document.querySelector('.test');
//test.addEventListener('click', addTestTasks)

/*function addTestTasks() {
  field.value = `Lorem ipsum: congue ipsum magna at orci mattis magna pharetra integer bibendum. Rutrum tempus pellentesque magna sodales elementum et metus lorem ultricies sodales, curabitur pellentesque amet ipsum mattis nam, lorem enim, ultricies: pellentesque sit. Congue pharetra diam tempus, arcu justo, morbi lectus non eget cursus elementum non, enim a vulputate. Eget curabitur maecenas diam at rutrum metus, gravida ipsum vitae elementum vivamus, sagittis congue.`;
  let newTask = createTask(field.value);
  list.appendChild(newTask);
  field.value = `Lorem ipsum: congue ipsum magna at orci mattis magna pharetra integer bibendum. Rutrum tempus pellentesque magna sodales elementum et metus lorem ultricies sodales, curabitur pellentesque amet ipsum mattis nam, lorem enim, ultricies: pellentesque sit. Congue pharetra diam tempus, arcu justo, morbi lectus non eget cursus elementum non, enim a vulputate. Eget curabitur maecenas diam at rutrum metus, gravida ipsum vitae elementum vivamus, sagittis congue.

Sit risus, quisque bibendum rutrum justo fusce duis diam in donec diam cursus commodo. Ipsum sapien justo bibendum pharetra, porta, amet ornare tempus at tellus. Non molestie ultricies nibh molestie ultricies sodales urna, curabitur auctor. Ligula quam justo elementum, cursus, pellentesque sit urna: ultricies eros gravida: in sagittis eget mattis pellentesque elementum et massa. Non sem, curabitur ultricies eros nec enim nec cursus donec, massa, leo commodo tellus leo duis eu commodo. Elementum leo massa nulla tellus vitae eget auctor tellus arcu, sed commodo integer sagittis nec, lorem rutrum donec cursus sit rutrum eu malesuada. In cursus mauris bibendum rutrum porta diam massa sodales, enim ornare congue porta ligula eu eros sapien — odio vitae at massa sed nam lorem, at.

Auctor justo sit molestie vulputate vitae orci a fusce vivamus sapien maecenas ut nam sapien metus sed proin fusce pellentesque elementum. Vitae maecenas justo leo sem lectus cursus at adipiscing sodales donec sagittis amet — pellentesque integer eget in et mauris, maecenas justo a sem. Ligula leo curabitur nulla arcu proin porttitor ultricies gravida et lorem ipsum metus sapien curabitur odio at vivamus porttitor cursus. Et integer in eget ut: lorem et lectus metus maecenas adipiscing nulla eros vitae at leo: orci. Vulputate eu molestie — mauris sapien congue diam leo elementum et sapien et in porttitor diam rutrum gravida auctor commodo massa, pharetra non proin donec nec.`;
  newTask = createTask(field.value);
  list.appendChild(newTask);
  field.value = `Lorem ipsum: congue ipsum magna at orci mattis magna pharetra integer bibendum. Rutrum tempus pellentesque magna sodales elementum et metus lorem ultricies sodales, curabitur pellentesque amet ipsum mattis nam, lorem enim, ultricies: pellentesque sit. Congue pharetra diam tempus, arcu justo, morbi lectus non eget cursus elementum non, enim a vulputate. Eget curabitur maecenas diam at rutrum metus, gravida ipsum vitae elementum vivamus, sagittis congue.

Sit risus, quisque bibendum rutrum justo fusce duis diam in donec diam cursus commodo. Ipsum sapien justo bibendum pharetra, porta, amet ornare tempus at tellus. Non molestie ultricies nibh molestie ultricies sodales urna, curabitur auctor. Ligula quam justo elementum, cursus, pellentesque sit urna: ultricies eros gravida: in sagittis eget mattis pellentesque elementum et massa. Non sem, curabitur ultricies eros nec enim nec cursus donec, massa, leo commodo tellus leo duis eu commodo. Elementum leo massa nulla tellus vitae eget auctor tellus arcu, sed commodo integer sagittis nec, lorem rutrum donec cursus sit rutrum eu malesuada. In cursus mauris bibendum rutrum porta diam massa sodales, enim ornare congue porta ligula eu eros sapien — odio vitae at massa sed nam lorem, at.

Auctor justo sit molestie vulputate vitae orci a fusce vivamus sapien maecenas ut nam sapien metus sed proin fusce pellentesque elementum. Vitae maecenas justo leo sem lectus cursus at adipiscing sodales donec sagittis amet — pellentesque integer eget in et mauris, maecenas justo a sem. Ligula leo curabitur nulla arcu proin porttitor ultricies gravida et lorem ipsum metus sapien curabitur odio at vivamus porttitor cursus. Et integer in eget ut: lorem et lectus metus maecenas adipiscing nulla eros vitae at leo: orci. Vulputate eu molestie — mauris sapien congue diam leo elementum et sapien et in porttitor diam rutrum gravida auctor commodo massa, pharetra non proin donec nec.

Arcu et risus ligula ornare in sapien porttitor, magna vivamus sodales sagittis leo enim. Donec ornare, sodales, vivamus sapien molestie non duis ligula rutrum leo. Morbi porta justo, quisque molestie sodales vivamus pharetra ultricies, quisque malesuada donec gravida nam.

Eu in leo justo nulla quisque cursus magna sodales quam fusce, sem urna. Eros nec pharetra metus justo, quisque bibendum lectus tempus at nulla adipiscing. Magna proin tempus: cursus sit — leo duis enim et sit — morbi. Nam: sed pharetra arcu, eros nec leo a malesuada gravida congue urna eros nam nibh bibendum. Ornare elementum molestie curabitur mauris nibh nec tellus curabitur tempus mauris pellentesque. At, urna auctor vivamus pellentesque tempus proin rutrum porta nec fusce gravida at morbi arcu maecenas ipsum orci. Tempus ornare adipiscing porttitor eu, porta, at bibendum malesuada tellus donec quisque, eros duis ornare enim mattis metus lectus diam sed sem.`;
  newTask = createTask(field.value);
  list.appendChild(newTask);
  field.value = '';
  
}*/