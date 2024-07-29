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

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      if (this.totalPages <= 6) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1)
      }

      if (this.currentPage <= 3) {
        return [1, 2, 3, '...', this.totalPages]
      }

      if (this.currentPage >= this.totalPages - 2) {
        return [1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages]
      }

      return [
        1,
        '...',
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        '...',
        this.totalPages
      ]
    }
  },
  methods: {
    goToPage(page) {
      if (page !== '...' && page > 0 && page <= this.totalPages) {
        this.$emit('updatePage', page)
      }
    }
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
