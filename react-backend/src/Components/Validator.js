const REQUIRED = "This is required";
const INVALID_EMAIL = "Email address is invalid";
const NOT_MATCH_PASSWD = "Password does't matched";
const SELECTED_RADIO = "The correct option must be selected for radio";
const MUST_BE_NUMBER = "Number must be valid";
const INVALID_FIELD_LENGTH = "At least 3 character required."
const MAX_LENGTH = 3;
//Validator
export const Validator = (data, { option3Visibility, option4Visibility } = {}) => {
	const error = {};

	//for signing
	//! Also for email modal of profile page
	if (data.hasOwnProperty("email") && data.hasOwnProperty("password")) {
		if (!data.email) {
			error.email = REQUIRED;
		} else if (!data.email.match(/^[a-z0-9]+[\\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/i)) {
			error.email = INVALID_EMAIL
		}

		if (!data.password) {
			error.password = REQUIRED;
		}
	}
	if (data.hasOwnProperty("email") && data.hasOwnProperty("terms")) {
		if (!data.email) {
			error.email = REQUIRED
		} else if (!data.email.match(/^[a-z0-9]+[\\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/i)) {
			error.email = INVALID_EMAIL
		}

		if (!data.terms) {
			error.terms = REQUIRED
		}
	}

	//details
	if (data.hasOwnProperty("first_name") && data.hasOwnProperty("last_name") && data.hasOwnProperty("company_name") && data.hasOwnProperty("job_title") && data.hasOwnProperty("hires")) {
		if (!data.first_name) {
			error.first_name = REQUIRED;
		}
		if (!data.last_name) {
			error.last_name = REQUIRED;
		}
		if (!data.company_name) {
			error.company_name = REQUIRED;
		}
		if (!data.job_title) {
			error.job_title = REQUIRED;
		}
		if (!data.hires) {
			error.hires = REQUIRED;
		}
	}

	// Passwd
	if (data.hasOwnProperty("current_password") && data.hasOwnProperty("confirm_password")) {
		if (!data.current_password) {
			error.current_password = REQUIRED
		}

		if (!data.confirm_password) {
			error.confirm_password = REQUIRED
		}

		if (data.current_password !== data.confirm_password) {
			error.confirm_password = NOT_MATCH_PASSWD
		}
	}
	//Company
	if (data.hasOwnProperty("company_name") && data.hasOwnProperty("country") && data.hasOwnProperty("website")) {
		if (!data.company_name) {
			error.company_name = REQUIRED
		}
		if (!data.country) {
			error.country = REQUIRED
		}
		if (!data.website) {
			error.website = REQUIRED
		}
	}

	//new assessment
	if (data.hasOwnProperty("assessment_name") && data.hasOwnProperty("job_role")) {
		if (!data.assessment_name) {
			error.assessment_name = REQUIRED
		}
		if (!data.job_role) {
			error.job_role = REQUIRED
		}
	}

	// Profile
	//! NOTE: only modal have validation,this is only for password modal another modal is email that is same as signin 
	if (data.hasOwnProperty('old_password')) {
		if (!data.old_password) {
			error.old_password = REQUIRED;
		}
		if (!data.new_password) {
			error.new_password = REQUIRED;
		}
		if (!data.confirm_password) {
			error.confirm_password = REQUIRED;
		} else if (data.new_password !== data.confirm_password) {
			error.confirm_password = NOT_MATCH_PASSWD
		}
	}

	//Team: 1)create new and 2)Change password
	if (data.hasOwnProperty("email") && data.hasOwnProperty("fname") && data.hasOwnProperty("lname") && data.hasOwnProperty("role") && data.hasOwnProperty("mobile")) {
		if (!data.email) {
			error.email = REQUIRED;
		} else if (!data.email.match(/^[a-z0-9]+[\\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/i)) {
			error.email = INVALID_EMAIL
		}
		if (!data.mobile) {
			error.mobile = REQUIRED;
		} else if (!/^\d+$/.test(data.mobile)) {
			error.mobile = MUST_BE_NUMBER;
		}
		if (!data.fname) {
			error.fname = REQUIRED;
		}
		if (!data.lname) {
			error.lname = REQUIRED;
		}
		if (!data.role) {
			error.role = REQUIRED;
		}
	}
	if (data.hasOwnProperty("new_password") && data.hasOwnProperty("confirm_password")) {
		if (!data.new_password) {
			error.new_password = REQUIRED
		}

		if (!data.confirm_password) {
			error.confirm_password = REQUIRED
		}

		if (data.new_password !== data.confirm_password) {
			error.confirm_password = NOT_MATCH_PASSWD
		}
	}

	// Questions : Coding && Essay 
	if (data.hasOwnProperty("time_minutes") && data.hasOwnProperty("text")) {
		if (!data.time_minutes) {
			error.time_minutes = REQUIRED
		}
		if (!data.text) {
			error.text = REQUIRED
		}
	}
	// Questions : MCQ
	if (data.hasOwnProperty("time_minutes") && data.hasOwnProperty("option_1") && data.hasOwnProperty("option_2") && data.hasOwnProperty("correct_option") && data.hasOwnProperty("text")) {
		if (!data.time_minutes) {
			error.time_minutes = REQUIRED
		}

		if (!data.option_1) {
			error.option_1 = REQUIRED
		}

		if (!data.option_2) {
			error.option_2 = REQUIRED
		}

		if (!data.option_3 && option3Visibility) {
			error.option_3 = REQUIRED
		}

		if (!data.option_4 && option4Visibility) {
			error.option_4 = REQUIRED
		}

		if (!data.text) {
			error.text = REQUIRED
		}
		if (!data.correct_option) {
			error.correct_option = SELECTED_RADIO
		}
	}

	//assessment invite
	if (data.hasOwnProperty("first_name") && data.hasOwnProperty("last_name") && data.hasOwnProperty("email")) {

		if (!data.first_name) {
			error.first_name = REQUIRED;
		} else if (data.first_name.length < MAX_LENGTH) {
			error.first_name = INVALID_FIELD_LENGTH
		}

		if (!data.last_name) {
			error.last_name = REQUIRED;
		} else if (data.last_name.length < MAX_LENGTH) {
			console.log(data.last_name.length)
			error.last_name = INVALID_FIELD_LENGTH
		}

		if (!data.email) {
			error.email = REQUIRED;
		} else if (!data.email.match(/^[a-z0-9]+[\\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/i)) {
			error.email = INVALID_EMAIL
		}
	}

	error.total_error = Object.keys(error).length
	return error
}