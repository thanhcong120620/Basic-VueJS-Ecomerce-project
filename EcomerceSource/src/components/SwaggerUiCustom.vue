<template>
  <div id="swagger-ui" class="swagger-ui-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Dynamically load Swagger UI script and CSS
  const swaggerScript = document.createElement('script')
  swaggerScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.3/swagger-ui-bundle.min.js'
  swaggerScript.onload = () => {
    window.SwaggerUIBundle({
      url: 'https://petstore.swagger.io/v2/swagger.json', // Thay đổi URL để trỏ đến tài liệu Swagger của bạn
      dom_id: '#swagger-ui' // Đảm bảo bạn sử dụng selector CSS hợp lệ
    })
  }
  document.head.appendChild(swaggerScript)

  const swaggerCss = document.createElement('link')
  swaggerCss.rel = 'stylesheet'
  swaggerCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.3/swagger-ui.css'
  document.head.appendChild(swaggerCss)
})
</script>

<style scoped>
.swagger-ui-container {
  padding: 20px;
}
</style>
