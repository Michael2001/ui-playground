import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './Check.css';

export default function Check(props) {
	console.log(props.condition1);
	console.log(props.condition2);
	console.log(props.condition3);
	return (
		<label htmlFor={props.condition3}>
			<FontAwesomeIcon
				icon={faCircleCheck}
				className={props.condition1 && !props.condition2 ? 'valid' : 'hide'}
			/>
			<FontAwesomeIcon
				icon={faCircleXmark}
				className={!props.condition1 && !props.condition2 && props.condition3 ? 'valid' : 'hide'}
			/>
		</label>
	);
}
