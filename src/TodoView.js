import React from 'react';

// state management
import { connect } from 'react-redux';
import { getTime } from './uiStateSlice';
import { getTodo } from './todosSlice';
//assets
import slyck_logo from './assets/slyck_logo.b754c182.png';

// components

import { Link } from 'react-router-dom';


export class TodoView extends React.Component {
  

  getHeadingTextContent() {
    const { todo } = this.props;
    return todo.text;
  }
  getTimeTextContent() {
    const { time } = this.props;
    return time;
  }

  render() {
    
    return (
      <div className="todo-view">
        <Link className="back-link" to="/">Back to list</Link>
        <h1>{this.getHeadingTextContent()}</h1>
        <h2>{this.getTimeTextContent()}</h2>
        <img src={slyck_logo} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    todo: getTodo(state, props),
    time: getTime(state, props)
  };
}

export default connect(
  mapStateToProps
)(TodoView);