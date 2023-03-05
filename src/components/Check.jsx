import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './Check.css';

class Check extends Component {
	render() {
		const { condition1, condition2, condition3, className } = this.props;
		return (
			<label htmlFor={condition3} className={className}>
				<FontAwesomeIcon
					icon={faCircleCheck}
					className={condition1 && !condition2 ? 'valid' : 'hide'}
				/>
				<FontAwesomeIcon
					icon={faCircleXmark}
					className={!condition1 && !condition2 && condition3 ? 'valid' : 'hide'}
				/>
			</label>
		);
	}
}

export default Check;
