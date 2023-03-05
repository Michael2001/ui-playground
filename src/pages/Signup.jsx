import React, { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';
import FieldInput from '../components/FieldInput';

const NAME_REGEX = /^[A-Za-z0-9\s]{2,}$/;
const PWD_REGEX = /^(?=.*[A-Z]).{8}$/;
const EMIAL_REGEX =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default function Signup() {
	const navigate = useNavigate();
	const { createUser, user } = UserAuth();

	const inputRef = useRef(null);

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [focusUsername, setFocusUsername] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [focusEmail, setFocusEmail] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [focusPassword, setFocusPassword] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [validConfirmPassword, setValidConfirmPassword] = useState(false);
	const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		const result = NAME_REGEX.test(username);
		setValidUsername(result);
	}, [username]);

	useEffect(() => {
		const result = EMIAL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		const result = PWD_REGEX.test(password);
		setValidPassword(result);
		let result2 = null;
		confirmPassword == ''
			? (result2 = null)
			: !validPassword
			? (result2 = false)
			: password != confirmPassword
			? (result2 = false)
			: (result2 = true);
		setValidConfirmPassword(result2);
	}, [password, confirmPassword]);

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await createUser(username, email, password);
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return user ? (
		<Navigate to='/dashboard' />
	) : (
		<div id='login' className='center'>
			<h1 id='title'>Sign Up</h1>
			<form className='center form' onSubmit={handleSignup}>
				<FieldInput
					placeholder='Username'
					className='input'
					type='text'
					autoComplete='username'
					fieldRef={inputRef}
					setFocus={setFocusUsername}
					setValue={setUsername}
					validValue={validUsername}
					focusValue={focusUsername}
					value={username}
					message={['Usernames must be at least 2 characters']}
				/>
				<FieldInput
					placeholder='Email'
					className='input'
					type='email'
					autoComplete='email'
					setFocus={setFocusEmail}
					setValue={setEmail}
					validValue={validEmail}
					focusValue={focusEmail}
					value={email}
					message={['Email looks a bit off']}
				/>
				<FieldInput
					placeholder='Password'
					className='input'
					type='password'
					autoComplete='password'
					setFocus={setFocusPassword}
					setValue={setPassword}
					validValue={validPassword}
					focusValue={focusPassword}
					value={password}
					message={['Password needs at least 8 characters', 'Password needs a capital letter']}
				/>
				<FieldInput
					placeholder='Confirm Password'
					className='input'
					type='password'
					autoComplete='current-password'
					setFocus={setFocusConfirmPassword}
					setValue={setConfirmPassword}
					validValue={validConfirmPassword}
					focusValue={focusConfirmPassword}
					value={confirmPassword}
					message={['Passwords do not match']}
				/>
				<p id='loginPrompt'>
					Already have an account? <Link to='/login'>Log in</Link>
				</p>
				<Button className='standard' text='Sign Up' type='submit' />
			</form>
			<Button
				id='goBack'
				text='Go Back'
				handleAction={() => {
					navigate('/');
				}}
			/>
		</div>
	);
}
