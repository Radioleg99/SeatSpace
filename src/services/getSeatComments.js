import axiosInstance from './axios'

function getSeatComments(seatId) {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`/seat/${seatId}`)
			.then((res) => {
				resolve(res.data.comments)
			})
			.catch((err) => reject(err))
	})
}

export default getSeatComments
