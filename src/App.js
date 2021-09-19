import React from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { Dialog } from '@capacitor/dialog';

// state management
import { connect } from 'react-redux';
import { authStateChanged, fetchTodos, addTodo } from './actions';
import { getDialogActiveState, getTodosState, getNewTodoName, getAuthState, toggleDialog, setNewTodoName } from './uiStateSlice';
import { getTodos } from './todosSlice';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';

// components
import { Switch, Route } from 'react-router-dom';
import TodoView from './TodoView';
import Modal from './Modal';
import TodoItem from './TodoItem';

import styled from 'styled-components';

const MainHeading = styled.h1`
  margin-bottom: 1rem;
`;
const Subheading = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: #555;
`;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.mainHeading = React.createRef();
this.photo = React.createRef();
    
    this.onClickMainHeading = this.onClickMainHeading.bind(this);
    this.onClickSubheading = this.onClickSubheading.bind(this);
    this.onChangeNewTodoInput = this.onChangeNewTodoInput.bind(this);
    this.onKeyUpNewTodoInput = this.onKeyUpNewTodoInput.bind(this);
    this.onClickNewTodoBtn = this.onClickNewTodoBtn.bind(this);
  }

  
  /**
   * Handles the componentDidMount event for the App component.
   * @param {Object} event - event object passed from browser
   */
  async componentDidMount(event) {
    const { fetchTodos, authStateChanged } = this.props;
    const mainHeading = this.mainHeading.current;
    fetchTodos();
    authStateChanged();
    mainHeading.style.backgroundColor = 'lavender';
  }
  /**
   * Handles the onClick event for the MainHeading element.
   * @param {Object} event - event object passed from browser
   */
  async onClickMainHeading(event) {
    const { toggleDialog } = this.props;
    const photo = this.photo.current;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    }); 
    
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    
    // Can be set to the src of an image now
    photo.src = imageUrl;
    
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: image.path,
      dialogTitle: 'Share with buddies',
    });
    //toggleDialog();
  }
  /**
   * Handles the onClick event for the Subheading element.
   * @param {Object} event - event object passed from browser
   */
  async onClickSubheading(event) {
    const {  } = this.props;
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Are you sure you'd like to press the red button?`,
    });
    
    if (value) {
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
    }
    
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

  getTodoViewId({ routeProps }) {
    const { id } = routeProps.match.params;
    return id;
  }
  doRenderTodoView() {
    const { todosState } = this.props;
    return todosState === 'ready';
  }
  getModalOnClick() {
    const { toggleDialog } = this.props;
    toggleDialog();
  }
  getTodoItemId({ todoItem }) {
    return todoItem.id;
  }
  getTodoItemLoop() {
    const { todos } = this.props;
    return todos;
  }

  render() {
    
    return (
      <React.Fragment>
        <Switch>
          <Route path="/todos/:id" render={routeProps => (
            <React.Fragment>
              {this.doRenderTodoView() && (
                <TodoView id={this.getTodoViewId({ routeProps })} />
              )}
            </React.Fragment>
          )} />
          <Route path="/" render={routeProps => (
            <React.Fragment>
              <Modal active={this.props.showDialog} message="Hello world" onClick={this.getModalOnClick.bind(this)}>
                <h1>Hello worldz</h1>
              </Modal>
              <div className="container">
                <MainHeading ref={this.mainHeading} onClick={this.onClickMainHeading}>Mashuelle</MainHeading>
                <Subheading onClick={this.onClickSubheading}>Hello world</Subheading>
                <img ref={this.photo} src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400px' height='300px' viewBox='0 0 400 300' version='1.1'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Placeholder' fill='%23000000'%3E%3Crect id='Rectangle' fill-opacity='0.048120471' x='0' y='0' width='400' height='300'%3E%3C/rect%3E%3Cpath d='M157.75463,266.203704 L100,220 L0,300 L163.5,300 L400,300 L263.5,150 L157.75463,266.203704 Z' id='Combined-Shape' fill-opacity='0.0504132699'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E" />
                <div className="new-todo-ui">
                  <input value={this.props.newTodoName} className="new-todo-input" type="text" onChange={this.onChangeNewTodoInput} onKeyUp={this.onKeyUpNewTodoInput} />
                  <button className="btn" onClick={this.onClickNewTodoBtn}>Add</button>
                </div>
                {this.getTodoItemLoop().map((todoItem, index) => (
                  <TodoItem key={todoItem.id} id={this.getTodoItemId({ todoItem })} />
                ))}
              </div>
            </React.Fragment>
          )} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    showDialog: getDialogActiveState(state, props),
    todosState: getTodosState(state, props),
    todos: getTodos(state, props),
    newTodoName: getNewTodoName(state, props),
    userLoggedIn: getAuthState(state, props)
  };
}

export default connect(
  mapStateToProps,
  { authStateChanged, fetchTodos, toggleDialog, addTodo, setNewTodoName }
)(App);