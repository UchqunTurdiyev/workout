import React from 'react';
import { Card } from '../ui/card';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { HiStatusOnline } from 'react-icons/hi';
import { Button } from '../ui/button';
import { CirclePlay, Edit2, Trash } from 'lucide-react';
import { ITask } from '@/types';

interface Props {
	task: ITask;
}

export default function TaskItem({ task }: Props) {
	return (
		<Card className='w-full grid p-4 shadow-md grid-cols-4 items-center relative'>
			<div className='flex gap-1 col-span-2 items-center'>
				<MdOutlineTaskAlt className='text-blue-500' />
				<span className='capitalize'>{task.title}</span>
			</div>
			<div className='flex gap-1  items-center'>
				<HiStatusOnline />
				<span>{task.status}</span>
			</div>
			<div className='flex gap-1  items-center justify-self-end'>
				<Button variant={'ghost'} size={'icon'} className='w-8 h-8'>
					<CirclePlay className='w-5 h-5 text-indigo-500' />
				</Button>
				<Button variant={'secondary'} size={'icon'} className='w-8 h-8'>
					<Edit2 className='w-5 h-5 ' />
				</Button>
				<Button variant={'destructive'} size={'icon'} className='w-8 h-8'>
					<Trash className='w-5 h-5 ' />
				</Button>
			</div>
		</Card>
	);
}
