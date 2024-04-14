import { useAuthState } from '@/store/auth.store';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema, registerSchema } from '@/lib/validation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import FillLoading from '../shared/fill-loading';

export default function Register() {
	const [isLoad, setIsLoad] = useState(false);
	const [error, setError] = useState('');
	const { setAuth } = useAuthState();
	const router = useRouter();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, password, confirmPassword } = values;
		setIsLoad(true);
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password);
			router.push('/');
			// return response
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

			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground'>
				Already have an accoung{' '}
				<span className='text-blue-500 cursor-pointer hover:underline' onClick={() => setAuth('login')}>
					Sign in
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
					<div className='grid grid-cols-2 gap-2'>
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
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input placeholder='*****' type='password' disabled={isLoad} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' className='mt-2' disabled={isLoad}>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
