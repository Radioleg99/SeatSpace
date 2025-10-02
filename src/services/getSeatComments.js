import axiosInstance from './axios'

function getSeatComments(seatId, page = 1) {
	const pageNumber = typeof page === 'object' && page !== null && 'value' in page ? page.value : page
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(`/seat/${seatId}`, {
				params: {
					page: pageNumber,
				},
			})
			.then((res) => {
				resolve(res.data.comments)
			})
			.catch((err) => reject(err))
	})
}

export default getSeatComments
