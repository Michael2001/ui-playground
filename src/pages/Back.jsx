import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate, Form } from 'react-router-dom';
import { getData } from './Front';
import { writeBatch, doc, terminate } from 'firebase/firestore';
import { db } from '../services/firebase';
import { UserAuth } from '../context/UserAuth';
import '../assets/index.css';

export default function Back() {
	const { logout, user } = UserAuth();
	const navigate = useNavigate();
	const [alert, setAlert] = useState({});
	const [formText, setFormText] = useState(localStorage.getItem('text') || '');

	const handleLogout = async () => {
		try {
			await logout();
			console.log('Logged Out Successfully');
		} catch (error) {
			console.log(error.message);
		}
	};
	terminate;

	//Load data from databasae
	useEffect(() => {
		async function getTitle() {
			const d = await getData();
			setFormText(d);
		}

		//Check if the data is already stored locally
		if (localStorage.getItem('text') === null) {
			getTitle();
		} else {
			setFormText(localStorage.getItem('text'));
		}
	}, []);

	//Updating the db based upon text field value
	const handleSubmit = (event) => {
		event.preventDefault();
		localStorage.setItem('text', formText);

		async function updateTitle() {
			try {
				const batch = writeBatch(db);
				const titleRef = doc(db, 'content', 'home');
				batch.update(titleRef, { title: `${formText}` });
				await batch.commit();
				setAlert('Update Succssful');
			} catch (error) {
				console.log('Error updating document: ', error);
				setAlert('Update Failed');
			}
		}
		updateTitle();
	};

	return (
		<div id='parentBack' className='center'>
			<h1>Backend</h1>
			<div className='center'>
				<div id='editText'>
					<Form id='backendEditForm'>
						<p>
							<span>Frontend Text</span>
							<input
								className='input'
								placeholder=''
								aria-label='text'
								type='text'
								name='text'
								value={formText}
								onChange={(event) => setFormText(event.target.value)}
							/>
							<Button
								className='standard'
								id='update'
								text='Update'
								type='submit'
								height='32px'
								handleAction={handleSubmit}
							/>
						</p>
					</Form>
				</div>
				<div id='editImage'></div>
			</div>
			<Button text='Go To Frontend' handleAction={() => navigate('/')} />
			<Button id='logout' text='Logout' handleAction={handleLogout} />

			<Alert message={alert} />
		</div>
	);
}
