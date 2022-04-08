// const backendApi = 'https://youtube-backend00.herokuapp.com'
const backendApi = 'http://localhost:5000'

async function request(route, method, body = null) {
    try {
        let headers = {token: window.localStorage.getItem('token')}
        
		if(!(body instanceof FormData) && method != 'GET') {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(body || null)
		}
	
		let response = await fetch(backendApi + route, {
			method,
			headers,
			body
		})
        if (response.status == 401) {
            window.localStorage.removeItem('token')
            window.location = './login.html'
            return
        }

        if (![200, 201].includes(response.status)) {
            response = await response.json()

            alert(`${response.message}`)
            // messageText.textContent = response.message
            // messageText.style.color = 'red'
            return
        }

        return await response.json()
    } catch (error) {
        console.log(error)
        // messageText.textContent = error.message
        // messageText.style.color = 'red'
    }
}

function createElements(...elements) {
    return elements.map(el => document.createElement(el))
}