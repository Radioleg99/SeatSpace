import axiosInstance from './axios'

function getShowComments(showId) {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`show/detail/${showId}`)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => reject(err))
	})
}

export default getShowComments
