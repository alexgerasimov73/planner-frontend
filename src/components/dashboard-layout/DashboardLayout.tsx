import { PropsWithChildren } from 'react'

import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.2fr_6fr] grid-cols-[1.5fr_6fr]'>
			<Sidebar />

			<main className='overflow-x-hidden max-h-screen relative'>
				<Header />
				<section className='p-big-layout'>{children}</section>
			</main>
		</div>
	)
}
