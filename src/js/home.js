import "../styles/main.scss"

import { Hero } from "./hero"
import { Work } from "./work"
import { About } from "./about"
import { Contact } from "./contact"

// HERO
const hero = new Hero()
hero.initHero()
// hero.toggleText()

// WORK
const work = new Work()
work.toggleProjectPanels()

// ABOUT
const about = new About()
about.initAbout()

// CONTACT
const contact = new Contact()
contact.initForm()
