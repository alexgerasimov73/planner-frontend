'use client'

import { FormProvider, useForm } from 'react-hook-form'

import type { TTimeBlockFormState } from '@/types/time-block.types'

import { TimeBlockingForm } from './TimeBlockingForm'
import { TimeBlockingList } from './TimeBlockingList'

export const TimeBlocking = () => {
	const methods = useForm<TTimeBlockFormState>()

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}
