// src/api/api.js
import axios from 'axios'

const api = {
  getCustomers() {
    return axios.get('https://randomuser.me/api?results=100')
  }
}

export default api
