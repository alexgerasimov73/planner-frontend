import Image from 'next/image'
import Link from 'next/link'

import { PIcon } from '@/assets/icons'

import LogoutButton from './LogoutButton'
import MenuItem from './MenuItem'
import { MENU } from './menu.data'

export default function Sidebar() {
	return (
		<aside className='h-full flex flex-col justify-between bg-sidebar'>
			<div>
				<Link
					className='relative flex items-baseline p-layout'
					href='/'
				>
					<Image
						className='w-9'
						src={PIcon}
						alt='P'
					/>
					<span className='absolute top-7 left-16 text-2xl font-bold tracking-widest'>
						lanner
					</span>
				</Link>

				<div className='p-3 relative'>
					{MENU.map(item => (
						<MenuItem
							key={item.link}
							item={item}
						/>
					))}
				</div>
			</div>
			<LogoutButton />
		</aside>
	)
}
