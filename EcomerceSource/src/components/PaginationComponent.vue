<template>
  <div class="pagination">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>

    <button
      v-for="page in pages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

// Định nghĩa các props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

// Định nghĩa các sự kiện emit
const emit = defineEmits(['updatePage'])

// Tính toán các trang
const pages = computed(() => {
  const { currentPage, totalPages } = props

  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
})

// Hàm để chuyển đến trang mới
const goToPage = (page) => {
  if (page !== '...' && page > 0 && page <= props.totalPages) {
    emit('updatePage', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.pagination button {
  margin: 0 2px;
  padding: 10px;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;
}
.pagination button.active {
  background-color: #4caf50;
  color: white;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
