import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

export const $api = axios.create({ baseURL: baseUrl })