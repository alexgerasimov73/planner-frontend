'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Logo } from '@/components/ui/Logo'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './Auth.module.scss'
import { AuthForm } from './AuthForm'
import { TypeForm } from './hooks/useAuth'

export const Auth = () => {
	const { prefetch } = useRouter()

	useEffect(() => prefetch(DASHBOARD_PAGES.HOME), [prefetch])

	return (
		<div className={styles.container}>
			<Logo
				className={styles.logo}
				isPrimaryColor
			/>

			<div className={styles.login}>
				<h1>Login</h1>
				<p>into your account</p>

				<AuthForm type={TypeForm.login} />
			</div>

			<div className={styles.registration}>
				<h1>Create Account</h1>
				<p>use your email for registration</p>

				<AuthForm type={TypeForm.register} />
			</div>

			{/* <h1>Welcome back</h1>
			<p>or register</p> */}
		</div>
	)
}
