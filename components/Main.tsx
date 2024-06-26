'use client';
import React from 'react';
import { Button } from './ui/button';
import { featuredItems, programs } from '@/contants';
import men from '@/assets/men.png';
import Image from 'next/image';
import { Card } from './ui/card';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useUserState } from '@/store/user.store';
import Link from 'next/link';
import { CgGym } from 'react-icons/cg';
import { LogOut } from 'lucide-react';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function Main() {
	const { user, setUser } = useUserState();
	const router = useRouter();

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null);
			router.push('/auth');
		});
	};
	return (
		<>
			<div className='w-full h-screen flex items-center gap-5'>
				<div className='max-w-xl ml-60 flex h-full flex-col justify-center'>
					<h1 className='text-9xl font-semibold uppercase'>Workout with me</h1>
					<p className='text-muted-foreground'>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nam quos corrupti magni eius eum!
					</p>
					{user ? (
						<div className='flex gap-4'>
							<Link href={'/dashboard'}>
								<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
									<span>Go to GYM</span>
									<CgGym className='w-5 h-5 ml-2' />
								</Button>
							</Link>
							<Button onClick={onLogout} className='w-fit mt-6 font-bold h-12' variant={'destructive'} size={'lg'}>
								<span>Logout</span>
								<LogOut className='w-5 h-5 ml-2' />
							</Button>
						</div>
					) : (
						<Button className='w-fit mt-6 h-12 font-bold' size={'lg'}>
							Join clup now
						</Button>
					)}

					<div className='mt-24'>
						<p className='text-muted-poleground'>AS FEATURED IN</p>
						<div className='flex items-center gap-4 mt-2'>
							{featuredItems.map((Icon, idx) => (
								<Icon key={idx} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>

				<Image width={330} height={200} src={men} alt='' />
			</div>
			<div className='container max-w-5xl mx-auto'>
				<h1 className='text-2xl font-bold'>Workout with me</h1>
				<p className='text-muted-foreground'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nam quos corrupti magni eius eum!
				</p>
				<div className='grid grid-cols-3 gap-4 my-8'>
					{programs.map(item => (
						<Card key={item.title} className='p-8 relative cursor-pointer group'>
							<h3>{item.title}</h3>
							<p className='text-sm text-muted-foreground mt-2'>{item.descr}</p>
							<Button
								size={'icon'}
								variant={'ghost'}
								className='absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform'
							>
								<FaArrowRightLong />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	);
}
