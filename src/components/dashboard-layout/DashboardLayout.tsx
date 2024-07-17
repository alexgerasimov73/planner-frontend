'use client'

import type { PropsWithChildren } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { Loader } from '../ui/Loader'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	const { data, isLoading } = useProfile()

	return (
		<div className='grid 2xl:grid-cols-[1.2fr_6fr] grid-cols-[1.5fr_6fr] min-h-screen'>
			<Sidebar />

			<main className='relative max-h-screen overflow-x-hidden'>
				{isLoading || !data ? (
					<div className='flex-center h-1/2'>
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
