document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.querySelector('.todo-list');
    const addBtn = document.querySelector('.add-btn');
    const sortBtn = document.querySelector('.sort-btn');
    const sortIcon = document.querySelector('.sort-icon');
    
    let sortDirection = 0; 
    

    addBtn.addEventListener('click', function() {
        addNewTodoItem();
    });
    
  
    sortBtn.addEventListener('click', function() {
        sortTodos();
    });
    
    document.querySelectorAll('.todo-item').forEach(item => {
        setupTodoItem(item);
    });
    
    function addNewTodoItem() {
        const newItem = document.createElement('div');
        newItem.className = 'todo-item';
        
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'todo-input';
        newInput.placeholder = 'Enter task...';
        
        const newClearBtn = document.createElement('button');
        newClearBtn.className = 'clear-btn';
        newClearBtn.innerHTML = '✕';
        
        newItem.appendChild(newInput);
        newItem.appendChild(newClearBtn);
        todoList.appendChild(newItem);
        
        setupTodoItem(newItem);
        newInput.focus();
    }
    
    function setupTodoItem(item) {
        const input = item.querySelector('.todo-input');
        const clearBtn = item.querySelector('.clear-btn');
        

        clearBtn.addEventListener('click', function() {
            if (todoList.children.length > 1) {
                item.remove();
            } else {
                input.value = '';
            }
        });
        
      
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addNewTodoItem();
            }
        });
    }
    
    function sortTodos() {
        const items = Array.from(todoList.querySelectorAll('.todo-item'));
        
    
        sortDirection = (sortDirection + 1) % 3;
        
      
        if (sortDirection === 0) {
            sortIcon.style.transform = 'rotate(0deg)';
        } else if (sortDirection === 1) {
            sortIcon.style.transform = 'rotate(180deg)';
        } else {
            sortIcon.style.transform = 'rotate(0deg)';
        }
        
        if (sortDirection === 0) {
            
            return;
        }
        

        items.sort((a, b) => {
            const textA = a.querySelector('.todo-input').value.toLowerCase();
            const textB = b.querySelector('.todo-input').value.toLowerCase();
            
            if (sortDirection === 1) {
                return textA.localeCompare(textB);
            } else {
                return textB.localeCompare(textA);
            }
        });
        
        
        todoList.innerHTML = '';
        items.forEach(item => {
            todoList.appendChild(item);
        });
    }
});