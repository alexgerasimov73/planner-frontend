export const COLORS = {
	bg: '#f8f9ff',
	pink: '#ffcce1',
	primary: '#603e75',
	secondary: '#7e82b9',
	text: '#191919',
	white: '#ffffff',
	yellow: '#faffc6'
}

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
export const SITE_NAME = 'Planner'

export const TASK_URL = '/user/tasks'
export const TIMER_URL = '/user/timer'
export const TIME_BLOCKS_URL = '/user/time-blocks'
export const USER_URL = '/user/profile'

export const SEASON_EMOJI: Record<string, string> = {
	winter: '⛄️',
	spring: '🌸',
	summer: '🌻',
	autumn: '🍂'
}

export const TASKS_COLUMNS = [
	{
		label: 'Today',
		value: 'today'
	},
	{
		label: 'Tomorrow',
		value: 'tomorrow'
	},
	{
		label: 'On this week',
		value: 'on-this-week'
	},
	{
		label: 'On next week',
		value: 'on-next-week'
	},
	{
		label: 'Later',
		value: 'later'
	},
	{
		label: 'Completed',
		value: 'completed'
	}
]

export const TIME_BLOCKING_COLORS = [
	'coral',
	'lightslategray',
	'orange',
	'orchid',
	'royalblue',
	'seagreen',
	'tomato'
]
