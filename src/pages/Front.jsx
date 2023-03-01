import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { getDoc, doc } from 'firebase/firestore';

export default function Front() {
	const navigate = useNavigate();
	const [title, setTitle] = useState(localStorage.getItem('text') || '');

	useEffect(() => {
		async function getTitle() {
			const d = await getData();
			setTitle(d);
			localStorage.setItem('text', d);
		}
		getTitle();
	}, []);

	return (
		<div id='parentFront' className='center'>
			<h1 id='title'>{title}</h1>
			<Button className='standard' text='Go To Backend' handleAction={() => navigate('/login')} />
		</div>
	);
}

export async function getData() {
	const docRef = doc(db, 'content', 'home');
	const docSnap = await getDoc(docRef);
	return docSnap.data().title;
}
