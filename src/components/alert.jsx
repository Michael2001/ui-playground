import { useState, useEffect } from 'react';
import './Alert.css';

function Alert({ visible, message }) {
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (visible) {
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 2000);
		}
	}, [visible]);

	return showAlert && <div className='alert'>{showAlert && <p>{message}</p>}</div>;
}

export default Alert;
