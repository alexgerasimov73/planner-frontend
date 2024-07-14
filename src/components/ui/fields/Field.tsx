import { type KeyboardEvent, forwardRef } from 'react'

interface InputFieldProps {
	readonly id: string
	readonly classNames?: string
	readonly disableAutocomplete?: boolean
	readonly disabled?: boolean
	readonly isNumber?: boolean
	readonly label: string
	readonly placeholder: string
	readonly state?: 'error' | 'success'
	readonly type?: string
	readonly variant?: string
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			id,
			classNames,
			disableAutocomplete,
			disabled,
			isNumber,
			label,
			placeholder,
			state,
			type,
			variant,
			...rest
		},
		ref
	) => {
		const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
			if (
				isNumber &&
				!/[0-9]/.test(event.key) &&
				event.key !== 'Backspace' &&
				event.key !== 'Tab' &&
				event.key !== 'Enter' &&
				event.key !== 'ArrowLeft' &&
				event.key !== 'ArrowRight'
			) {
				event.preventDefault()
			}
		}

		return (
			<div className={classNames}>
				<label
					className='ml-1.5 text-sm font-medium'
					htmlFor={id}
				>
					{label}
				</label>

				<input
					className={`flex items-center justify-center w-full mt-2 p-3 rounded-lg border border-primary bg-white/0 text-base outline-none placeholder:text-gray-700 placeholder:font-normal duration-500 transition-colors hover:border-secondary focus:border-primary ${
						disabled
							? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
							: state === 'error'
								? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
								: state === 'success'
									? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
									: ''
					}`}
					autoComplete={disableAutocomplete ? 'off' : ''}
					id={id}
					disabled={disabled}
					placeholder={placeholder}
					ref={ref}
					type={type}
					onKeyDown={onKeyDown}
					{...rest}
				/>
			</div>
		)
	}
)
