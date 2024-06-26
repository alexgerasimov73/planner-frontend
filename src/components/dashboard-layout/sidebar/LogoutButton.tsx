'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export default function LogoutButton() {
	const router = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<button
			className='flex items-center gap-2.5 mb-10 px-8 opacity-50 hover:opacity-100 transition-opacity duration-300'
			onClick={() => mutate()}
		>
			<LogOut size={20} /> Logout
		</button>
	)
}
