import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';
import Alert from '../components/Alert';

export default function Login() {
	const { signIn, user } = UserAuth();
	const navigate = useNavigate();

	const [alert, setAlert] = useState({
		error: false,
		message: 'Default Message',
	});

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			await setAlert({ ...alert, error: true, message: 'Login Successful' });
			navigate('/dashboard');
		} catch (error) {
			if ((error = 400)) {
				setAlert({ ...alert, error: true, message: 'Invalid Login Credentials' });
			} else {
				setAlert({ ...alert, error: true, message: 'Authentication Error' });
			}
			setEmail('');
			setPassword('');
		}
	};

	useEffect(() => {
		setAlert({ ...alert, error: false });
	}, [alert.error]);

	return user ? (
		<Navigate to='/dashboard' />
	) : (
		<div id='login' className='center'>
			<h1 id='title'>Login</h1>
			<form onSubmit={handleLogin} className='center'>
				<div className='inline'>
					<input
						placeholder='Email'
						className='input'
						type='email'
						id='email'
						autoComplete='email'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className='inline'>
					<input
						placeholder='Password'
						className='input'
						type='password'
						id='password'
						required
						autoComplete='current-password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<p id='signupPrompt'>
					Don't have an account? <Link to='/signup'>Sign Up</Link>
				</p>
				<Button className='standard' text='Login' type='submit' />
			</form>

			<Button id='goBack' text='Go Back' handleAction={() => navigate('/')} />
			<Alert message={alert.message} visible={alert.error} />
		</div>
	);
}
