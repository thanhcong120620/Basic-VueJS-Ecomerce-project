<template>
  <div>
    <h1>Categories</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data() {
    return {
      posts: []
    }
  },
  created() {
    api
      .getPosts()
      .then((response) => {
        this.posts = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
