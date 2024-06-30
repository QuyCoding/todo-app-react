import {React,useState} from 'react'

export default function TodoForm(props) {
    
  const [newTodo, setNewTodo] = useState('Something'); //Set default value for newTodo
  
  //Trong Vue có thể sử dụng v model để biding 2 chiều khi input thay đổi
  //trong react điều này phải làm thủ công
  function handleInput(event){
    setNewTodo(event.target.value)
  }
  
  //Prevent default form submit
  function handleSubmid(event){
    event.preventDefault(); //Ngăn chặn gửi form đi khi nhấn Enter
    
    //Nếu không nhập gì mà bấm enter vẫn đẩy vào list, xử lý chặn nó
    if(newTodo.trim().length === 0 ){
      return ; 
    }
    
    props.addTodo(newTodo);
    
    setNewTodo(''); //Reset input value
  }
    
  return (
    <form action="#" onSubmit={handleSubmid}>
    <input
      type="text"
      value={newTodo}
      onChange={handleInput }
      className="todo-input"
      placeholder="What do you need to do?"
    />
    </form>
  )
}
