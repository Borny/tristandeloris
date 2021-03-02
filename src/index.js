// import "regenerator-runtime/runtime";
import "./styles/main.scss";

import { Header } from "./js/header";
import { About } from "./js/about";
import { Contact } from "./js/contact";

// HEADER
const header = new Header();
header.initHeader();

// ABOUT
const about = new About();
about.initAbout();

// CONTACT
const contact = new Contact();
contact.initForm();
