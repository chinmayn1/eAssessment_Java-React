import { decodeToken } from 'react-jwt'

// const token = JSON.parse(sessionStorage.getItem("user"))


const get_token = () => {
	if (sessionStorage.getItem("user"))
		return JSON.parse(sessionStorage.getItem("user")).access_token
}

export const get_Authorization_header = () => {
	if (get_token())
		return { 'Authorization': 'Bearer ' + get_token() }
	return { 'Content-Type': 'application/json' }
}

export const get_decoded_token = (token) => {
	if (token !== undefined) {
		const decoded = decodeToken((token.startsWith("?token=") ? token.slice(token.indexOf("=") + 1) : ''))
		return (decoded ? decoded : {})
	}
	else
		return decodeToken(get_token())
}

export const get_fname = () => {
	return get_decoded_token().sub.fname
}

export const get_user_id = () => {
	return get_decoded_token().sub.id
}

export const get_user_id_from_member = () => {
	if (get_decoded_token().sub.hasOwnProperty("user_id"))
		return get_decoded_token().sub.get_user_id
	return undefined
}
export const get_user_role = () => {
	// console.log(get_decoded_token().sub.user_role)
	return get_decoded_token().sub.user_role
}

export const get_assessment_id = () => {
	return JSON.parse(localStorage.getItem("id"));
}