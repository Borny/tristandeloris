export class Header {
  constructor() {
    this.headerTitleBtn = document.getElementById("header-title");
    this.headerSocial = document.getElementById("header-social");
    this.headerTitleBackdrop = document.getElementById("header-title-backdrop");
    this.headerNavBackdrop = document.getElementById("header-nav-backdrop");
    this.navBtn = document.getElementById("nav-btn");
    this.navBtnIcons = this.navBtn.querySelectorAll(".icon");
    this.navList = document.getElementById("nav-list");
  }

  initHeader() {
    this.headerTitleBtn.addEventListener("click", () => {
      this.toggleHeaderTitle();
    });

    this.headerTitleBackdrop.addEventListener("click", () => {
      this.toggleHeaderTitle();
    });

    this.headerNavBackdrop.addEventListener("click", () => {
      this.toggleNav();
    });

    this.navBtn.addEventListener("click", () => {
      this.toggleNav();
    });
  }

  toggleHeaderTitle() {
    this.headerSocial.classList.toggle("active");
    this.headerSocial.classList.contains("active")
      ? this.headerSocial.classList.remove("iddle")
      : this.headerSocial.classList.add("iddle");
    this.headerTitleBtn.classList.toggle("active");
    this.headerTitleBackdrop.classList.toggle("active");
  }

  toggleNav() {
    this.navBtnIcons.forEach((icon) => icon.classList.toggle("active"));
    this.navList.classList.toggle("active");
    this.headerNavBackdrop.classList.contains("active")
      ? this.headerNavBackdrop.classList.remove("active")
      : this.headerNavBackdrop.classList.add("active");
  }
}
