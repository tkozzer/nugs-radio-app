import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLoading: false,
        user: null,
        currentPhishId: null,
        currentStationId: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
    },
    actions: {
        setLoading(value) {
            this.isLoading = value
        },
        setUser(user) {
            this.user = user
        },
        logout() {
            this.user = null
        },
        setCurrentPhishId(id) {
            this.currentPhishId = id
        },
        setCurrentStationId(id) {
            this.currentStationId = id
        },
    },
})