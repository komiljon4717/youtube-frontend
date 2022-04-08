let usernameInput = document.querySelector("#usernameInput")
let passwordInput = document.querySelector("#passwordInput")
let submitButton = document.querySelector("#submitButton")




submitButton.onclick = async (event) => {
    event.preventDefault();
    let username = usernameInput.value.trim()
    let password = passwordInput.value.trim()

    let response = await request('/login', 'POST', {
        username,
        password
    })

    console.log(response.message);
    window.localStorage.setItem('token', response.token)
    window.location = './index.html'
}