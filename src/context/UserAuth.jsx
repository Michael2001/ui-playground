import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	setPersistence,
	browserSessionPersistence,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const createUser = async (username, email, password) => {
		return await createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = async (email, password) => {
		setPersistence(auth, browserSessionPersistence);
		return await signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={{ createUser, user, logout, signIn }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
