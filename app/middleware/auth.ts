export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
        return navigateTo('/login?next=' + to.path)
    }

// Check if user can access the route
    let routeName = to.name?.toString().replace(/s$/, '')?.split('-', 1)[0] || ''
    // if (!canAccess(routeName)){
    //     throw createError({
    //         statusCode: 403,
    //         statusMessage: 'Access Denied'
    //     })
    // }
})