import { useState } from 'react';
import '../reset.css';
import '../App.css';
/*
  #TODO 
  Mô tả tổng quan về các chức năng cần triển khai 
    1. Xử lý hiển thị giá trị mặc định vào todo list khi bấm enter
    2. XỬ lý hiển thị lại giá trị khi input thay đổi vào todo list
    3. Xử lý xoá todo khi click vào button X
    4. Xử lý check todo khi click vào checkbox
       Xử lý đánh dấu chỉnh sửa lại todo khi double click vào todo đã được thêm vào danh sách 
  #Debug trong input onDoubleClick={() => console.log('Editting')}   
  
  #NOTE
  • autoFocus : tự động focus vào input khi được render
    - Khi component chứa đoạn mã này được render ra lần đầu tiên,
     input sẽ tự động có focus và người dùng có thể bắt đầu nhập liệu ngay lập tức mà không cần phải click vào input đó.
  • onDoubleClick : sự kiện xảy ra khi double click vào một phần tử
  • onBlur : sự kiện xảy ra khi một phần tử mất focus
    - Khi người dùng click ra ngoài input, input sẽ mất focus và chuyển về trạng thái ban đầu
    
*/

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Đây là Function component react',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
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
  
  //Check todo khi click vào checkbox 
  /*
  //Duyệt qua mảng todos, nếu id của todo trùng với id truyền vào thì đảo ngược giá trị isComplete ban đầu
     NOTE : cách viết này : return {...todo, isComplete: !todo.isComplete}
      • ...todo : giữ nguyên các giá trị của todo cũ 
      • isComplete: !todo.isComplete : đảo ngược giá trị isComplete ban đầu trong todo đó
    => Kết quả trả về là một mảng mới với giá trị isComplete của todo đó đã được đảo ngược
  */
  function completeTodo (id){
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        return {...todo, isComplete: !todo.isComplete}
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  
  //Mark as editting
  function markAsEditting(id){
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        return {...todo, isEditing: !todo.isEditing}
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  
  //Update todo
  /*
    Mô tả : 
    1. Duyệt qua mảng todos, nếu id của todo trùng với id truyền vào thì cập nhật lại title của todo đó
    2. Nếu input rỗng thì không cho phép update
    3. Khi người dùng click ra ngoài input, input sẽ mất focus và chuyển về trạng thái ban đầu
  */
  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });
  
    setTodos(updatedTodos);
  }
  
  //cancelEdit
  /* 
    Mô tả :
    Trong khi đang chỉnh sửa todo, nếu người dùng nhấn phím Escape thì hủy bỏ việc chỉnh sửa
    1. Duyệt qua mảng todos, nếu id của todo trùng với id truyền vào thì hủy bỏ việc chỉnh sửa quay lại trạng thái ban đầu
  */
 
  function cancelEdit(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
  
    setTodos(updatedTodos);
  }
 
  
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
                <input 
                  type="checkbox" 
                  checked={todo.isComplete}
                  onChange={() => completeTodo(todo.id)}
                />
              {todo.isEditing ? (
                <input 
                type="text" 
                className="todo-item-input" 
                // value={todo.title} // Giá trị của input
                defaultValue={todo.title} //Giá trị mặc định của input có thể nhập liệu lại
                autoFocus //Tự động focus vào input khi được render
                onBlur={(event) => updateTodo(event,todo.id)} //Khi người dùng click ra ngoài input, input sẽ mất focus và chuyển về trạng thái ban đầu
                onKeyDown={(event) => {
                  if(event.key === 'Enter'){
                    updateTodo(event,todo.id)
                  } else if(event.key === 'Escape'){
                    cancelEdit(event,todo.id)
                  }
                }
              }
                />
              ):(
                <>
                  <span
                    onDoubleClick={() => markAsEditting(todo.id)} 
                    className={`todo-item-label ${todo.isComplete ? 'line-through' : '' }`}
                  >
                  {todo.title}
                  </span>
                </>
              )}
                
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