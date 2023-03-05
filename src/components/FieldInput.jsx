import React, { Component } from 'react';
import Note from './Note';
import Check from './Check';
import './FieldInput.css';

class FieldInput extends Component {
	render() {
		const {
			placeholder,
			className,
			autoComplete,
			type,
			fieldRef,
			setFocus,
			setValue,
			validValue,
			focusValue,
			value,
			message,
		} = this.props;

		return (
			<div className='fieldinput'>
				<div className='inline'>
					<input
						placeholder={placeholder}
						className={className}
						autoComplete={autoComplete}
						type={type}
						ref={fieldRef ? fieldRef : null}
						required
						onFocus={() => {
							setFocus(true);
						}}
						onBlur={() => {
							setFocus(false);
						}}
						onChange={(e) => {
							{
								setValue(e.target.value);
							}
						}}
					/>
					<Check
						className='check'
						condition1={validValue}
						condition2={focusValue}
						condition3={value}
					/>
				</div>
				<Note
					className='note'
					condition1={focusValue}
					condition2={value}
					condition3={validValue}
					message={message}
				/>
			</div>
		);
	}
}

export default FieldInput;
