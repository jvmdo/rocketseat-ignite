import axios from 'axios'

// const DEV_BASE_URL = 'http://localhost:3333'
const PROD_BASE_URL = 'https://json-server-jvmdo.vercel.app/api'

export const api = axios.create({
  baseURL: PROD_BASE_URL,
})
