// src/api/api.js

import axios from 'axios'

export default {
  getUsers() {
    return axios.get('https://randomuser.me/api?results=50')
  }
}
