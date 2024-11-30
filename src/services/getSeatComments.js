import axiosInstance from './axios'

function getSeatComments(seatId, page) {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`/seat/${seatId}`, {page: page.value})
			.then((res) => {
				resolve(res.data.comments)
			})
			.catch((err) => reject(err))
	})
}

export default getSeatComments