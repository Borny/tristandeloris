// import "regenerator-runtime/runtime";
import "./styles/main.scss";

import { Header } from "./js/header";
import { Hero } from "./js/hero";
import { Work } from "./js/work";
import { About } from "./js/about";
import { Contact } from "./js/contact";

// HEADER
const header = new Header();
header.initHeader();

// WORK
const hero = new Hero();
hero.initHero();

// WORK
const work = new Work();
work.toggleProjectPanels();

// ABOUT
const about = new About();
about.initAbout();

// CONTACT
const contact = new Contact();
contact.initForm();
