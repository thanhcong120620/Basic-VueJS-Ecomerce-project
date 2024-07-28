<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('updatePage', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('updatePage', this.currentPage + 1)
      }
    },
    goToPage(page) {
      this.$emit('updatePage', page)
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}
.pagination button {
  margin: 0 4px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
}
.pagination button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
.pagination button:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
}
</style>
