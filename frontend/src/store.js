import { defineStore } from 'pinia'
import { api } from './api'

export const useStore = defineStore('counter', {
  state: () => {
    return {
      user: null,
      notifications: []
    }
  },

  actions: {
    async getUser() {
      this.user = await api.me()
    },
    notifyRecieveChips(sender, amount) {
      const id = Date.now()
      this.notifications.push({
        id,
        sender, 
        amount,
        type: "chips"
      })
      setTimeout(()=> {
        this.notifications = this.notifications.filter(notification => notification.id !== id)
      },3000)
    }
  },
})