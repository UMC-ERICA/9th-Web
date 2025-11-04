const form = document.getElementById('todo-form');
const input= document.getElementById('todo-input');
const  todoList=document.getElementById('todo-list');
const  doneList=document.getElementById('done-list');

form.addEventListener('submit', function(event){
  event.preventDefault();
  const text= input.value.trim();
  const li=makeItem(text);
  todoList.appendChild(li);
  input.value='';
  input.focus();
})

function makeItem(text) {
  const li = document.createElement('li');  
  const span = document.createElement('span');
  span.textContent = text;

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '완료';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';

  completeBtn.addEventListener('click', function () {
    doneList.appendChild(li);
    completeBtn.remove();
  })

  deleteBtn.addEventListener('click', function () {
    li.remove();
  });

  // li 안에 순서대로 넣기
  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  return li;
}