import React from 'react'
import PropTypes from 'prop-types';
import TodoItemsRemaining from './TodoList/TodoItemsRemaining'; 
import TodoClearCompleted from './TodoList/TodoClearCompleted'; 

TodoList.propTypes = {
    addTodo: PropTypes.func,
    todos: PropTypes.array.isRequired,
    completeTodo: PropTypes.func.isRequired,
    markAsEditting: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    remaining: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired
}


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

      < TodoItemsRemaining 
          remaining={props.remaining} 
      />
    </div>

    <div className="other-buttons-container">
      <div>
        <button className="button filter-button filter-button-active">
          All
        </button>
        <button className="button filter-button">Active</button>
        <button className="button filter-button">Completed</button>
      </div>
      < TodoClearCompleted 
          clearCompleted={props.clearCompleted} 
      />

    </div>
  </>
  )
}

export default TodoList
