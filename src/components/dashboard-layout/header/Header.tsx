import Link from 'next/link'

import { IUser } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export default function Header({ userData }: { userData: IUser }) {
	const userName = userData.name ?? 'Anonymous'

	return (
		<header className='h-23 flex justify-between items-center p-big-layout bg-white shadow-md'>
			<h1 className='text-3xl font-medium'>{`Hello, ${userName}!`}</h1>
			<Link
				className='flex items-center gap-3'
				href={DASHBOARD_PAGES.SETTINGS}
			>
				<span className='text-sm opacity-40'>{userData.email}</span>
				<img
					className='rounded-full border border-primary'
					src={`https://robohash.org/${userName}.png?size=60x60`}
					width={60}
				/>
			</Link>
		</header>
	)
}
