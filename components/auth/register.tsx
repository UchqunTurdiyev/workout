import { useAuthState } from '@/store/auth.store';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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
			<Separator className='my-3' />
			<div>
				<span>Email</span>
				<Input placeholder='example@gmail.com' type='email' />
			</div>
			<div className='grid grid-cols-2 gap-2 my-4'>
				<div>
					<span>Password</span>
					<Input placeholder='*****' type='password' />
				</div>
				<div>
					<span>Confirm password</span>
					<Input placeholder='*****' type='password' />
				</div>
			</div>
			<Button className='w-full h-12 mt-2'>Register</Button>
		</div>
	);
}
