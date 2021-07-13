import React from 'react';

// state management
import { connect } from 'react-redux';
import { getTime } from './uiStateSlice';
import { getTodo } from './todosSlice';

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
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400px' height='300px' viewBox='0 0 400 300' version='1.1'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Placeholder' fill='%23000000'%3E%3Crect id='Rectangle' fill-opacity='0.048120471' x='0' y='0' width='400' height='300'%3E%3C/rect%3E%3Cpath d='M157.75463,266.203704 L100,220 L0,300 L163.5,300 L400,300 L263.5,150 L157.75463,266.203704 Z' id='Combined-Shape' fill-opacity='0.0504132699'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400px' height='300px' viewBox='0 0 400 300' version='1.1'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Placeholder' fill='%23000000'%3E%3Crect id='Rectangle' fill-opacity='0.048120471' x='0' y='0' width='400' height='300'%3E%3C/rect%3E%3Cpath d='M157.75463,266.203704 L100,220 L0,300 L163.5,300 L400,300 L263.5,150 L157.75463,266.203704 Z' id='Combined-Shape' fill-opacity='0.0504132699'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E" />
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