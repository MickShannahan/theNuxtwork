import axios from 'axios'

// FIXME need to be able to pull information from appconfig or runtime config
export const api = axios.create({
  baseURL: 'https://sandbox.codeworksacademy.com',
  timeout: 8000
})
