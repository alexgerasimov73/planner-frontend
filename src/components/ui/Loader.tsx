import { Loader as LoaderIcon } from 'lucide-react'

export function Loader() {
	return (
		<div className='flex justify-center items-center'>
			<LoaderIcon className='animate-spin text-primary' />
		</div>
	)
}
