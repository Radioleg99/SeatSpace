import axiosInstance from './axios'

function getShowBasicInfo(showId) {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`show/basic/${showId}`)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => reject(err))
	})
}

export default getShowBasicInfo
