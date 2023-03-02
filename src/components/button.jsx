import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	static defaultProps = {
		type: 'button',
		handleAction: () => {},
		text: 'Button',
		height: '38px',
	};

	render() {
		const { handleAction, text, className, type, width, height } = this.props;

		const buttonStyles = {
			width: `${width}`,
			height: `${height}`,
		};

		return (
			<button type={type} className={`${className}`} onClick={handleAction} style={buttonStyles}>
				{text}
			</button>
		);
	}
}

export default Button;
