export class Header {
  constructor() {
    this.headerTitleBtn = document.getElementById("header-title");
    this.headerSocial = document.getElementById("header-social");
    this.headerBackdrop = document.getElementById("header-backdrop");
  }

  initHeader() {
    this.headerTitleBtn.addEventListener("click", () => {
      this.toggleHeaderTitle();
    });

    this.headerBackdrop.addEventListener("click", () => {
      this.toggleHeaderTitle();
    });
  }

  toggleHeaderTitle() {
    this.headerSocial.classList.toggle("active");
    this.headerSocial.classList.contains("active")
      ? this.headerSocial.classList.remove("iddle")
      : this.headerSocial.classList.add("iddle");
    this.headerTitleBtn.classList.toggle("active");
    this.headerBackdrop.classList.toggle("active");
  }
}
