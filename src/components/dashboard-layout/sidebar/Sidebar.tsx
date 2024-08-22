import { usePathname } from 'next/navigation'
import { memo } from 'react'

import { Logo } from '@/components/ui/Logo'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export const Sidebar = memo(() => {
	const pathname = usePathname()

	return (
		<aside className='flex flex-col justify-between h-full bg-primary rounded-l-lg rounded-br-lg'>
			<div>
				<Logo />

				<div className='relative py-5'>
					{MENU.map(item => (
						<MenuItem
							key={item.link}
							item={item}
							isActive={pathname === item.link}
						/>
					))}
				</div>
			</div>

			<LogoutButton />
		</aside>
	)
})
