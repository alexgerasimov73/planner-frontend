import cn from 'clsx'
import Link from 'next/link'

import styles from './MenuItem.module.scss'
import { IMenuItem } from './menu.interface'

export default function MenuItem({
	item,
	isActive
}: {
	item: IMenuItem
	isActive: boolean
}) {
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
