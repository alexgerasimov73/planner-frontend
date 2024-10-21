import Link from 'next/link'

import type { IUser } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

interface Props {
	readonly userData: IUser
}

export const Header = ({ userData }: Props) => {
	const userName = userData.name || 'Anonymous'

	return (
		<header className='sticky top-0 flex justify-between items-center h-23 p-big-layout shadow-md bg-white rounded-r-xl border-y-2 border-r-2 z-10'>
			<h1 className='text-3xl font-medium'>{`Hello, ${userName}!`}</h1>

			<Link
				className='flex items-center gap-3'
				href={DASHBOARD_PAGES.SETTINGS}
			>
				<span className='opacity-40 text-sm'>{userData.email}</span>

				<img
					className='rounded-md border border-green shadow-[2px_3px_0px_#1A202C]'
					src={`https://robohash.org/${userName}.png?size=60x60`}
					width={60}
					height={60}
				/>
			</Link>
		</header>
	)
}
