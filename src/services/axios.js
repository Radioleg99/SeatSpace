import axios from 'axios'

/**
 * current environment dev / prod / mock
 */
const env = 'dev'
// const env = 'prod'
// const env = 'mock'

const axiosInstance = axios.create({
	baseURL: getBaseUrl(),
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

function getBaseUrl() {
	if (env === 'dev') return 'http://localhost'
	if (env === 'prod') return 'http://api.seatspace.icu'
	if (env === 'mock') return 'https://cb7f5912-72e9-4988-9ac7-92527eff5d07.mock.pstmn.io'
}

export default axiosInstance
