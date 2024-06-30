import React from 'react'

function TodoList(props) {
  return (
    <>
    <ul className="todo-list">
      {props.todos.map((todo, index) => (
        <li key={todo.id} className="todo-item-container">
          <div className="todo-item">
            <input 
              type="checkbox" 
              checked={todo.isComplete}
              onChange={() => props.completeTodo(todo.id)}
            />
          {todo.isEditing ? (
            <input 
            type="text" 
            className="todo-item-input" 
            // value={todo.title} // Giá trị của input
            defaultValue={todo.title} //Giá trị mặc định của input có thể nhập liệu lại
            autoFocus //Tự động focus vào input khi được render
            onBlur={(event) => props.updateTodo(event,todo.id)} //Khi người dùng click ra ngoài input, input sẽ mất focus và chuyển về trạng thái ban đầu
            onKeyDown={(event) => {
              if(event.key === 'Enter'){
                props.updateTodo(event,todo.id)
              } else if(event.key === 'Escape'){
                props.cancelEdit(event,todo.id)
              }
            }
          }
            />
          ):(
            <>
              <span
                onDoubleClick={() => props.markAsEditting(todo.id)} 
                className={`todo-item-label ${todo.isComplete ? 'line-through' : '' }`}
              >
              {todo.title}
              </span>
            </>
          )}
            
          </div>
          <button onClick={props.handleDelete(todo.id)} className="x-button">
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
  </>
  )
}

export default TodoList
