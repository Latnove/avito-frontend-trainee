import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export const ollamaApi = axios.create({
  baseURL: 'http://localhost:11434/api',
})
