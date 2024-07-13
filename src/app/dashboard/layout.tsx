import type { PropsWithChildren } from 'react'

import { DashboardLayout } from '@/components/dashboard-layout/DashboardLayout'

export const Layout = ({ children }: PropsWithChildren) => (
	<DashboardLayout>{children}</DashboardLayout>
)
