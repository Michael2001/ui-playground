import React, { Component } from 'react';
import './Note.css';

class Note extends Component {
	render() {
		const { className, condition1, condition2, condition3, message } = this.props;
		console.log(typeof message);
		return (
			<div
				className={!condition1 && condition2 && !condition3 ? `instructions, note` : 'offscreen'}
			>
				{message.map((str, index) => (
					<React.Fragment key={index}>
						<p id='uidnote'>{str}</p>
						<br />
					</React.Fragment>
				))}
			</div>
		);
	}
}

export default Note;
