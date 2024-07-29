<template>
  <div>
    <h1>User Detail</h1>
    <div v-if="customer">
      <p><strong>Name:</strong> {{ customer.name.first }} {{ customer.name.last }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <p><strong>Age:</strong> {{ customer.dob.age }}</p>
      <p><strong>Contact Number:</strong> {{ customer.phone }}</p>

      <td>{{ formatDate(customer.dob.date) }}</td>
    </div>
    <div v-else>
      <p>Loading user details...</p>
    </div>
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
import { useCustomerStore } from '@/stores/customer'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      customer: null
    }
  },
  async created() {
    const store = useCustomerStore()
    if (!store.customers.length) {
      await store.fetchCustomers()
    }
    this.customer = store.getCustomerById(this.id)
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    goBack() {
      this.$router.push('/admin/category/add') // điều hướng về trang danh sách khách hàng
    }
  }
}
</script>
