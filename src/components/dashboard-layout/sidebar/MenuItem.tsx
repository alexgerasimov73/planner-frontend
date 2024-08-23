import cn from 'clsx'
import Link from 'next/link'
import { memo } from 'react'

import styles from './MenuItem.module.scss'
import type { IMenuItem } from './menu.interface'

interface IMenuItemProps {
	readonly item: IMenuItem
	readonly isActive: boolean
}

export const MenuItem = memo(({ item, isActive }: IMenuItemProps) => (
	<Link
		className={cn(styles.item, {
			[styles.active]: isActive
		})}
		href={item.link}
	>
		<item.icon className='w-6' />
		<span>{item.name}</span>
	</Link>
))
