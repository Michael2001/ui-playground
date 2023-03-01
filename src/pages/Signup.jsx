import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';

export default function Signup() {
	const navigate = useNavigate();
	const { createUser, user } = UserAuth();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

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
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<input
					placeholder='Email'
					className='input'
					type='email'
					autoComplete='email'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					placeholder='Password'
					className='input'
					type='password'
					autoComplete='current-password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<input
					placeholder='Confirm Password'
					className='input'
					id='password'
					type='password'
					autoComplete='current-password'
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
				/>
				<p id='loginPrompt'>
					Already have an account? <Link to='/login'>Log in</Link>
				</p>
				<Button className='standard' text='Sign Up' type='submit' />
			</form>
		</div>
	);
}
