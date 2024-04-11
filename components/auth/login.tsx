import { useAuthState } from '@/store/auth.store';
import React from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/lib/validation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function Login() {
	const { setAuth } = useAuthState();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values;
	};

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
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email adress</FormLabel>
								<FormControl>
									<Input placeholder='example@gmail.com' {...field} />
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
									<Input placeholder='*****' type='password' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit' className='mt-2'>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
