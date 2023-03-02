import React, { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';
import Check from '../components/Check';

const NAME_REGEX = /^[A-Za-z0-9\s]{2,}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const EMIAL_REGEX =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default function Signup() {
	const navigate = useNavigate();
	const { createUser, user } = UserAuth();

	const nameRef = useRef();
	const errRef = useRef();

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
		nameRef.current.focus();
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

	// useEffect(() => {
	// 	setErrMsg('');
	// }, [username, email, password, confirmPassword]);

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
			<form className='center' onSubmit={handleSignup}>
				<input
					placeholder='Username'
					className='input'
					autoComplete='username'
					ref={nameRef}
					required
					onFocus={() => setFocusUsername(true)}
					onBlur={() => setFocusUsername(false)}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<Check condition1={validUsername} condition2={focusUsername} condition3={username} />
				<input
					placeholder='Email'
					className='input'
					type='email'
					autoComplete='email'
					required
					onFocus={() => setFocusEmail(true)}
					onBlur={() => setFocusEmail(false)}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<Check condition1={validEmail} condition2={focusEmail} condition3={email} />
				<input
					placeholder='Password'
					className='input'
					type='password'
					autoComplete='current-password'
					required
					onFocus={() => setFocusPassword(true)}
					onBlur={() => setFocusPassword(false)}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<Check condition1={validPassword} condition2={focusPassword} condition3={password} />
				<input
					placeholder='Confirm Password'
					className='input'
					id='password'
					type='password'
					autoComplete='current-password'
					required
					onFocus={() => setFocusConfirmPassword(true)}
					onBlur={() => setFocusConfirmPassword(false)}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
				/>
				<Check
					condition1={validConfirmPassword}
					condition2={focusConfirmPassword}
					condition3={confirmPassword}
				/>
				<p id='loginPrompt'>
					Already have an account? <Link to='/login'>Log in</Link>
				</p>
				<Button className='standard' text='Sign Up' type='submit' />
			</form>
		</div>
	);
}
