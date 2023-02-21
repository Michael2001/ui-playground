import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id='login' className='center'>
      <h1 id='title'>Login</h1>
      <input placeholder='Email' className='input' id='email' onChange={(e) => setEmail(e.target.value)} />
      <input placeholder='Password' className='input' id='password' onChange={(e) => setPassword(e.target.value)} />
      <p id='signupPrompt'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
      <Button className='standard' text='Login' handleAction={() => {}} />
    </div>
  );
}
