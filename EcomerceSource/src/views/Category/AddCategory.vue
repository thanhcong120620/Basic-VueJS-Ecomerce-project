<template>
  <div>
    <h1>User List</h1>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên KH</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Age</th>
          <th>Tình trạng</th>
          <th>DOB</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in paginatedUsers"
          :key="user.login.uuid"
          @click="goToUserDetail(user.login.uuid)"
          style="cursor: pointer"
        >
          <td>{{ (currentPage - 1) * usersPerPage + index + 1 }}</td>
          <td>{{ user.name.first }} {{ user.name.last }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dob.age }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ formatDate(user.dob.date) }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @updatePage="updatePage" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customer'
import Pagination from '@/components/PaginationComponent.vue'

export default {
  components: {
    Pagination
  },
  setup() {
    const customerStore = useCustomerStore()
    const router = useRouter()
    const currentPage = ref(1)
    const usersPerPage = ref(5)

    const totalPages = computed(() => {
      return Math.ceil(customerStore.customers.length / usersPerPage.value)
    })

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * usersPerPage.value
      const end = start + usersPerPage.value
      return customerStore.customers.slice(start, end)
    })

    const fetchUsers = async () => {
      try {
        await customerStore.fetchCustomers()
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }

    const goToUserDetail = (userId) => {
      console.log('userId:', userId)
      router.push({ name: 'UserDetail', params: { id: userId } })
    }

    const updatePage = (page) => {
      currentPage.value = page
    }

    onMounted(fetchUsers)

    return {
      currentPage,
      usersPerPage,
      totalPages,
      paginatedUsers,
      updatePage,
      formatDate,
      goToUserDetail
    }
  }
}
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.user-table th {
  background-color: #4caf50;
  color: white;
}
</style>
