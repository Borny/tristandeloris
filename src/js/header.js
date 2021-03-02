export class Header {
  constructor() {
    this.headerTitleBtn = document.getElementById("header-title");
    this.headerSocial = document.getElementById("header-social");
  }

  initHeader() {
    this.headerTitleBtn.addEventListener("click", () => {
      this.headerSocial.classList.toggle("active");
      this.headerTitleBtn.classList.toggle("active");
    });
  }
}
