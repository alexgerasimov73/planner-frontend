'use client'

import type { PropsWithChildren } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { Loader } from '../ui/Loader'

import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

export default function DashboardLayout({ children }: PropsWithChildren) {
	const { data, isLoading } = useProfile()

	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.2fr_6fr] grid-cols-[1.5fr_6fr]'>
			<Sidebar />

			<main className='overflow-x-hidden max-h-screen relative'>
				{isLoading || !data ? (
					<div className='flex justify-center items-center h-1/2'>
						<Loader />
					</div>
				) : (
					<>
						<Header userData={data.user} />
						<section className='p-big-layout'>{children}</section>
					</>
				)}
			</main>
		</div>
	)
}
