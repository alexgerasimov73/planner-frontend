class DASHBOARD {
	private root = '/dashboard'

	HOME = this.root
	AUTH = '/auth'
	HABITS = `${this.root}/habits`
	SETTINGS = `${this.root}/settings`
	TASKS = `${this.root}/tasks`
	TIMER = `${this.root}/timer`
	TIME_BLOCKING = `${this.root}/time-blocking`
}

export const DASHBOARD_PAGES = new DASHBOARD()
