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
          <td>{{ user.name.first }}</td>
          <td>{{ user.name.last }}</td>
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
import api from '@/api/api'
import Pagination from '@/components/PaginationComponent.vue'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      usersPerPage: 5
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.usersPerPage)
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.usersPerPage
      const end = start + this.usersPerPage
      return this.users.slice(start, end)
    }
  },
  created() {
    api
      .getUsers()
      .then((response) => {
        this.users = response.data.results
        console.log(this.users) // Kiểm tra dữ liệu người dùng
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  },
  methods: {
    updatePage(page) {
      this.currentPage = page
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    },
    goToUserDetail(userId) {
      this.$router.push({ name: 'UserDetail', params: { id: userId } })
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
