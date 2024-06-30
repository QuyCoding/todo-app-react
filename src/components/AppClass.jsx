import React, { Component } from 'react';
import '../reset.css';
import '../App.css';

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: 'Đây là Class component react',
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
      ],
      newTodo: '', // State to hold the value of the new todo input
    };
  }
  
  // Event handler to add a new todo
  addTodo = (event) => {
    event.preventDefault();
    
    // Check if newTodo is not empty
    if (this.state.newTodo.trim() !== '') {
      this.setState((prevState) => ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.todos.length + 1,
            title: prevState.newTodo,
            isComplete: false,
          },
        ],
        newTodo: '', // Clear the input field after adding todo
      }));
    }
  };

  // Event handler to update newTodo state as user types
  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  render() {
    return (
      <div className="todo-app-container">
        <div className="todo-app">
          <h2>Todo App</h2>
          <form action="#" onSubmit={this.addTodo}>
            <input
              type="text"
              value={this.state.newTodo}
              onChange={this.handleInputChange}
              className="todo-input"
              placeholder="What do you need to do?"
            />
          </form>

          <ul className="todo-list">
            {this.state.todos.map((todo) => (
              <li key={todo.id} className="todo-item-container">
                <div className="todo-item">
                  <input type="checkbox" />
                  <span className="todo-item-label">{todo.title}</span>
                </div>
                <button className="x-button">
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
            <span>{this.state.todos.filter(todo => !todo.isComplete).length} items remaining</span>
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
}
