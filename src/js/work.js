export class Work {
  constructor() {
    this.projects = document.querySelectorAll(".project");
  }

  toggleProjectPanels() {
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
