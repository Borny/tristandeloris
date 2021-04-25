import { setStore, getItem, getAllKeys, deleteItem, clearStore, dataURItoBlob } from '../js/utility'

const URL = 'http://localhost:9000/api/feed'
const body = document.getElementsByTagName('body')[0]
const postList = document.getElementById('post-list')
const addPostBtn = document.getElementById('add-post')
const modalBackdrop = document.getElementById('modal-backdrop')
const modal = document.getElementById('feed-modal')
const btnCloseModal = document.getElementById('close-modal-btn')
const createForm = document.getElementById('create-form')
const titleInput = document.getElementById('title')
const srcInput = document.getElementById('src')
const videoPlayer = document.getElementById('player')
const canvas = document.getElementById('canvas')
const loadingCamera = document.getElementById('loading-camera')
const btnCapture = document.getElementById('capture-btn')
const imagePicker = document.getElementById('pick-image')
const btnLocation = document.getElementById('location-btn')
const loaderLocation = document.getElementById('location-loader')
const btnPickImage = document.getElementById('image-picker')
const switchCameraBtn = document.getElementById('switch-camera-btn')
const STORE_POSTS = 'posts'
const STORE_SYNC = 'sync-posts'
const SYNC_REGISTER_NEW_POSTS = 'sync-new-posts'
let fetchedLocation

let networkDataReceived = false

const frontCamera = { facingMode: "user" }
const rearCamera = { facingMode: { exact: "environment" } }

let activeCamera = rearCamera
let shouldFaceUser = true
let picture


btnLocation.addEventListener('click', () => {
    btnLocation.style.display = 'none'
    loaderLocation.style.display = 'block'

    if (!('geolocation' in navigator)) {
        return
    }

    function geoSuccess(position) {
        console.log('geo success')
        btnLocation.style = 'block'
        loaderLocation.style = 'none'
        fetchedLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
        console.log(fetchedLocation)
    }

    function geoError() {
        console.log('geo error')
        btnLocation.style = 'block'
        loaderLocation.style = 'none'
        alert(`Counldn't fetch the location...`)
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
})


const getPosts = async () => {
    try {
        const response = await fetch(URL)
        const posts = await response.json()

        const data = posts.data
        clearCards()
        data.forEach((item) => {
            createCard(item, 'fetch')
        })
        networkDataReceived = true
    } catch (error) {
        console.log('could not fetch images')
        fetchError = true
    }

}

getPosts()

const initializeLocation = () => {
    if (!('geolocation' in navigator)) {
        btnLocation.style.display = 'none'
    }
}

const intializeMedia = () => {

    if (!('mediaDevices' in navigator)) {
        console.log('no media devices')
        navigator.mediaDevices = {}
    }

    if (!('getUserMedia' in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
            const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

            if (!getUserMedia) {
                return Promise.reject(new Error('Get user media is not implemented'))
            }
            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject)
            })
        }
    }

    getUserMedia()

}

const getUserMedia = () => {

    loadingCamera.style.display = 'block'
    videoPlayer.style.display = 'none'

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: shouldFaceUser ? 'user' : 'environment'
        }
    })
        .then(stream => {
            if (shouldFaceUser) {
                videoPlayer.classList.add('inverse')
                canvas.classList.add('inverse')
            } else {
                videoPlayer.classList.remove('inverse')
                canvas.classList.remove('inverse')
            }
            videoPlayer.srcObject = stream
            loadingCamera.style.display = 'none'
            videoPlayer.style.display = 'block'
        })
        .catch(error => {
            console.log('error video:', error)
            loadingCamera.style.display = 'none'
            imagePicker.style.display = 'block'
        })
}

// Switch camera
switchCameraBtn.addEventListener('click', () => {
    console.log('click')
    // activeCamera = activeCamera === frontCamera ? rearCamera : frontCamera
    shouldFaceUser = !shouldFaceUser
    stopVideoStream()
    getUserMedia()
})

// Capture
btnCapture.addEventListener('click', () => {
    canvas.style.display = 'block'
    videoPlayer.style.display = 'none'
    btnCapture.style.display = 'none'
    const context = canvas.getContext('2d')
    console.log(canvas.clientWidth, videoPlayer.videoHeight, canvas.width)
    context.drawImage(videoPlayer, 0, 0, canvas.clientWidth, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width))

    picture = dataURItoBlob(canvas.toDataURL())
})

const stopVideoStream = () => {
    if (videoPlayer.srcObject) {
        videoPlayer.srcObject.getVideoTracks().forEach(track => track.stop())
    }
}

if ('indexedDB' in window) {
    // console.log('indexedDB in window')

    if (!networkDataReceived) {
        console.log('[Feed JS] : indexeddb')
        getAllKeys(STORE_POSTS)
            .then(keys => {
                clearCards()
                keys.forEach((key) => {
                    getItem(key, STORE_POSTS).then(item => {
                        createCard(item, 'indexeddb')
                    })
                })
            })
    }
}

const clearCards = () => {
    while (postList.hasChildNodes()) {
        postList.removeChild(postList.lastChild)
    }
}

const createCard = (item, caller) => {
    console.log('[Feed JS]: update UI', caller)
    const { _id, src, title, image } = item

    const post = document.createElement('li')
    post.setAttribute('id', _id)
    post.classList.add('post__item')
    post.innerHTML = `
    <img src="${image}" alt="${title}" class="post__img"/>
        <p class="post__title">${title}</p>
        <button class="btn post__delete-btn">Delete</button>
        `
    postList.appendChild(post)

    let btn = post.querySelector('.post__delete-btn')
    btn.addEventListener('click', () => {
        deletePost(post, item, _id)
    })
}

addPostBtn.addEventListener('click', () => {
    intializeMedia()
    initializeLocation()
    modalBackdrop.classList.add('visible')
    modal.classList.add('visible')
    body.classList.add('modal--open')
})

btnCloseModal.addEventListener('click', () => {
    closeModal()
})

function closeModal() {
    videoPlayer.style.display = 'none'
    imagePicker.style.display = 'none'
    canvas.style.display = 'none'
    loadingCamera.style.display = 'none'
    btnCapture.style.display = 'block'
    // console.log('closing modal', videoPlayer.srcObject.getVideoTracks())
    stopVideoStream()
    videoPlayer.classList.remove('inverse')
    canvas.classList.remove('inverse')
    body.classList.remove('modal--open')

    setTimeout(() => {
        modalBackdrop.classList.remove('visible')
        modal.classList.remove('visible')
    }, 1)
}

const deletePost = async (post, item, postId) => {
    try {
        const postDeleted = await fetch(`${URL}/${postId}`,
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        postList.removeChild(post)
        deleteItem(STORE_POSTS, item.title)
    } catch (error) {
        console.log('delete error', error)
    }
}

createForm.addEventListener('submit', (event) => submitForm(event))

const submitForm = (event) => {
    event.preventDefault()

    if (titleInput.value.trim() === '' || srcInput.value.trim() === '') {
        alert('Please enter valid data!')
        return
    }

    const formData = {
        title: titleInput.value.trim(),
        // src: srcInput.value.trim()
        picture: picture
    }

    closeModal()

    // console.log(formData)
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready
            .then((sw) => {
                clearStore(STORE_SYNC)

                console.log('formData', formData)

                setStore(formData.title, formData, STORE_SYNC)
                    .then(() => {
                        return sw.sync.register(SYNC_REGISTER_NEW_POSTS)
                    })
                    .then(() => {
                        alert('the post was saved for sync')
                    })
            })
            .catch(error => { console.log('set store sync error:', error) })
    } else {
        console.log('no service worker or sync manager')
        const res = sendData(formData)
        if (res.status === 201) {
            console.log('res status 201')

            createCard(formData)
        } else {
            throw new Error("Something went wrong")
        }
    }

}

function sendData(data) {
    return fetch(
        "http://localhost:9000/api/feed",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        }
    )
}