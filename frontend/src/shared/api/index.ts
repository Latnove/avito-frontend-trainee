import axios from 'axios'

export const api = axios.create({
  // CR: стоит использовать переменную окружения import.meta.env.VITE_API_URL
  baseURL: 'http://localhost:8080',
})

export const ollamaApi = axios.create({
  // CR: стоит использовать переменную окружения import.meta.env.VITE_OLLAMA_API_URL
  baseURL: 'http://localhost:11434/api',
})
