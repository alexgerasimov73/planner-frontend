import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'

import type { TTimeBlockFormState } from '@/types/time-block.types'

import { COLORS } from './colors.data'
import { useCreateTimeBlock } from './useCreateTimeBlock'
import { useUpdateTimeBlock } from './useUpdateTimeBlock'

export function TimeBlockingForm() {
	const { control, handleSubmit, register, reset, watch } =
		useFormContext<TTimeBlockFormState>()

	const existedId = watch('id')
	const { isCreatePending, createTimeBlock } = useCreateTimeBlock()
	const { updataTimeBlock } = useUpdateTimeBlock(existedId)

	const onSubmit: SubmitHandler<TTimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updataTimeBlock({ id, data: dto })
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			id: undefined,
			name: '',
			order: 1
		})
	}

	return (
		<form
			className='w-3/5'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Field
				id='name'
				disableAutocomplete
				label='Block title:'
				placeholder='Type the block title here...'
				extra='mb-4'
				{...register('name', { required: true })}
			/>

			<Field
				id='duration'
				disableAutocomplete
				isNumber
				label='Duration (min):'
				placeholder='Type the duration here...'
				extra='mb-4'
				{...register('duration', { required: true, valueAsNumber: true })}
			/>

			<div>
				<span className='inline-block mb-1.5'>Color:</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={COLORS.map(color => ({
								label: color,
								value: color
							}))}
							isColorSelected
							value={value || COLORS[COLORS.length - 1]}
							onChange={onChange}
						/>
					)}
				/>
			</div>

			<Button
				className='mt-6'
				disabled={isCreatePending}
				type='submit'
			>
				{existedId ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
