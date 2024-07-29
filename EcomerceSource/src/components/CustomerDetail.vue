<template>
  <div class="user-detail-container">
    <h1 class="title">User Detail</h1>
    <div v-if="customer" class="user-info">
      <div class="user-info-item">
        <strong>Name:</strong>
        <span v-if="editing">
          <input v-model="editableCustomer.name.first" class="input" />
          <input v-model="editableCustomer.name.last" class="input" />
        </span>
        <span v-else>{{ customer.name.first }} {{ customer.name.last }}</span>
      </div>
      <div class="user-info-item">
        <strong>Email:</strong>
        <span v-if="editing">
          <input v-model="editableCustomer.email" class="input" />
        </span>
        <span v-else>{{ customer.email }}</span>
      </div>
      <div class="user-info-item">
        <strong>Age:</strong>
        <span v-if="editing">
          <input v-model="editableCustomer.dob.age" class="input" />
        </span>
        <span v-else>{{ customer.dob.age }}</span>
      </div>
      <div class="user-info-item">
        <strong>Contact Number:</strong>
        <span v-if="editing">
          <input v-model="editableCustomer.phone" class="input" />
        </span>
        <span v-else>{{ customer.phone }}</span>
      </div>
      <div class="user-info-item">
        <strong>Date of Birth:</strong>
        <span v-if="editing">
          <input v-model="editableCustomer.dob.date" class="input" />
        </span>
        <span v-else>{{ formatDate(customer.dob.date) }}</span>
      </div>
      <div v-if="editing" class="button-group">
        <button @click="saveEdits" class="button save-button">Save</button>
        <button @click="cancelEditing" class="button cancel-button">Cancel</button>
      </div>
      <div v-else class="button-group">
        <button @click="startEditing" class="button edit-button">Edit</button>
        <button @click="confirmDelete" class="button delete-button">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>Loading user details...</p>
    </div>
    <button @click="goBack" class="button back-button">Back</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customer'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useCustomerStore()
    const customer = ref(null)
    const editing = ref(false)
    const editableCustomer = reactive({})

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const goBack = () => {
      router.push('/admin/category/add')
    }

    const startEditing = () => {
      editing.value = true
    }

    const cancelEditing = () => {
      editing.value = false
      Object.assign(editableCustomer, customer.value)
    }

    const saveEdits = async () => {
      if (confirm('Are you sure you want to save the changes?')) {
        await store.updateCustomer(editableCustomer)
        alert('User updated successfully.')
        Object.assign(customer.value, editableCustomer)
        editing.value = false
      }
    }

    const confirmDelete = () => {
      if (confirm('Are you sure you want to delete this user?')) {
        deleteCustomer()
      }
    }

    const deleteCustomer = async () => {
      await store.deleteCustomer(customer.value.login.uuid)
      alert('User deleted successfully.')
      goBack()
    }

    onMounted(async () => {
      if (!store.customers.length) {
        await store.fetchCustomers()
      }
      customer.value = store.getCustomerById(props.id)
      Object.assign(editableCustomer, customer.value)
    })

    return {
      customer,
      editing,
      editableCustomer,
      formatDate,
      goBack,
      startEditing,
      cancelEditing,
      saveEdits,
      confirmDelete,
      deleteCustomer
    }
  }
}
</script>

<style scoped>
.user-detail-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: green;
}
.user-info {
  margin-bottom: 20px;
}
.user-info-item {
  margin-bottom: 10px;
  color: black;
}
.input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
.button {
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-button {
  background-color: #4caf50;
  color: white;
}
.cancel-button {
  background-color: #f44336;
  color: white;
}
.edit-button {
  background-color: #2196f3;
  color: white;
}
.delete-button {
  background-color: #f44336;
  color: white;
}
.back-button {
  background-color: #9e9e9e;
  color: white;
  display: block;
  width: 100%;
  margin-top: 20px;
}
</style>
