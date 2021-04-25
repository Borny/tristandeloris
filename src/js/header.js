export class Header {
  constructor() {
    this.headerTitleBtn = document.getElementById("header-title")
    this.headerTitleArrow = document.getElementsByClassName("header__title__arrow")[0]
    this.headerSocial = document.getElementById("header-social")
    this.headerTitleBackdrop = document.getElementById("header-title-backdrop")
    this.headerNavBackdrop = document.getElementById("header-nav-backdrop")
    // this.togglenavBtn = document.getElementById("toggle-nav-btn")
    this.navBtn = document.getElementById("nav-btn")
    // this.navBtnIcons = this.navBtn.querySelectorAll(".icon")
    this.navList = document.getElementById("nav-list")
    this.navItems = this.navList.querySelectorAll('.main-navigation__item')
    this.URL = 'http://localhost:9000/api/feed'
  }

  initHeader() {
    this.headerTitleBtn.addEventListener("click", () => {
      this.toggleHeaderTitle()
    })

    this.headerTitleBackdrop.addEventListener("click", () => {
      this.toggleHeaderTitle()
    })

    this.headerNavBackdrop.addEventListener("click", () => {
      this.toggleNav()
    })

    this.navBtn.addEventListener("click", () => {
      this.toggleNav()
    })

    this.navItems.forEach(item =>
      item.addEventListener('click', () => this.toggleNav()))
  }

  toggleHeaderTitle() {
    this.headerSocial.classList.toggle("active")
    this.headerSocial.classList.contains("active")
      ? this.headerSocial.classList.remove("iddle")
      : this.headerSocial.classList.add("iddle")
    this.headerTitleBtn.classList.toggle("active")
    this.headerTitleBackdrop.classList.toggle("active")
  }

  toggleNav() {
    this.navBtn.classList.toggle('open')
    this.navList.classList.toggle("active")
    this.headerNavBackdrop.classList.contains("active")
      ? this.headerNavBackdrop.classList.remove("active")
      : this.headerNavBackdrop.classList.add("active")
  }

}
