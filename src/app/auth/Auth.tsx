'use client'

import cn from 'clsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/buttons/Button'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import styles from './Auth.module.scss'
import { AuthForm } from './AuthForm'
import { TypeForm } from './hooks/useAuth'

export const Auth = () => {
	const { prefetch } = useRouter()
	const [isRegister, setIsRegister] = useState(false)

	useEffect(() => prefetch(DASHBOARD_PAGES.HOME), [prefetch])

	const toggleAuth = () => setIsRegister(isRegister => !isRegister)

	return (
		<div
			className={cn(styles.container, {
				[styles.registerActive]: isRegister
			})}
		>
			<Logo
				className={styles.logo}
				isPrimaryColor={!isRegister}
			/>

			<div className={styles.login}>
				<h1 className='text-5xl'>Login</h1>
				<p>use your account</p>

				<AuthForm type={TypeForm.login} />
			</div>

			<div className={styles.registration}>
				<h1 className='text-5xl'>Create Account</h1>
				<p>use your email for registration</p>

				<AuthForm type={TypeForm.register} />
			</div>

			<div className={styles.overlayWrapper}>
				<div className={styles.overlay}>
					<div className={styles.overlayLogin}>
						<h1 className='text-5xl'>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your personal info
						</p>
						<Button
							className={styles.overlayButton}
							onClick={toggleAuth}
						>
							<ArrowLeft />
							To login
						</Button>
					</div>

					<div className={styles.overlayRegistration}>
						<h1 className='text-5xl'>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<Button
							className={styles.overlayButton}
							onClick={toggleAuth}
						>
							To registration
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
