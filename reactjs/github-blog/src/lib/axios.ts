import axios from 'axios'

const BASE_URL = 'https://api.github.com'
// const GITHUB_TOKEN = 'zzz'

export const github = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${GITHUB_TOKEN}`,
  //   'Content-Type': 'application/json',
  // },
})
