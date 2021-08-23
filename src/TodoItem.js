import React from 'react';

// state management
import { connect } from 'react-redux';
import { updateTime } from './uiStateSlice';
import { getTodo, setTodoChecked, setTodoText, removeTodo } from './todosSlice';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';

// components

import { Link } from 'react-router-dom';


export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.onChangeTodoCheckbox = this.onChangeTodoCheckbox.bind(this);
    this.onChangeTodoText = this.onChangeTodoText.bind(this);
    this.onClickTodoLink = this.onClickTodoLink.bind(this);
    this.onClickTodoDeleteBtn = this.onClickTodoDeleteBtn.bind(this);
  }

  
  /**
   * Handles the onChange event for the TodoCheckbox element.
   * @param {Object} event - event object passed from browser
   */
  onChangeTodoCheckbox(event) {
    const { setTodoChecked, id } = this.props;
    const checked = event.target.checked;
    setTodoChecked({ id, checked });
  }
  /**
   * Handles the onChange event for the TodoText element.
   * @param {Object} event - event object passed from browser
   */
  onChangeTodoText(event) {
    const { setTodoText, id } = this.props;
    const text = event.target.value;
    setTodoText({ id, text });
  }
  /**
   * Handles the onClick event for the TodoLink element.
   * @param {Object} event - event object passed from browser
   */
  onClickTodoLink(event) {
    const { updateTime } = this.props;
    updateTime();
  }
  /**
   * Handles the onClick event for the TodoDeleteBtn element.
   * @param {Object} event - event object passed from browser
   */
  onClickTodoDeleteBtn(event) {
    const { removeTodo, id } = this.props;
    removeTodo({ id });
  }

  getTodoCheckboxchecked() {
    const { todo } = this.props;
    return todo.checked;
  }
  getTodoTextvalue() {
    const { todo } = this.props;
    return todo.text;
  }
  getTodoLinkto() {
    const { id } = this.props;
    return `/todos/${id}`;
  }

  render() {
    
    return (
      <div className="todo-item">
        <input checked={this.getTodoCheckboxchecked()} type="checkbox" onChange={this.onChangeTodoCheckbox} />
        <input value={this.getTodoTextvalue()} className="todo-input" type="text" onChange={this.onChangeTodoText} />
        <Link to={this.getTodoLinkto()} className="btn" onClick={this.onClickTodoLink}>→</Link>
        <button className="btn" onClick={this.onClickTodoDeleteBtn}>X</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    todo: getTodo(state, props)
  };
}

export default connect(
  mapStateToProps,
  { setTodoChecked, setTodoText, updateTime, removeTodo }
)(TodoItem);