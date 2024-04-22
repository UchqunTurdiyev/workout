'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { BadgePlus, icons } from 'lucide-react';
import { Separator } from '../ui/separator';
import TaskItem from '../shared/task-item';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '../form/task-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import { taskSchema } from '@/lib/validation';
import { z } from 'zod';
import { useUserState } from '@/store/user.store';

export default function Dashboard() {
	const [open, setOpen] = useState(false);
	const { user } = useUserState();
	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null;
		return addDoc(collection(db, 'task'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user?.uid,
		}).then(() => setOpen(false));
	};
	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center'>
				<div className='grid grid-cols-2 w-full gap-8 items-center'>
					<div className='flex flex-col space-y-3'>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<div className='text-2xl font-bold'>Trainings</div>
							<Button size={'icon'} onClick={() => setOpen(true)}>
								<BadgePlus />
							</Button>
						</div>
						<Separator />
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							<div className='flex flex-col space-y-3 w-full'>
								{Array.from({ length: 3 }).map((_, idx) => (
									<TaskItem key={idx} />
								))}
							</div>
						</div>
					</div>

					<div className='flex flex-col space-y-3 relative w-full'>
						<div className='p-4 rounded-md bg-gradient-to-tr from-blue-900 to-background relative h-24'>
							<div className='text-xl font-semibold'>Total week</div>
							<div className='text-3xl font-semibold'>02:08:47</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-tr from-secondary to-background relative h-24'>
							<div className='text-xl font-semibold'>Total week</div>
							<div className='text-3xl font-semibold'>02:08:47</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-tr from-destructive to-background relative h-24'>
							<div className='text-xl font-semibold'>Total week</div>
							<div className='text-3xl font-semibold'>02:08:47</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new task</DialogTitle>
					</DialogHeader>
					<Separator />
					<TaskForm handler={onAdd} />
				</DialogContent>
			</Dialog>
		</>
	);
}