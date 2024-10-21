import { ArrowLeftCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

import { Logo } from '@/components/ui/Logo'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import styles from './MenuItem.module.scss'
import { MENU } from './menu.data'

export const Sidebar = memo(() => {
	const pathname = usePathname()

	return (
		<aside className='relative flex flex-col justify-between h-full bg-green rounded-l-xl rounded-br-xl border-y-2 border-l-2'>
			<input
				id='sidebar-toggle'
				className={styles.sidebarToggler}
				type='checkbox'
			/>

			<div>
				<Logo className={styles.logo} />

				<div className='relative py-5 overflow-hidden'>
					{MENU.map(item => (
						<MenuItem
							key={item.link}
							item={item}
							isActive={pathname === item.link}
						/>
					))}
					<div className={styles.itemHighlighted}></div>
				</div>
			</div>

			<label
				className={styles.sidebarLabel}
				htmlFor='sidebar-toggle'
			>
				<ArrowLeftCircle size={32} />
			</label>

			<LogoutButton />
		</aside>
	)
})
