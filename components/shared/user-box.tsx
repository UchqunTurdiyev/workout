'use client';
import { useUserState } from '@/store/user.store';
import { Loader2, LogOut } from 'lucide-react';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { CgGym } from 'react-icons/cg';
import Link from 'next/link';

export default function UserBox() {
	const { user, setUser } = useUserState();
	const router = useRouter();

	if (!user) return <Loader2 className='animate-spin' />;

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null);
			router.push('/auth');
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback className='uppercase'>{user.email![0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-80' align='start' alignOffset={11} forceMount>
				<div className='flex flex-col space-y-2 p-2'>
					<p className='font-medium text-xl leading-none text-muted-foreground'>{user.email}</p>

					<div className='flex items-center gap-3'>
						<div className='rounded-md bg-secondary p-1 '>
							<Avatar>
								<AvatarImage src={user.photoURL!} />
								<AvatarFallback className='uppercase'>{user.email![0]}</AvatarFallback>
							</Avatar>
						</div>
						<div className='space-y-1'>
							<p className='line-clap-1 text-sm'>{user.displayName ?? user.email}</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={'/dashboard'}>
						<DropdownMenuItem className='cursor-pointer'>
							<CgGym className='w-4 h-4 mr-2' /> <span>Gym</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem className='cursor-pointer bg-destructive' onClick={onLogout}>
						<LogOut className='w-4 h-4 mr-2' /> <span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
