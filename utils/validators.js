module.exports.validateRegisterInput = (
	username,
	email,
	password,
	confirmPassword
) => {
	const errors = {};
	if (username.trim() === "") {
		errors.username = "Invalid";
	}
	if (email.trim() === "") {
		errors.email = "Invalid";
	} else {
		const regEx =
			/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = "Invalid";
		}
	}
	if (password === "") {
		errors.password = "Invalid";
	} else if (password !== confirmPassword) {
		errors.confirmPassword = "Invalid";
	} else if (password.length < 4) {
		errors.password = "Invalid";
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
