<template>
  <div>
    <h1>User Detail</h1>
    <div v-if="customer">
      <div v-if="isEditing">
        <form @submit.prevent="saveEdits">
          <p>
            <strong>First Name:</strong>
            <input v-model="customer.name.first" />
          </p>
          <p>
            <strong>Last Name:</strong>
            <input v-model="customer.name.last" />
          </p>
          <p>
            <strong>Email:</strong>
            <input v-model="customer.email" />
          </p>
          <p>
            <strong>Age:</strong>
            <input v-model="customer.dob.age" />
          </p>
          <p>
            <strong>Contact Number:</strong>
            <input v-model="customer.phone" />
          </p>
          <p>
            <strong>DOB:</strong>
            <input v-model="customer.dob.date" />
          </p>
          <button type="submit">Save</button>
          <button @click="cancelEdits">Cancel</button>
        </form>
      </div>
      <div v-else>
        <p><strong>Name:</strong> {{ customer.name.first }} {{ customer.name.last }}</p>
        <p><strong>Email:</strong> {{ customer.email }}</p>
        <p><strong>Age:</strong> {{ customer.dob.age }}</p>
        <p><strong>Contact Number:</strong> {{ customer.phone }}</p>
        <p><strong>DOB:</strong> {{ formatDate(customer.dob.date) }}</p>
        <button @click="startEditing">Edit</button>
        <button @click="deleteCustomer">Delete</button>
      </div>
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
      customer: null,
      isEditing: false,
      originalCustomer: null
    }
  },
  async created() {
    const store = useCustomerStore()
    if (!store.customers.length) {
      await store.fetchCustomers()
    }
    this.customer = store.getCustomerById(this.id)
    this.originalCustomer = { ...this.customer }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    goBack() {
      this.$router.push('/admin/category/add') // điều hướng về trang danh sách khách hàng
    },
    startEditing() {
      this.isEditing = true
    },
    cancelEdits() {
      this.customer = { ...this.originalCustomer }
      this.isEditing = false
    },
    async saveEdits() {
      const store = useCustomerStore()
      await store.updateCustomer(this.customer)
      this.isEditing = false
      this.originalCustomer = { ...this.customer }
    },
    async deleteCustomer() {
      const store = useCustomerStore()
      await store.deleteCustomer(this.id)
      this.$router.push('/admin/category/add') // điều hướng về trang danh sách khách hàng
    }
  }
}
</script>
