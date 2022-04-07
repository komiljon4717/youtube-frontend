

let usernameInput = document.querySelector("#usernameInput")
let passwordInput = document.querySelector("#passwordInput")
let uploadInput = document.querySelector("#uploadInput")
let submitButton = document.querySelector("#submitButton")

submitButton.onclick = async (event) =>{
    event.preventDefault()

    let username = usernameInput.value.trim()
    let password = passwordInput.value.trim()
    let file = uploadInput.files[0]

    if (!(username && password && file)) return

    const formData = new FormData()
	formData.append('username', username)
	formData.append('password', password)
	formData.append('file', file)

	let response = await request('/register', 'POST', formData)

    window.localStorage.setItem('token', response.token)
    window.location = './index.html'
    
}