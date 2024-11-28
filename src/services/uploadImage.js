import axiosInstance from './axios'

/**
 *
 * @param {File} images image file object
 */
function uploadSingleImage(images, progress) {
	return new Promise((resolve, reject) => {
		const formData = new FormData()
		Object.keys(images).forEach((key) => {
			formData.append('file', images[key])
		})

		axiosInstance
			.post('/image/new', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const currentProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
					console.log('Upload Progress: ' + currentProgress + '%')
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

export default uploadSingleImage
