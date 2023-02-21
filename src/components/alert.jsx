import React, { Component, useEffect } from 'react';
import './Alert.css';

class Alert extends Component {
  //   static defaultProps = {
  //     message: 'Default Text',
  //     visible: false,
  //   };

  render() {
    const { message, visible } = this.props;

    return <div>{visible && <p className='alert'>{message}</p>}</div>;
  }
}

export default Alert;
