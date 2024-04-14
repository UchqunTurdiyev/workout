import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '@/firebase';
import FillLoading from '../shared/fill-loading';

export default function Social() {
	const [isLoad, setIsLoad] = useState(false);
	const router = useRouter();

	const onGoogle = () => {
		setIsLoad(true);
		const googleProvider = new GoogleAuthProvider();
		signInWithPopup(auth, googleProvider)
			.then(() => router.push('/'))
			.finally(() => setIsLoad(false));
	};

	const onGitHup = () => {
		setIsLoad(true);
		const gitHupOnProvider = new GithubAuthProvider();
		signInWithPopup(auth, gitHupOnProvider)
			.then(() => router.push('/'))
			.finally(() => setIsLoad(false));
	};

	return (
		<div>
			{isLoad && <FillLoading />}
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-4'>
				<Button className='flex gap-3 h-12' variant={'secondary'} onClick={onGitHup} disabled={isLoad}>
					<FaGithub className='text-xl' />
					<span>Sign in with GitHup</span>
				</Button>
				<Button className='flex gap-3 h-12' variant={'destructive'} onClick={onGoogle} disabled={isLoad}>
					<FaGoogle className='text-lg' />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</div>
	);
}
