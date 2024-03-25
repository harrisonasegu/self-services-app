import { userDashboardNavMenu } from './user-nav-menu-config'

// const userRoleId = authStore?.getUser.value?.roleId

// export const dashboardNavMenu = userDashboardNavMenu[userRoleId] // menu dispalyed based on the current user's ID
export const dashboardNavMenu = (path?: string ) => userDashboardNavMenu[1](path) // menu dispalyed based on the current user's ID
