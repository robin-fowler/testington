import React from 'react';
import ReactDOM from 'react-dom';

// state management
import { connect } from 'react-redux';
import { toggleDialog } from './uiStateSlice';
import {  } from './todosSlice';
//assets
import slyck_logo from './assets/slyck_logo.b754c182.png';


export class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClickDialog = this.onClickDialog.bind(this);
  }

  
  /**
   * Handles the onClick event for the Dialog element.
   * @param {Object} event - event object passed from browser
   */
  onClickDialog(event) {
    const { toggleDialog } = this.props;
    toggleDialog();
  }

  getDialogVisibility() {
    const { active } = this.props;
    return active;
  }

  render() {
    
    return ReactDOM.createPortal((
      <React.Fragment>
        {this.getDialogVisibility() && (
          <div onClick={this.onClickDialog} className="dialog">
          <div className="dialog-box">Hello world</div>
        </div>
        )}
      </React.Fragment>
    ), document.getElementById('_portal'))
  }
}


export default connect(
  null,
  { toggleDialog }
)(Modal);