import React from 'react';

// state management
import { connect } from 'react-redux';
import { fetchTodos, addTodo } from './actions';
import { getDialogActiveState, getTodosState, getNewTodoName, toggleDialog, setNewTodoName } from './uiStateSlice';
import { getTodos } from './todosSlice';
//assets
import slyck_logo from './assets/slyck_logo.b754c182.png';

// components
import { Switch, Route } from 'react-router-dom';
import TodoView from './TodoView';
import TodoItem from './TodoItem';


export class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClickMainHeading = this.onClickMainHeading.bind(this);
    this.onChangeNewTodoInput = this.onChangeNewTodoInput.bind(this);
    this.onKeyUpNewTodoInput = this.onKeyUpNewTodoInput.bind(this);
    this.onClickNewTodoBtn = this.onClickNewTodoBtn.bind(this);
  }

  
  /**
   * Handles the componentDidMount event for the App component.
   * @param {Object} event - event object passed from browser
   */
  async componentDidMount(event) {
    const { fetchTodos } = this.props;
    fetchTodos();
  }
  /**
   * Handles the onClick event for the MainHeading element.
   * @param {Object} event - event object passed from browser
   */
  onClickMainHeading(event) {
    const { toggleDialog } = this.props;
    toggleDialog(); 
  }
  /**
   * Handles the onChange event for the NewTodoInput element.
   * @param {Object} event - event object passed from browser
   */
  onChangeNewTodoInput(event) {
    const { setNewTodoName } = this.props;
    const name = event.target.value;
    setNewTodoName({ name });
  }

  /**
   * Handles the onKeyUp event for the NewTodoInput element.
   * @param {Object} event - event object passed from browser
   */
  onKeyUpNewTodoInput(event) {
    const { addTodo, newTodoName } = this.props;
    if (event.keyCode === 13) {
      addTodo({text: newTodoName});
    }
  }
  /**
   * Handles the onClick event for the NewTodoBtn element.
   * @param {Object} event - event object passed from browser
   */
  onClickNewTodoBtn(event) {
    const { addTodo, newTodoName } = this.props;
    addTodo({text: newTodoName});
  }

  getTodoViewid({ routeProps }) {
    const { id } = routeProps.match.params;
    return id;
  }
  getTodoViewVisibility() {
    const { todosState } = this.props;
    return todosState === 'ready';
  }
  getTodoItemid({ todoItem }) {
    return todoItem.id;
  }
  getTodoItemLoop() {
    const { todos } = this.props;
    return todos;
  }

  render() {
    
    return (
      <Switch>
        <Route path="/todos/:id" render={routeProps => (
          <React.Fragment>
            {this.getTodoViewVisibility() && (
              <TodoView id={this.getTodoViewid({ routeProps })} />
            )}
          </React.Fragment>
        )} />
        <Route path="/" render={routeProps => (
          <div className="container">
            <h1 onClick={this.onClickMainHeading}>Todayz</h1>
            <h2>Hello world.</h2>
            <div className="new-todo-ui">
              <input value={this.props.newTodoName} className="new-todo-input" type="text" onChange={this.onChangeNewTodoInput} onKeyUp={this.onKeyUpNewTodoInput} />
              <button className="btn" onClick={this.onClickNewTodoBtn}>Add</button>
            </div>
            {this.getTodoItemLoop().map((todoItem, index) => (
              <TodoItem key={index} id={this.getTodoItemid({ todoItem })} />
            ))}
          </div>
        )} />
      </Switch>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    showDialog: getDialogActiveState(state, props),
    todosState: getTodosState(state, props),
    todos: getTodos(state, props),
    newTodoName: getNewTodoName(state, props)
  };
}

export default connect(
  mapStateToProps,
  { fetchTodos, toggleDialog, addTodo, setNewTodoName }
)(App);