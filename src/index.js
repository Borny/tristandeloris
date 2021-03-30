// import "regenerator-runtime/runtime";
import "./styles/main.scss"

import { Header } from "./js/header"
import { Hero } from "./js/hero"
import { Work } from "./js/work"
import { About } from "./js/about"
import { Contact } from "./js/contact"

// HEADER
const header = new Header()
header.initHeader()

// WORK
const hero = new Hero()
hero.initHero()

// WORK
const work = new Work()
work.toggleProjectPanels()

// ABOUT
const about = new About()
about.initAbout()

// CONTACT
const contact = new Contact()
contact.initForm()

let deferredPrompt
const installBtn = document.getElementById('install-app')

// SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered!')
    })
}

// // DEFERRING THE INSTALLATION
// console.log('test')
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired')
    event.preventDefault()
    deferredPrompt = event
    return false
})

// INSTALL THE APP
installBtn.addEventListener('click', () => {
    console.log('install the app')
    if (deferredPrompt) {
        deferredPrompt.prompt()

        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome)

            if (choiceResult.outcome === 'dismissed') {
                console.log('User canceled installation')
            } else {
                console.log('User added to home screen')
            }
        })

        deferredPrompt = null
    }
})