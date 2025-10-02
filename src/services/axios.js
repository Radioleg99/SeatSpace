import axios from 'axios'
import { applyMockHandlers } from './mock/adapter.js'

/**
 * Set `VITE_API_ENV` to dev / prod / mock. Default to mock so the UI works without the backend.
 */
const resolvedEnv =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_ENV) ||
  'mock'

export const API_ENV = resolvedEnv
export const isMockApi = API_ENV === 'mock'

const axiosInstance = axios.create({
	baseURL: getBaseUrl(API_ENV),
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

if (isMockApi) {
	applyMockHandlers(axiosInstance)
}

function getBaseUrl(env) {
	if (env === 'dev') return 'http://localhost'
	if (env === 'prod') return 'http://api.seatspace.icu'
	if (env === 'mock') return 'http://mock.local'
	return 'http://api.seatspace.icu'
}

export default axiosInstance
