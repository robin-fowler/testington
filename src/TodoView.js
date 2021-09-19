import React from 'react';
import { getAuth, signOut, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

// state management
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { getTime, getAuthState } from './uiStateSlice';
import { getTodo } from './todosSlice';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';

// components
import SavedPackages from './SavedPackages';

import { Link } from 'react-router-dom';


export class TodoView extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClickSignInBtn = this.onClickSignInBtn.bind(this);
    this.onClickSignOutBtn = this.onClickSignOutBtn.bind(this);
    this.onClickGetDataBtn = this.onClickGetDataBtn.bind(this);
  }

  
  /**
   * Handles the onClick event for the SignInBtn element.
   * @param {Object} event - event object passed from browser
   */
  onClickSignInBtn(event) {
    const {  } = this.props;
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    provider.addScope('repo');
    signInWithPopup(auth, provider).catch(e => console.log(e));
  }
  /**
   * Handles the onClick event for the SignOutBtn element.
   * @param {Object} event - event object passed from browser
   */
  onClickSignOutBtn(event) {
    const {  } = this.props;
    const auth = getAuth();
    signOut(auth);
  }
  /**
   * Handles the onClick event for the GetDataBtn element.
   * @param {Object} event - event object passed from browser
   */
  onClickGetDataBtn(event) {
    const { fetchData } = this.props;
    fetchData();
  }

  getHeadingTextContent() {
    const { todo } = this.props;
    return todo.text;
  }
  getTimeTextContent() {
    const { time } = this.props;
    return time;
  }
  doRenderSignInBtn() {
    const { userLoggedIn } = this.props;
    return !userLoggedIn;
  }
  doRenderSignOutBtn() {
    const { userLoggedIn } = this.props;
    return userLoggedIn;
  }
  doRenderGetDataBtn() {
    const { userLoggedIn } = this.props;
    return userLoggedIn;
  }

  render() {
    
    return (
      <div className="todo-view">
        <Link className="back-link" to="/">Back to list</Link>
        <h1>{this.getHeadingTextContent()}</h1>
        <h2>{this.getTimeTextContent()}</h2>
        {this.doRenderSignInBtn() && (
          <button onClick={this.onClickSignInBtn}>Sign in</button>
        )}
        {this.doRenderSignOutBtn() && (
          <button onClick={this.onClickSignOutBtn}>Sign out</button>
        )}
        {this.doRenderGetDataBtn() && (
          <button onClick={this.onClickGetDataBtn}>Get data</button>
        )}
        <SavedPackages />
        <img src={hero_2} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    todo: getTodo(state, props),
    time: getTime(state, props),
    userLoggedIn: getAuthState(state, props)
  };
}

export default connect(
  mapStateToProps,
  { fetchData }
)(TodoView);