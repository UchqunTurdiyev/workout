import React from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

export default function Social() {
	return (
		<div>
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-4'>
				<Button className='flex gap-3 h-12' variant={'secondary'}>
					<FaGithub className='text-xl' />
					<span>Sign in with GitHup</span>
				</Button>
				<Button className='flex gap-3 h-12' variant={'destructive'}>
					<FaGoogle className='text-lg' />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</div>
	);
}
