'use client';
import { auth } from '@/firebase';
import { useUserState } from '@/store/user.store';
import React, { ReactNode, useEffect, useState } from 'react';
import FillLoading from '../shared/fill-loading';

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [isLoad, setIsLoad] = useState(true);
	const { setUser } = useUserState();
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user);
			setIsLoad(false);
		});
		//eslint-disable-next-line
	}, []);

	return isLoad ? <FillLoading /> : <>{children}</>;
}
