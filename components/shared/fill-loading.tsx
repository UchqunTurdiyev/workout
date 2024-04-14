import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Loader2 } from 'lucide-react';

export default function FillLoading() {
	return (
		<Skeleton className='w-full h-full absolute inset-0 flex items-center justify-center opacity-20 z-50'>
			<Loader2 className='animate-spin size-14' />
		</Skeleton>
	);
}
