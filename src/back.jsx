import React, { useState, useEffect } from 'react';
import Button from './components/button';
import Alert from './components/alert';
import { useNavigate, Form } from 'react-router-dom';
import { getData } from './front';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from './services/firebase';

export default function Back() {
  const initalVals = {
    visible: false,
    message: '',
  };

  const navigate = useNavigate();
  const [formText, setFormText] = useState(localStorage.getItem('text') || '');
  const [alert, setAlert] = useState(initalVals);

  useEffect(() => {
    async function getTitle() {
      const d = await getData();
      setFormText(d);
    }

    if (localStorage.getItem('text') === null) {
      getTitle();
    } else {
      setFormText(localStorage.getItem('text'));
    }
  }, []);

  useEffect(() => {
    console.log(alert.visible);
    if (alert.visible) {
      console.log('Test');
      setTimeout(() => {
        setAlert({ visible: false });
      }, 2000);
    }
  }, [alert]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('text', formText);

    async function updateTitle() {
      try {
        const batch = writeBatch(db);
        const titleRef = doc(db, 'content', 'home');
        batch.update(titleRef, { title: `${formText}` });
        await batch.commit();
        setAlert({ visible: true, message: 'Update Succssful' });
      } catch (err) {
        console.error('Error updating document: ', error);
        setAlert({ visible: true, message: 'Update Failed' });
      }
    }
    updateTitle();
  };

  return (
    <div id='parentBack' className='center'>
      <h1>Backend</h1>
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

      <Alert text='Update Sucessful' visible={alert.visible} message={alert.message} className='alert' />
    </div>
  );
}
