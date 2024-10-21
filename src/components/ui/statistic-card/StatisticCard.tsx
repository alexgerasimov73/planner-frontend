import Link from 'next/link'
import React from 'react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './StatisticCard.module.scss'

interface Props {
	readonly label: string
	readonly value: string
}

export const StatisticCard = ({ label, value }: Props) => (
	<Link
		className={styles.card}
		href={DASHBOARD_PAGES.TASKS}
	>
		<div className={styles.label}>{label}</div>
		<div className={styles.value}>{value}</div>
	</Link>
)
