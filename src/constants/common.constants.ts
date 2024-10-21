import { DASHBOARD_PAGES } from '../config/pages-url.config'

export const COLORS = {
	bg: '#f8f9ff',
	blue: '#74dbed',
	green: '#63d798',
	lime: '#c7f283',
	pink: '#FFB9E5',
	primary: '#DF77F3',
	secondary: '#7e82b9',
	text: '#1A202C',
	white: '#ffffff',
	yellow: '#ffec1f'
}

export const COMPLETED = 'completed'
export const CREATED_AT = 'createdAt'
export const JWT_EXPIRED = 'jwt expired'
export const JWT_MUST_BE_PROVIDED = 'jwt must be provided'
export const IS_COMPLETED = 'isCompleted'
export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
export const PRIORITY = 'priority'
export const SITE_NAME = 'Planner'
export const UNTITLED_TASK = 'Untitled task'
export const VIEW_TYPE = 'view-type'

export const ACCESS_TOKEN = `${DASHBOARD_PAGES.AUTH}/login/access-token`
export const LOGOUT = `${DASHBOARD_PAGES.AUTH}/logout`
export const TASK_URL = '/user/tasks'
export const TIMER_URL = '/user/timer'
export const TIMER_ROUND_URL = `${TIMER_URL}/round`
export const TIMER_TODAY_URL = `${TIMER_URL}/today`
export const TIME_BLOCKS_URL = '/user/time-blocks'
export const UPDATE_TIME_BLOCKS_ORDER_URL = `${TIME_BLOCKS_URL}/update-order`
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
