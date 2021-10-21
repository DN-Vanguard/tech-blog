const signupFormSubmit = async (event) => {
	event.preventDefault();

	const user = document.querySelector('#user-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (user && password) {
		console.log('@@@@@@@@@@@');
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({
				user,
				password
			}),
			headers: {'Content-Type': 'application/json'},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Please fill in \'User\' & \'Password\'.\n\'Password\' must be a minimum of 8 characters.');
		}
	}
};

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormSubmit);