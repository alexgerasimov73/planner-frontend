import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { ITimeBlockResponse } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

export function useTimeBlocks() {
	const { isLoading, data } = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => timeBlockService.getTimeBlocks()
	})

	const [items, setItems] = useState<
		ReadonlyArray<ITimeBlockResponse> | undefined
	>(data?.data)

	useEffect(() => setItems(data?.data), [data?.data])

	return { isLoading, items, setItems }
}
