import React from 'react'

function TodoItemsRemaining(props) {
  return (
    <span>{props.remaining()} items remaining</span>
  )
}

export default TodoItemsRemaining
