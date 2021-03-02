// import "regenerator-runtime/runtime";
import "./styles/main.scss";

import { Header } from "./js/header";
import { Contact } from "./js/contact";

// HEADER
const header = new Header();
header.initHeader();

// CONTACT

const contact = new Contact();
contact.initForm();
