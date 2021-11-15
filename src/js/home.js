import { Header } from './header';
import { Hero } from './hero';
import { Work } from './work';
import { About } from './about';
import { Contact } from './contact';

// HEADER
const header = new Header();
header.initHeader();

// HERO
const hero = new Hero();
hero.initHero();
// hero.toggleText()

// WORK
const work = new Work();
work.toggleProjectPanels();

// ABOUT
const about = new About();
console.log('home js');
about.initAbout();

// CONTACT
const contact = new Contact();
contact.initForm();
