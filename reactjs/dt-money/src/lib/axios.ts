import axios from 'axios'

const JSON_SERVER_URL = import.meta.env.VITE_JSON_SERVER_URL

console.log({ JSON_SERVER_URL })

export const api = axios.create({
  baseURL: JSON_SERVER_URL,
})
