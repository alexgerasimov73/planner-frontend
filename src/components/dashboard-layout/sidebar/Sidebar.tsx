import { usePathname } from 'next/navigation'

import { Logo } from '@/components/ui/Logo'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export const Sidebar = () => {
	const pathname = usePathname()
	console.log('Sidebar')

	return (
		<aside className='flex flex-col justify-between h-full bg-primary'>
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
}
