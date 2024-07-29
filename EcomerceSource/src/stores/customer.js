// src/stores/customer.js
import { defineStore } from 'pinia'
import api from '@/api/api'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: []
  }),
  actions: {
    async fetchCustomers() {
      try {
        const response = await api.getCustomers()
        this.customers = response.data.results
      } catch (error) {
        console.error('Error fetching customer data:', error)
      }
    }
  },
  getters: {
    getCustomerById: (state) => (id) => {
      return state.customers.find((customer) => customer.login.uuid === id)
    }
  }
})
