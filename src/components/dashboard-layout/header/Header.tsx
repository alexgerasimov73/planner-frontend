'use client'

import Link from 'next/link'

import { Loader } from '@/components/ui/Loader'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

export default function Header() {
	const { data, isLoading } = useProfile()

	return (
		<header className='h-23 flex justify-between items-center p-big-layout bg-white shadow-md'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<h1 className='text-3xl font-medium'>{`Hello, ${data?.user.name}!`}</h1>
					<Link
						className='text-sm opacity-40'
						href={DASHBOARD_PAGES.SETTINGS}
					>
						{data?.user.email}
					</Link>
				</>
			)}
		</header>
	)
}
