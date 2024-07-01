import { usePathname } from 'next/navigation'

import { Logo } from '@/components/ui/Logo'

import LogoutButton from './LogoutButton'
import MenuItem from './MenuItem'
import { MENU } from './menu.data'

export default function Sidebar() {
	const pathname = usePathname()
	console.log('Sidebar')
	return (
		<aside className='h-full flex flex-col justify-between bg-primary'>
			<div>
				<Logo />

				<div className='py-5 relative'>
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
