// SUBMIT
const blogpostFormSubmit = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#title-new').value.trim();
	const content = document.querySelector('#content-new').value.trim();

	if (title && content) {
		const response = await fetch('/api/blogposts/', {
			method: 'POST',
			body: JSON.stringify({
				title,
				content
			}),
			headers: {'Content-Type': 'application/json'},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Please add a name and description to blogpost before submitting');
		}
	}
};

document
	.querySelector('.post-form')
	.addEventListener('submit', blogpostFormSubmit);