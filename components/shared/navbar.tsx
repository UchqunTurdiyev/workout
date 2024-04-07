import { navLinks } from '@/contants';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
	return (
		<div className='w-full h-[10vh] border-b fixed inset-0 z-50 bg-background'>
			<div className='max-w-6xl container mx-auto h-full flex justify-between items-center'>
				<div className='text-2xl font-bold uppercase'>workout</div>
				<div className='flex items-center gap-3'>
					{navLinks.map(nav => (
						<Link href={nav.path} key={nav.path} className='font-medium hover:underline'>
							{nav.label}
						</Link>
					))}
					<ModeToggle />
					<Link href={'/auth'}>
						<Button variant={'secondary'}>Join Free</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
