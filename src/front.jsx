import React, { useState, useEffect } from 'react';
import Button from './components/button';
import { useNavigate, redirect } from 'react-router-dom';

export default function Front() {
  const navigate = useNavigate();
  const [text, setText] = useState(localStorage.getItem('text') || 'Example Text');

  useEffect(() => {
    localStorage.setItem('text', text);
  }, [text]);

  return (
    <div id='parentFront' className='center'>
      <h1 id='title'>{text}</h1>
      <Button className='standard' text='Go To Backend' onClick={() => navigate('/backend')} />
    </div>
  );
}
