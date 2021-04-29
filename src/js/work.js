export class Work {
  constructor() {
    this.projects = document.querySelectorAll(".project");
  }

  toggleProjectPanels() {
    if (window.innerWidth >= 992) {
      this.projects[0].classList.add("active");
    }

    this.projects.forEach((project) => {
      project.addEventListener("click", () => {
        this.projects.forEach((proj) => {
          proj.classList.remove("active");
        });
        project.classList.add("active");
      });
    });
  }
}
