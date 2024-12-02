import Swal from 'sweetalert2'

function showImgPreview(imgUrl) {
	Swal.fire({
		imageUrl: imgUrl,
		imageAlt: 'Image Preview',
		showConfirmButton: true,
		background: 'rgba(0,0,0,0.8)',
		padding: '10',
		backdrop: true,
		confirmButtonText: 'Close',
	})
}

export default showImgPreview
