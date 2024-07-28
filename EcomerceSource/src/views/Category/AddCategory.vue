<template>
  <div>
    <h1>User List</h1>
    <table class="user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Khách hàng</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>NV tư vấn</th>
          <th>Mô tả</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ index + 1 + (currentPage - 1) * usersPerPage }}</td>
          <td><img :src="getUserAvatarUrl(user.email)" alt="User Avatar" class="user-avatar" /></td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.street }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.address.zipcode }}</td>
          <td>
            <button @click="editUser(user.id)">✏️</button>
            <button @click="deleteUser(user.id)">🗑️</button>
          </td>
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
        this.users = response.data
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  },
  methods: {
    getUserAvatarUrl(email) {
      return `https://robohash.org/${email}.png?size=200x200`
    },
    updatePage(page) {
      this.currentPage = page
    },
    editUser(userId) {
      console.log(`Edit user with ID: ${userId}`)
      // Add your edit logic here
    },
    deleteUser(userId) {
      console.log(`Delete user with ID: ${userId}`)
      // Add your delete logic here
    }
  }
}
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.user-table thead {
  color: black;
}

.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f4f4f4;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
