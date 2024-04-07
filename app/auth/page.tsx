'use client';
import Login from '@/components/auth/login';
import Register from '@/components/auth/register';
import { Card } from '@/components/ui/card';
import { useAuthState } from '@/store/auth.store';
import React, { useState } from 'react';

export default function AuthPage() {
	const { auth, setAuth } = useAuthState();
	return (
		<div className='w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center'>
			<Card className='p-8 w-1/3'>
				{auth === 'login' && <Login />}
				{auth === 'register' && <Register />}
			</Card>
		</div>
	);
}
