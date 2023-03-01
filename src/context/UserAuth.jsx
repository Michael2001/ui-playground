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
		const u = await setUser(createUserWithEmailAndPassword(auth, email, password));
		return u;
	};

	const signIn = async (email, password) => {
		setPersistence(auth, browserSessionPersistence);
		const u = await setUser(signInWithEmailAndPassword(auth, email, password));
		return u;
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
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
