'use client';
import { taskSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { addDoc, collection } from 'firebase/firestore';
import { useUserState } from '@/store/user.store';
import { db } from '@/firebase';
import { toast } from 'sonner';
import FillLoading from '../shared/fill-loading';

interface Props {
	title?: string;
	isEdit?: boolean;
	onClose?: () => void;
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>;
}

export default function TaskForm({ title = '', handler, isEdit, onClose }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUserState();
	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: { title },
	});

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		if (!user) return null;
		setIsLoading(true);
		const promise = handler(values).finally(() => setIsLoading(false));

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully',
			error: 'Something went wrong!',
		});
	};
	return (
		<>
			{isLoading && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email adress</FormLabel>
								<FormControl>
									<Input className='w-full' placeholder='Enter a task' {...field} disabled={isLoading} />
								</FormControl>
							</FormItem>
						)}
					/>
					<div className='flex justify-end gap-2'>
						{isEdit && (
							<Button type='button' variant={'destructive'} disabled={isLoading} onClick={onClose}>
								Cansel
							</Button>
						)}
						<Button type='submit' disabled={isLoading}>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
