import { useEffect } from 'react'
import type { UseFormReset } from 'react-hook-form'

import type { TUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

export const useFetchInitData = (reset: UseFormReset<TUserForm>) => {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (!isSuccess || !data) return

		reset({
			breakInterval: data.user.breakInterval,
			email: data.user.email,
			intervalsCount: data.user.intervalsCount,
			name: data.user.name,
			workInterval: data.user.workInterval
		})
	}, [data, isSuccess, reset])
}
