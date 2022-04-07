let videoInput = document.querySelector('#videoInput')
let uploadInput = document.querySelector('#uploadInput')
let List = document.querySelector('#list')
let videos = null




submitButton.onclick = (event) => {
    event.preventDefault();
    let name = videoInput.value.trim()
    let video = uploadInput.files[0]

    const formData = new FormData()
	formData.append('name', name)
	formData.append('video', video)

    let response = request("/admin", "POST", formData)
}


async function renderData() {
    let response = await fetch(backendApi + "/admin", {
        headers: {token: window.localStorage.getItem('token')}
    })
    response = await response.json()
    videos = response.result

    render(videos)
}

function render(videos) {

    if(render.videos?.length == videos?.length) {
		if(JSON.stringify(render.videos) == JSON.stringify(videos)) {
			return
		}
	}
    render.videos = videos

    videosList = ""
    for (const video of videos) {
        let [ li ] = createElements("li")
        li.classList.add("video-item")
        li.innerHTML = `
            <video src="${backendApi + video.video}" controls=""></video>
                <p class="content" onblur="etidName(this)" onkeyup=13 data-id="${video.videoId}" contenteditable="true">${video.name}</p>
            <img src="./public//img/delete.png" width="25px" alt="upload" class="delete-icon" onclick="deleteVideo(this)" data-id="${video.videoId}">
            `
        List.append(li)
    }
}



async function deleteVideo(param) {
    console.log(param.dataset.id);
    let videoId = param.dataset.id

    const formData = new FormData()
	formData.append('videoId', videoId)

    let response = await request("/admin", "DELETE", formData)
    console.log(response?.result?.newVideos);
    render(response?.result?.newVideos)
    
}


async function etidName(video) {
    let videoId = video.dataset.id
    let caption = video.innerText.trim()

    const formData = new FormData()
	formData.append('videoId', videoId)
	formData.append('caption', caption)

    let response = await request("/admin", "PUT", formData)

}



setInterval(() => {
    renderData()
}, 500);

