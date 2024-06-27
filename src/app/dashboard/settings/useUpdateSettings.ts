import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUpdateSettings() {
	const queryClient = useQueryClient()
	const { isPending, mutate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TUserForm) => userService.update(data),
		onSuccess: () => {
			toast.success('Settings was successfully updated!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { isPending, mutate }
}