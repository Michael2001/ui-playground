import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const MODE = {
	default: css`
		border-style: none;
		color: #ffffff;
		background-color: #0063c5;

		&:hover {
			background-color: #0054a7;
		}
	`,
	defaultSecondary: css`
		color: rgba(0, 99, 197, 1);
		border: 2px solid rgba(0, 99, 197, 1);
		background-color: #ffffff;

		&:hover {
			color: rgba(0, 84, 167, 1);
			background-color: rgba(0, 99, 197, 0.08);
		}
	`,
};

const DISABLED = css`
	cursor: not-allowed;
	opacity: 0.38;
`;

const SIZE = {
	xsmall: css`
		min-width: 84px;
		height: 32px;

		#text p {
			font-weight: 600;
			font-size: 14px;
			line-height: 150%;
			font-style: normal;
		}
	`,
	small: css`
		width: 92px;
		height: 36px;
	`,
	medium: css`
		width: 105px;
		height: 40px;
	`,
};

class Button extends Component {
	render() {
		const { text, disabled, size, mode, iconLeft, iconRight, id, handleAction } = this.props;

		const StyledButton = styled.button`
			cursor: pointer;
			border-radius: 6px;
			transition: background-color 0.25s ease;
			${disabled ? DISABLED : ''};
			${MODE[mode]};
			${SIZE[size]};

			#text p {
				font-family: 'Roboto';
			}

			#icon-left {
				margin-right: 10px;
			}

			#icon-right {
				margin-left: 10px;
			}

			#button {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		`;

		return (
			<StyledButton size={size} mode={mode} disabled={disabled} id={id} onClick={handleAction}>
				<div id='button'>
					<div id='icon-left'>
						<img src={iconLeft} />
					</div>

					<div id='text'>
						<p>{text}</p>
					</div>

					<div id='icon-right'>
						<img src={iconRight} />
					</div>
				</div>
			</StyledButton>
		);
	}
}

Button.defaultProps = {
	text: 'Button',
	disabled: false,
	size: 'medium',
	mode: 'default',
	iconLeft: '',
	iconRight: '',
	id: '',
	handleAction: () => {},
};

export default Button;
