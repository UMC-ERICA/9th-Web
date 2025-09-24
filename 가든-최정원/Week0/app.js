//엔터 입력시 해야할일로 넘어가게
//완료 버튼 - > 완료된일로 넘어가게
//삭제 -> 삭제. 


const input = document.querySelector('#todo-input'); 
const todoList = document.querySelector('#todo-list');
const completedList = document.querySelector('#completed-list');


// 2. Enter 키 이벤트로 할 일 추가
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        // 입력 값이 비어있지 않을 때만 실행
        addTodoItem(input.value);
        input.value = ''; // 입력창 초기화
    }

    
});


function addTodoItem(text) {
    const li = document.createElement('li');  // li 생성
    li.textContent = text;                    // 텍스트 설정

    // 완료 버튼 생성
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '완료';
    completeBtn.classList.add('complete-btn');

    li.appendChild(completeBtn);
    todoList.appendChild(li);

    completeBtn.addEventListener('click', function() {
        completedList.appendChild(li); // 완료 목록으로 이동
        completeBtn.remove();          // 완료 버튼 제거

        // 완료 목록에는 삭제 버튼 추가
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        // 삭제 버튼 클릭 시 li 제거
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
    });
}