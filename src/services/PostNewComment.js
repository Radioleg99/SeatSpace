import axiosInstance from './axios'

/**
 *
 * @param {File} images image file object
 * @param {Function} progress callback function to update progress
 */
function PostNewComment(images, showId, seatId, seatRating, showRating, content, progress) {
	return new Promise((resolve, reject) => {
		const formData = new FormData()

		images.forEach((image) => {
			formData.append('images', image)
		})

		formData.append('showId', showId)
		formData.append('seatId', seatId)
		formData.append('seatRating', seatRating)
		formData.append('showRating', showRating)
		formData.append('content', content)

		axiosInstance
			.post('/comment/new', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const currentProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
					progress(currentProgress)
				},
			})
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export default PostNewComment
