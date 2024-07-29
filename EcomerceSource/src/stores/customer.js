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
        const response = await api.getUsers()
        this.customers = response.data.results
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    getCustomerById(id) {
      return this.customers.find((customer) => customer.login.uuid === id)
    },
    async updateCustomer(updatedCustomer) {
      const index = this.customers.findIndex(
        (customer) => customer.login.uuid === updatedCustomer.login.uuid
      )
      if (index !== -1) {
        this.customers[index] = updatedCustomer
      }
    },
    async deleteCustomer(id) {
      this.customers = this.customers.filter((customer) => customer.login.uuid !== id)
    }
  }
})
