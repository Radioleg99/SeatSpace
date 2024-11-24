import axiosInstance from './axios.js'

async function getHallLayoutData(showId) {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`/show/seat/${showId}`)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export default getHallLayoutData
