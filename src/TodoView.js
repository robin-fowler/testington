import React from 'react';

// state management
import { connect } from 'react-redux';
import { getTime } from './uiStateSlice';
import { getTodo } from './todosSlice';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';

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
        <img src={hero_2} />
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