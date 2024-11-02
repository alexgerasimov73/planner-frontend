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
import { useLaunchServer } from './hooks/useLaunchServer'

export const Auth = () => {
	const { prefetch } = useRouter()
	const {} = useLaunchServer()
	const [isRegister, setIsRegister] = useState(false)
	const [isPending, setIsPending] = useState(false)

	useEffect(() => prefetch(DASHBOARD_PAGES.HOME), [prefetch])

	const toggleAuth = () => setIsRegister(isRegister => !isRegister)

	return (
		<div
			className={cn(styles.container, {
				[styles.registerActive]: isRegister
			})}
		>
			<Logo className={styles.logo} />

			<div className={styles.login}>
				<h1 className={styles.heading}>Login</h1>
				<p className={styles.description}>use your account</p>

				<AuthForm
					isPending={isPending}
					type={TypeForm.login}
					setIsPending={setIsPending}
				/>
			</div>

			<div className={styles.registration}>
				<h1 className={styles.heading}>Create Account</h1>
				<p className={styles.description}>use your email for registration</p>

				<AuthForm
					isPending={isPending}
					type={TypeForm.register}
					setIsPending={setIsPending}
				/>
			</div>

			<div className={styles.overlayWrapper}>
				<div className={styles.overlay}>
					<div className={styles.overlayLogin}>
						<h1 className={styles.heading}>Welcome Back!</h1>
						<p className={styles.description}>
							to keep connected, please log in with your information
						</p>
						<Button
							className={styles.overlayButton}
							secondary
							onClick={toggleAuth}
						>
							<ArrowLeft />
							To login
						</Button>
					</div>

					<div className={styles.overlayRegistration}>
						<h1 className={styles.heading}>Hello, Friend!</h1>
						<p className={styles.description}>
							enter your personal details and start journey with us
						</p>
						<Button
							className={styles.overlayButton}
							secondary
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
