import decode from "jwt-decode"

class AuthService {
	getProfile() {
		return decode(this.getToken())
	}

	loggedIn() {
		const token = this.getToken()
		const organiser = this.getUser()
		return {
			token:
				token && !this.isTokenExpired(token) ? true : false,
			organiser: organiser,
		}
	}

	isTokenExpired(token) {
		// Decode the token to get its expiration time that was set by the server
		const decoded = decode(token)
		// If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
		if (decoded.exp < Date.now() / 1000) {
			localStorage.removeItem("id_token")
		// TODO added this line to make sure if the user is logged out the data is removed
			localStorage.removeItem("user")
			return true
		}
		// If token hasn't passed its expiration time, return `false`
		return false
	}

	getToken() {
		return localStorage.getItem("id_token")
	}

	getUser() {
		const localUser = localStorage.getItem("user")
		const organiser = JSON.parse(localUser)
		return organiser
	}

	login(idToken, newuser) {
		localStorage.setItem("id_token", idToken)
		localStorage.setItem("user", JSON.stringify(newuser))

		window.location.assign("/")
	}

	logout() {
		localStorage.removeItem("id_token")
		// TODO added this line to make sure if the user is logged out the data is removed
		localStorage.removeItem("user")
		localStorage.removeItem("guest")
		// window.location.assign("/")
	}
}

export default new AuthService()
