'use strict';

const field = document.querySelector('.field');
const button = document.querySelector('.add');
button.addEventListener('click', addTask);
document.addEventListener('keydown', function(event) {
  if(event.key == 'Enter') {addTask()}
});
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
  
  if( field.value.trim() !== '' ) {
    
    const newTask = createTask(field.value);
    list.prepend(newTask);
    //list.appendChild(newTask);
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

// development code:

const test = document.querySelector('.test');
test.addEventListener('click', addTestTasks)

function addTestTasks() {
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
  
}