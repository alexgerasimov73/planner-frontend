import { Logo } from '@/components/ui/Logo'

import LogoutButton from './LogoutButton'
import MenuItem from './MenuItem'
import { MENU } from './menu.data'

export default function Sidebar() {
	return (
		<aside className='h-full flex flex-col justify-between bg-primary'>
			<div>
				<Logo />

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
