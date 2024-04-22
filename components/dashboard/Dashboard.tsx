'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { BadgePlus, icons } from 'lucide-react';
import { Separator } from '../ui/separator';
import TaskItem from '../shared/task-item';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '../form/task-form';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { taskSchema } from '@/lib/validation';
import { z } from 'zod';
import { useUserState } from '@/store/user.store';
import { taskService } from '@/service/task.service';
import { useQuery } from '@tanstack/react-query';
import FillLoading from '../shared/fill-loading';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ITask } from '@/types';
import { toast } from 'sonner';

export default function Dashboard() {
	const [isDelete, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentTask, setCurrentTask] = useState<ITask | null>(null);
	const { user } = useUserState();
	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: taskService.getTasks,
	});

	const onStartEditing = (task: ITask) => {
		setIsEditing(true);
		setCurrentTask(task);
	};

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null;
		const promise = addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user?.uid,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
			.catch(err => {
				console.log(err);
			});

		return promise;
	};

	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null;
		if (!currentTask) return null;
		const ref = doc(db, 'tasks', currentTask.id);

		updateDoc(ref, {
			title,
		})
			.then(() => refetch())
			.finally(() => setIsEditing(false));
	};

	const onDelete = async (id: string) => {
		setIsDeleting(true);
		const promise = deleteDoc(doc(db, 'tasks', id))
			.then(() => refetch())
			.finally(() => setIsDeleting(false));

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully deleted',
			error: 'Something went wrong',
		});
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
						<div className='w-full p-4 rounded-md flex  justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							<div className='w-full'>
								{(isPending || isDelete) && <FillLoading />}
								{error && (
									<Alert variant='destructive' className='w-full'>
										<ExclamationTriangleIcon className='h-4 w-4' />
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>{error.message}</AlertDescription>
									</Alert>
								)}
								{data && (
									<div className='flex flex-col space-y-3 w-full'>
										{!isEditing &&
											data.tasks.map(task => (
												<TaskItem
													key={task.id}
													task={task}
													onStartEditing={() => onStartEditing(task)}
													onDelete={() => onDelete(task.id)}
													refetch={refetch}
												/>
											))}
									</div>
								)}
								{isEditing && (
									<TaskForm
										title={currentTask?.title}
										isEdit
										onClose={() => setIsEditing(false)}
										handler={onUpdate as (values: z.infer<typeof taskSchema>) => Promise<void | null>}
									/>
								)}
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
					<TaskForm handler={onAdd as (values: z.infer<typeof taskSchema>) => Promise<void | null>} />
				</DialogContent>
			</Dialog>
		</>
	);
}
