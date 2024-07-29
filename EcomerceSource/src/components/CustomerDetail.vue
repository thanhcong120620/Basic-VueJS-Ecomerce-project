<!-- src/components/UserDetail.vue -->
<template>
  <div>
    <h1>User Detail</h1>
    <p><strong>First Name:</strong> {{ user.name.first }}</p>
    <p><strong>Last Name:</strong> {{ user.name.last }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Age:</strong> {{ user.dob.age }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>DOB:</strong> {{ formatDate(user.dob.date) }}</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      user: null
    }
  },
  created() {
    // Fetch user details based on ID
    // This assumes that the `id` prop is the index in the array
    // You may need to change this depending on your actual ID
    this.user = this.$root.$data.users.find((u) => u.login.uuid === this.id)
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  }
}
</script>
