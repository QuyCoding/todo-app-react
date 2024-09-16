import React from 'react'
import PropTypes from 'prop-types';

TodoClearCompleted.propTypes = {
  clearCompleted: PropTypes.func.isRequired
}

function TodoClearCompleted(props) {
  return (
    <div>
        <button 
            className="button"
            onClick={props.clearCompleted}
        >
        Clear completed
        </button>
    </div>
  )
}

export default TodoClearCompleted
