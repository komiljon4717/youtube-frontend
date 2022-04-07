let searchInput = document.querySelector("#search-input")
let searchBtn = document.querySelector("#search-btn")
let videoList = document.querySelector("#video-list")
let userList = document.querySelector("#user-list")
let datalist = document.querySelector("#datalist")
let inputMic = document.querySelector("#mic")
let allLi = document.querySelectorAll(".channel")
let avatarImg = document.querySelector("#avatarka")

let users = null
let videos = null
let adminImage = null

async function getData(params) {

    let response = await fetch(backendApi, {
        headers: {token: window.localStorage.getItem('token')}
    })
    response = await response.json()

    users = response.result.users
    videos = response.result.videos
    adminImage = response.result.adminImage
    
    renderUsers(users)
    renderVideos(videos, users)
}


function renderUsers(users){
    if(renderUsers.users?.length == users.length) {
		if(JSON.stringify(renderUsers.users) == JSON.stringify(users)) {
			return
		}
	}
    adminImage?.img? avatarImg.src = backendApi + adminImage.img: "./public/img/avatar.jpg"
    
    renderUsers.users = users

    userList.innerHTML = ""
    

    for (const user of users) {
        let [ li ] = createElements("li")
        li.classList.add("channel")
        li.setAttribute('data-id' , user.userId);
        li.setAttribute('onclick' , "choose(this)");
        li.innerHTML = `
        <a href="#">
            <img src="${backendApi + user.img}" alt="channel-icon" width="30px" height="30px">
            <span>${user.username}</span>
        </a>
        `
        userList.append(li)
    }
}


function renderVideos(videos, users){
    if(renderVideos.videos?.length == videos.length) {
		if(JSON.stringify(renderVideos.videos) == JSON.stringify(videos)) {
			return
		}
	}

    renderVideos.videos = videos

    videoList.textContent = ""
    datalist.textContent = ""

    for (const video of videos) {
        for (const user of users) {

            if (user.userId == video.userId) {
                let [ li, option ] = createElements("li", "option")
                option.value = video.name
                li.classList.add("iframe")
                li.setAttribute('data-id' , video.videoId);
                li.innerHTML = `
                    <video src="${backendApi + video.video}" controls=""></video>
                    <div class="iframe-footer">
                        <img src="${backendApi + user.img}" alt="channel-icon">
                        <div class="iframe-footer-text">
                            <h2 class="channel-name">${user.username}</h2>
                            <h3 class="iframe-title">${video.name}</h3>
                            <time class="uploaded-time">${video.time}</time>
                            <a class="download" href="#">
                                <span>${+video.videoSize} MB</span>
                                <img src="./public/img/download.png">
                            </a>
                        </div>                  
                    </div>
                `
                datalist.append(option)
                videoList.append(li)
            }
        }
        
    }
}


const voice = new webkitSpeechRecognition()

voice.lang = 'uz-UZ'
voice.continious = false

voice.onresult = event => {
    let micRes = event.results[0][0].transcript

    videoList.textContent = ""
    datalist.textContent = ""

    for (const video of videos) {
        for (const user of users) {

            if (user.userId == video.userId) {

                if (video.name.toLowerCase().includes(micRes)) {
                    let [ li, option ] = createElements("li", "option")
                    option.value = video.name
                    li.classList.add("iframe")
                    li.setAttribute('data-id' , video.videoId);
                    li.innerHTML = `
                        <video src="${backendApi + video.video}" controls=""></video>
                        <div class="iframe-footer">
                            <img src="${backendApi + user.img}" alt="channel-icon">
                            <div class="iframe-footer-text">
                                <h2 class="channel-name">${user.username}</h2>
                                <h3 class="iframe-title">${video.name}</h3>
                                <time class="uploaded-time">${video.time}</time>
                                <a class="download" href="#">
                                    <span>${+video.videoSize} MB</span>
                                    <img src="./public/img/download.png">
                                </a>
                            </div>                  
                        </div>
                    `
                    datalist.append(option)
                    videoList.append(li)
                }
                
            }
        }
        
    }


}

inputMic.onclick = (event) => {
    event.preventDefault();
    voice.start()
}

searchBtn.onclick = () => {
    let title = searchInput.value.trim()

    videoList.textContent = ""
    datalist.textContent = ""

    for (const video of videos) {
        for (const user of users) {

            if (user.userId == video.userId) {

                if (video.name.includes(title)) {
                    let [ li, option ] = createElements("li", "option")
                    option.value = video.name
                    li.classList.add("iframe")
                    li.setAttribute('data-id' , video.videoId);
                    li.innerHTML = `
                        <video src="${backendApi + video.video}" controls=""></video>
                        <div class="iframe-footer">
                            <img src="${backendApi + user.img}" alt="channel-icon">
                            <div class="iframe-footer-text">
                                <h2 class="channel-name">${user.username}</h2>
                                <h3 class="iframe-title">${video.name}</h3>
                                <time class="uploaded-time">${video.time}</time>
                                <a class="download" href="#">
                                    <span>${+video.videoSize} MB</span>
                                    <img src="./public/img/download.png">
                                </a>
                            </div>                  
                        </div>
                    `
                    datalist.append(option)
                    videoList.append(li)
                }
                
            }
        }
        
    }
}

function choose(nimadir) {
    let Id = nimadir.dataset.id
    
   
    if (Id == undefined) {
        console.log("sa");
        videoList.textContent = ""
        datalist.textContent = ""

        for (const video of videos) {
            for (const user of users) {

                if (user.userId == video.userId) {
                    let [ li, option ] = createElements("li", "option")
                    option.value = video.name
                    li.classList.add("iframe")
                    li.setAttribute('data-id' , video.videoId);
                    li.innerHTML = `
                        <video src="${backendApi + video.video}" controls=""></video>
                        <div class="iframe-footer">
                            <img src="${backendApi + user.img}" alt="channel-icon">
                            <div class="iframe-footer-text">
                                <h2 class="channel-name">${user.username}</h2>
                                <h3 class="iframe-title">${video.name}</h3>
                                <time class="uploaded-time">${video.time}</time>
                                <a class="download" href="#">
                                    <span>${+video.videoSize} MB</span>
                                    <img src="./public/img/download.png">
                                </a>
                            </div>                  
                        </div>
                    `
                    datalist.append(option)
                    videoList.append(li)
                }
            }
            
        }
        
    }
    videoList.textContent = ""

    for (const video of videos) {
        for (const user of users) {

            if (user.userId == video.userId) {
                if (Id == video.userId) {
                    let [ li, option ] = createElements("li", "option")
                    option.value = video.name
                    li.classList.add("iframe")
                    li.setAttribute('data-id' , video.videoId);
                    li.innerHTML = `
                        <video src="${backendApi + video.video}" controls=""></video>
                        <div class="iframe-footer">
                            <img src="${backendApi + user.img}" alt="channel-icon">
                            <div class="iframe-footer-text">
                                <h2 class="channel-name">${user.username}</h2>
                                <h3 class="iframe-title">${video.name}</h3>
                                <time class="uploaded-time">${video.time}</time>
                                <a class="download" href="#">
                                    <span>${+video.videoSize} MB</span>
                                    <img src="./public/img/download.png">
                                </a>
                            </div>                  
                        </div>
                    `
                    videoList.append(li)
                }
                
            }
        }
        
    }
}



setInterval(() => {
    getData();
}, 1000);

