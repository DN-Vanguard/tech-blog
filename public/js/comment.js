const commentFormSubmit = async (event) => {
	event.preventDefault();

	const content = document.querySelector('#comment-post').value.trim();
	const project_id = document.querySelector('#project_id').value.trim();

	if (content) {
		const response = await fetch( '/api/blogposts/comment', {
			method: 'POST',
			body: JSON.stringify({
				content,
				project_id
			}),
			headers: {'Content-Type': 'application/json'},
		});

		if (response.ok) {
			location.reload();
		} else {
			alert('Please add text to comment before submitting');
		}
	}
};

document
	.querySelector('.comment-form')
	.addEventListener('submit', commentFormSubmit);