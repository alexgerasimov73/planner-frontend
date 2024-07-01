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
						className='flex items-center gap-3'
						href={DASHBOARD_PAGES.SETTINGS}
					>
						<span className='text-sm opacity-40'>{data?.user.email}</span>
						<img
							className='rounded-full border border-primary'
							src={`https://robohash.org/${data?.user.name}.png?size=60x60`}
							width={60}
						/>
					</Link>
				</>
			)}
		</header>
	)
}
