import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        // Define your state properties here
        isLoading: false,
        user: null,
        // Add more state properties as needed
    }),
    getters: {
        // Define your getters here
        isLoggedIn: (state) => !!state.user,
        // Add more getters as needed
    },
    actions: {
        // Define your actions here
        setLoading(value) {
            this.isLoading = value
        },
        setUser(user) {
            this.user = user
        },
        logout() {
            this.user = null
        },
        // Add more actions as needed
    },
})