import { useAuthState } from '@/store/auth.store';
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/lib/validation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import FillLoading from '../shared/fill-loading';
import { useUserState } from '@/store/user.store';

export default function Login() {
	const [isLoad, setIsLoad] = useState(false);
	const [error, setError] = useState('');
	const { setAuth } = useAuthState();
	const { setUser } = useUserState();
	const router = useRouter();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values;
		setIsLoad(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			setUser(response.user);
			router.push('/');
		} catch (error) {
			const result = error as Error;
			setError(result.message);
		} finally {
			setIsLoad(false);
		}
	};

	return (
		<div className='flex flex-col'>
			{isLoad && <FillLoading />}
			<h2 className='text-xl font-bold'>Login</h2>
			<p className='text-muted-foreground'>
				{"Don't"} have an account?{' '}
				<span className='text-blue-500 cursor-pointer hover:underline' onClick={() => setAuth('register')}>
					Sign up
				</span>
			</p>
			<Separator className='my-3' />
			{error && (
				<Alert variant='destructive'>
					<ExclamationTriangleIcon className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Your session has expired. Please log in again.</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email adress</FormLabel>
								<FormControl>
									<Input placeholder='example@gmail.com' disabled={isLoad} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder='*****' type='password' disabled={isLoad} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit' className='mt-2' disabled={isLoad}>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
