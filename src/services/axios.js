import axios from 'axios'

/**
 * 当前环境 dev or prod
 */
// const env = 'dev'
const env = 'prod'

const axiosInstance = axios.create({
	baseURL: env === 'dev' ? 'http://localhost' : 'http://api.seatspace.icu', // 设置API的基础URL
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default axiosInstance
