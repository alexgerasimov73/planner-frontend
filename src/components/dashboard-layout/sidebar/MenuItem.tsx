import cn from 'clsx'
import Link from 'next/link'

import styles from './MenuItem.module.scss'
import type { IMenuItem } from './menu.interface'

interface IMenuItemProps {
	readonly item: IMenuItem
	readonly isActive: boolean
}

export default function MenuItem({ item, isActive }: IMenuItemProps) {
	console.log(item.name, isActive)
	return (
		<Link
			className={cn(styles.item, {
				[styles.active]: isActive
			})}
			href={item.link}
		>
			<item.icon />
			<span>{item.name}</span>
		</Link>
	)
}
