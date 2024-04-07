import { useAuthState } from '@/store/auth.store';
import React from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Login() {
	const { setAuth } = useAuthState();
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Login</h2>
			<p className='text-muted-foreground'>
				{"Don't"} have an account?{' '}
				<span className='text-blue-500 cursor-pointer hover:underline' onClick={() => setAuth('register')}>
					Sign up
				</span>
			</p>
			<Separator className='my-3' />
			<div>
				<span>Email</span>
				<Input placeholder='example@gmail.com' type='email' />
			</div>
			<div className='mt-2'>
				<span>Password</span>
				<Input placeholder='*****' type='password' />
			</div>
			<Button className='w-full h-12 mt-4'>Login</Button>
		</div>
	);
}
