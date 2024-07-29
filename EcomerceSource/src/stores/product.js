// src/stores/product.js
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  actions: {
    setProducts(products) {
      this.products = products
    },
    addProduct(product) {
      this.products.push(product)
    }
  },
  getters: {
    allProducts(state) {
      return state.products
    }
  }
})
