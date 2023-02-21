import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = () => {
    console.log('TEST');
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <div id='login' className='center'>
      <h1 id='title'>Sign Up</h1>
      <input
        placeholder='Username'
        className='input'
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        placeholder='Email'
        className='input'
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder='Password'
        className='input'
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        placeholder='Confirm Password'
        className='input'
        id='password'
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <p id='loginPrompt'>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
      <Button className='standard' text='Sign Up' handleAction={handleClick} />
    </div>
  );
}
