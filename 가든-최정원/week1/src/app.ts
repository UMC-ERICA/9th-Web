//버튼 클릭시 -> 할 일로 넘어감. 
//할 일에서 완료버튼 누를시 -> 완료 로 넘어감
//완료 버튼에서 삭제누를 시 할 일 삭제됨.

const input = document.querySelector('#todo-input') as HTMLInputElement;
const todoList = document.querySelector('#todo-list') as HTMLUListElement;
const completedList = document.querySelector('#completed-list') as HTMLUListElement;
const button = document.querySelector('#add-btn') as HTMLButtonElement;

button.addEventListener('click', function() { 
    
    if (input.value.trim() !== '') {
        // 입력 값이 비어있지 않을 때만 실행
        addtodoList(input.value);
        input.value = ''; // 입력창 초기화
    }
});

function addtodoList(text : string)
{
//봐바 입력값 받았잖아. 그러면 이걸로 할일에 추가를 해줘야해.그러러면 텍스트 문자열을 하나 만들고 추가하는 함수를 써줘야해
    const li = document.createElement('li')
    li.textContent = text;
    todoList.appendChild(li);
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '완료';
    completeBtn.classList.add('complete-btn')
    li.appendChild(completeBtn);
    completeBtn.addEventListener('click',function(){
        completeBtn.remove();     
        completedList.appendChild(li)
        const removeBtn = document.createElement('button')
        removeBtn.textContent = '삭제'
        li.appendChild(removeBtn)
        removeBtn.addEventListener('click', function() {
            li.remove();
        })
    })


}