import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  static defaultProps = {
    type: 'button',
    onClick: () => {},
    text: 'Button',
    height: '48px',
  };

  handleClick = (event) => {
    const { onClick } = this.props;
    onClick(event);
  };

  render() {
    const { text, className, type, width, height } = this.props;

    const buttonStyles = {
      width: `${width}`,
      height: `${height}`,
    };

    return (
      <button type={type} className={`${className}`} onClick={this.handleClick} style={buttonStyles}>
        {text}
      </button>
    );
  }
}

export default Button;
