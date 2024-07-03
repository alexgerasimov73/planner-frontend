import type { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { CSSProperties } from 'react'

export function useTimeBlockSortable(id: UniqueIdentifier) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style: CSSProperties = {
		transform: CSS.Translate.toString(transform),
		transition
	}

	return { attributes, listeners, style, setNodeRef }
}
