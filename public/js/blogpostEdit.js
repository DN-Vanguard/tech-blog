// UPDATE
const blogpostUpdateFormSubmit = async (event) => {
	event.preventDefault();

	const id = document.querySelector('#blogpostId').value.trim();
	const title = document.querySelector('#title-new').value.trim();
	const content = document.querySelector('#content-new').value.trim();

	if (title && content) {
		const response = await fetch(`/api/blogposts/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				title,
				content
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Please add title and content to blogpost before submitting');
		}
	}
};

// DELETE
const blogpostDeleteSubmit = async (event) => {
	event.preventDefault();

	const id = document.querySelector('#deletePostBtn').value.trim();

	await fetch(`/api/blogposts/${id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	});

	document.location.replace('/dashboard');
};

document
	.querySelector('.post-form')
	.addEventListener('submit', blogpostUpdateFormSubmit);

document
	.querySelector('#deletePostBtn')
	.addEventListener('click', blogpostDeleteSubmit);