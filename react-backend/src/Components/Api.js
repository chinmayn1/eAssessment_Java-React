import axios from 'axios'
import { get_Authorization_header } from './TokenParser'

class Api {
	constructor() {
		this.data = '';
		this.axios = axios.create({
			baseURL: process.env.REACT_APP_BACKEND_URL,
			headers: get_Authorization_header()
		})
	}

	async get(endpoint) {
		if (endpoint)
			return this.axios.get(endpoint, { headers: get_Authorization_header() })
		console.warn("Get method require an endpoint for requesting")
	}

	async post(endpoint, payload) {
		if (endpoint)
			return this.axios.post(endpoint, payload)
		console.warn("Post method require an endpoint for requesting")
	}

	async put(endpoint, payload) {
		if (endpoint)
			return this.axios.put(endpoint, payload)
		console.warn("Put method require an endpoint for requesting")
	}

	async delete(endpoint) {
		if (endpoint)
			return this.axios.delete(endpoint)
		console.warn("Delete method require an endpoint for requesting")
	}
}
export default new Api()