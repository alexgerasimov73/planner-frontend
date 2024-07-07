import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export default function LogoutButton() {
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => push(DASHBOARD_PAGES.AUTH)
	})

	return (
		<button
			className='flex items-center gap-2.5 mb-10 ml-8 text-white opacity-70 hover:opacity-100 transition-opacity duration-300'
			onClick={() => mutate()}
		>
			<LogOut size={20} /> Logout
		</button>
	)
}
