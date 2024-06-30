import { useState } from 'react';
import '../reset.css';
import '../App.css';
/*
  #TODO 
    1. Xử lý hiển thị giá trị mặc định vào todo list khi bấm enter
    2. XỬ lý hiển thị lại giá trị khi input thay đổi vào todo list
*/

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Đây là Function component react',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
    },
  ]);

  function addTodo(event) {
    event.preventDefault(); //Ngăn chặn gửi form đi khi nhấn Enter
    
    //Nếu không nhập gì mà bấm enter vẫn đẩy vào list, xử lý chặn nó
    if(newTodo.trim().length === 0 ){
      return ; 
    }
    
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: newTodo,
        isComplete: false,
      },
    ]);
    
    setNewTodo('')
  }
  
  const [newTodo, setNewTodo] = useState('Something'); //Set default value for newTodo
  
  //Trong Vue có thể sử dụng v model để biding 2 chiều khi input thay đổi
  //trong react điều này phải làm thủ công
  function handleInput(event){
    setNewTodo(event.target.value)
  }
   
  /* //Click vào button X thì xoá Todo đó
    1. Hàm arrow trong thuộc tính onClick
     • onClick={() => deleteTodo(todo.id)}: Sử dụng hàm arrow để trì hoãn việc gọi hàm deleteTodo cho đến khi sự kiện onClick xảy ra.
     • onClick={deleteTodo(todo.id)}: Gọi hàm deleteTodo ngay lập tức khi component render (Khi trang web được load)
    Khi định nghĩa hàm :
    function deleteTodo (id){ 
      //do something
    }
    2. Chuyển arrow function vào trong hàm deleteTodo
      <button onClick={handleClick} className="x-button">Delete</button
      Khi định nghĩa hàm :
      const handleClick = () => {
        deleteTodo(todo.id);
      };
  */
  function deleteTodo (id){
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  const handleDelete = (id) => () => {
    deleteTodo(id);
  };
  
 
  
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={handleInput }
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" />
                <span className="todo-item-label">{todo.title}</span>
                {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
              </div>
              <button onClick={handleDelete(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;