import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';

export default function Login() {
	const { signIn, user } = UserAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			navigate('/dashboard');
		} catch (error) {
			console.error(error);
		}
	};

	return user ? (
		<Navigate to='/dashboard' />
	) : (
		<div id='login' className='center'>
			<h1 id='title'>Login</h1>
			<form onSubmit={handleLogin} className='center'>
				<input
					placeholder='Email'
					className='input'
					type='email'
					id='email'
					autoComplete='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					placeholder='Password'
					className='input'
					type='password'
					id='password'
					autoComplete='current-password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p id='signupPrompt'>
					Don't have an account? <Link to='/signup'>Sign Up</Link>
				</p>
				<Button className='standard' text='Login' type='submit' />
			</form>
		</div>
	);
}
