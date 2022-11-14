import { get_user_role } from "./TokenParser";

class Auth {
	constructor() {
		this.authenticated = false
	}
	login(user, callback) {
		sessionStorage.setItem("user", JSON.stringify(user));
		this.authenticated = true;
		callback();
	}
	logout(callback) {

		if (sessionStorage.getItem("user")) {
			sessionStorage.removeItem("user");
			this.authenticated = false;
		}
		callback()
	}
	isAuthenciated() {
		if (sessionStorage.getItem("user")) {
			this.authenticated = true;
		}
		return this.authenticated
	}

	hasAccess() {
		const role = get_user_role()
		if (role === "HR Manager" || role === "Recruiter") {
			return false
		} return true
	}
}

export default new Auth();