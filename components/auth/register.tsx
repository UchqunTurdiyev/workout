import { useAuthState } from '@/store/auth.store';
import React from 'react';

export default function Register() {
	const { setAuth } = useAuthState();
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground'>
				Already have an accoung{' '}
				<span className='text-blue-500 cursor-pointer hover:underline' onClick={() => setAuth('login')}>
					Sign in
				</span>
			</p>
		</div>
	);
}
