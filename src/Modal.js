import React from 'react';
import ReactDOM from 'react-dom';

// state management
import { connect } from 'react-redux';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';

// components

import styled from 'styled-components';

const Dialog = styled.div`
  align-items: center;
    background-color: rgba(220,220,220,0.5);
    top: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
`;
const DialogBox = styled.div`
  border-radius: 1rem;
    background-color: white;
    border: 1px solid #bbb;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    padding: 4rem;
`;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClickDialog = this.onClickDialog.bind(this);
  }

  
  /**
   * Handles the onClick event for the Dialog element.
   * @param {Object} event - event object passed from browser
   */
  onClickDialog(event) {
    const { onClick } = this.props;
    onClick();
  }

  getDialogVisibility() {
    const { active } = this.props;
    return active;
  }

  render() {
    
    return ReactDOM.createPortal((
      <React.Fragment>
        {this.getDialogVisibility() && (
          <Dialog onClick={this.onClickDialog} className="dialog">
          <DialogBox className="dialog-box">Hello world</DialogBox>
        </Dialog>
        )}
      </React.Fragment>
    ), document.getElementById('_portal'))
  }
}

