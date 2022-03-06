export class Header {
  constructor() {
    this.body = document.getElementById('body');
    this.header = document.getElementById('header');
    this.headerTitleBtn = document.getElementById('header-title');
    this.headerTitleArrow = document.getElementsByClassName(
      'header__title__arrow'
    )[0];
    this.headerSocial = document.getElementById('header-social');
    this.headerTitleBackdrop = document.getElementById('header-title-backdrop');
    this.headerNavBackdrop = document.getElementById('header-nav-backdrop');
    this.navBtn = document.getElementById('nav-btn');
    this.navList = document.getElementById('nav-list');
    this.navItems = this.navList.querySelectorAll('.main-navigation__item');
    this.URL = 'http://localhost:9000/api/feed';

    this.initHeader();
  }

  initHeader() {
    window.addEventListener('load', () => {
      this.header.classList.remove('hidden');
    });

    this.headerTitleBtn.addEventListener('click', () => {
      this.toggleHeaderTitle();
    });

    this.headerTitleBackdrop.addEventListener('click', () => {
      this.toggleHeaderTitle();
    });

    this.headerNavBackdrop.addEventListener('click', () => {
      this.toggleNav();
    });

    this.navBtn.addEventListener('click', () => {
      this.toggleNav();
    });

    this.navItems.forEach((item) =>
      item.addEventListener('click', () => this.toggleNav())
    );
  }

  toggleHeaderTitle() {
    this.headerSocial.classList.toggle('active');
    this.headerSocial.classList.contains('active')
      ? this.headerSocial.classList.remove('iddle')
      : this.headerSocial.classList.add('iddle');
    this.headerTitleBtn.classList.toggle('active');
    this.headerTitleBackdrop.classList.toggle('active');
  }

  toggleNav() {
    this.body.classList.toggle('overflow--hidden');
    this.navBtn.classList.toggle('open');
    this.navList.classList.toggle('active');
    this.headerNavBackdrop.classList.contains('active')
      ? this.headerNavBackdrop.classList.remove('active')
      : this.headerNavBackdrop.classList.add('active');

    // Close the header title if open
    this.headerTitleBtn.classList.remove('active');
    this.headerTitleBackdrop.classList.remove('active');
    this.headerSocial.classList.remove('active');
  }
}
