import React, { useState, useEffect } from 'react';
import Button from './components/button';
import { useNavigate, Form } from 'react-router-dom';

export default function Back() {
  const navigate = useNavigate();
  const [formText, setFormText] = useState('');

  useEffect(() => {
    setFormText(localStorage.getItem('text'));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('text', formText);
  };

  return (
    <div id='parentBack' className='center'>
      <h1>Backendd</h1>
      <div id='editText' className='center'>
        <Form id='backendEditForm'>
          <p>
            <span>Frontend Text</span>
            <input
              placeholder=''
              aria-label='text'
              type='text'
              name='text'
              value={formText}
              onChange={(event) => setFormText(event.target.value)}
            />
            <Button className='standard' id='update' text='Update' type='submit' height='32px' onClick={handleSubmit} />
          </p>
        </Form>
      </div>
      <Button className='standard' text='Go To Frontend' onClick={() => navigate('/')} />
    </div>
  );
}
