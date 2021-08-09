import React from 'react';
import ReactDOM from 'react-dom';

// state management
import { connect } from 'react-redux';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';

// components

import styled, { keyframes } from 'styled-components';

const test = keyframes`
  100% {
    transform:scale(1);
  }
  0% {
    transform:scale(0.8);
  }
`;
const fadeIn = keyframes`
  100% {
    opacity:1;
  }
  0% {
    opacity:0;
  }
`;
const Dialog = styled.div`
  align-items: center;
  background-color: rgba(220,220,220,0.5);
  top: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease;
`;
const DialogBox = styled.div`
  border-radius: 1rem;
  background-color: white;
  border: 1px solid #bbb;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  padding: 2rem;
  box-sizing: border-box;
  line-height: 1.2;
  animation: ${test} 0.5s ease;
`;
const DialogTitle = styled.div`
  &:not(:empty) {
    margin-bottom: 0.6rem;
  }
  
  font-weight: 600;
`;
const DialogButtons = styled.div`
  &:not(:empty) {
    margin-top: 0.8rem;
    display: flex;
    justify-content: flex-end;
  }
`;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClickDialog = this.onClickDialog.bind(this);
    this.onClickDialogButton = this.onClickDialogButton.bind(this);
  }

  
  /**
   * Handles the onClick event for the Dialog element.
   * @param {Object} event - event object passed from browser
   */
  onClickDialog(event) {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
  }
  /**
   * Handles the onClick event for the DialogButton element.
   * @param {Object} event - event object passed from browser
   */
  onClickDialogButton({ dialogButton }, event) {
    const {  } = this.props;
    if (typeof dialogButton === 'object' && typeof dialogButton.onClick === 'function') {
      dialogButton.onClick(event);
    }
  }

  getDialogstyle() {
    const { overlayColor } = this.props;
    const style = {};
    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }
    return style;
  }
  getDialogVisibility() {
    const { active } = this.props;
    return active;
  }
  getDialogBoxstyle() {
    const { width } = this.props;
    const style = {};
    if (width) {
      style.width = width;
    }
    return style;
  }
  getDialogTitleTextContent() {
    const { title } = this.props;
    return title;
  }
  getDialogMessageTextContent() {
    const { message } = this.props;
    return message;
  }
  getDialogButtonTextContent({ dialogButton }) {
    if (typeof dialogButton == 'object' && dialogButton.text) {
      return dialogButton.text;
    }
  }
  getDialogButtonLoop() {
    const { buttons } = this.props;
    if (Array.isArray(buttons)) {
      return buttons;
    } else {
      return [];
    }
  }

  render() {
    
    return ReactDOM.createPortal((
      <React.Fragment>
        {this.getDialogVisibility() && (
          <Dialog onClick={this.onClickDialog} style={this.getDialogstyle()}>
          <DialogBox style={this.getDialogBoxstyle()}>
            <DialogTitle style={this.props.titleStyles}>{this.getDialogTitleTextContent()}</DialogTitle>
            <div style={this.props.messageStyles}>{this.getDialogMessageTextContent()}</div>
            <DialogButtons>
              <React.Fragment>
                {this.getDialogButtonLoop().map((dialogButton, index) => (
                  <button key={index} onClick={this.onClickDialogButton.bind(this, {dialogButton})}>{this.getDialogButtonTextContent({ dialogButton })}</button>
                ))}
              </React.Fragment>
            </DialogButtons>
          </DialogBox>
        </Dialog>
        )}
      </React.Fragment>
    ), document.getElementById('_portal'))
  }
}

