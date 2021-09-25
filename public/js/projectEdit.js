// SUBMIT UPDATE
const projectUpdateFormSubmit = async (event) => {
	event.preventDefault();

	const id = document.querySelector('#projectId').value.trim();
	const title = document.querySelector('#title-new').value.trim();
	const content = document.querySelector('#content-new').value.trim();

	if (title && content) {
		const response = await fetch(`/api/projects/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				title,
				content
			}),
			headers: {'Content-Type': 'application/json'},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Please add title and content to project before submitting');
		}
	}
};

// DELETE PROJECT
const projectDeleteSubmit = async (event) => {
	event.preventDefault();

	const id = document.querySelector('#deletePostBtn').value.trim();

	await fetch( `/api/projects/${id}`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'},
	});

	document.location.replace('/dashboard');
};

document
	.querySelector('.post-form')
	.addEventListener( 'submit', projectUpdateFormSubmit);

document
	.querySelector('#deletePostBtn')
	.addEventListener('click', projectDeleteSubmit);