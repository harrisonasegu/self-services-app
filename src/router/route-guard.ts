import { useLSUserCredentials } from "@/composables/ls_userCredentials"

const user = useLSUserCredentials()

// const user_data = user ? user?.data : null

const authenticateUser = (to: any, from: any, next: any) => {
    const requiresAuth = (to.meta && to.meta.requiresAuth) ? true : false;

    // Route authentication required
    if (requiresAuth) {
        // This checks user for token
        if (user) {
            // This checks user for route authorization
            next()
        } else {
            // route user to login page
            next({
                name: 'sign in'
            })
        }
    } else {
        // unprotected routes, hence can be viewed by any one
        next()
    }
}

export default authenticateUser
