export class About {
  constructor() {
    this.capsules = document.querySelectorAll(".capsule");

    this.target = document.getElementById("target");

    this.dots = document.querySelectorAll(".dot");

    this.skills = document.querySelectorAll(".skill");

    this.dotOne = document.querySelector(".dot-one");
    this.svgContainerOne = document.querySelector(".svg-container-one");
    this.svgOne = document.querySelector(".svg-line-one");

    this.path = document.querySelector(".svg-line-one path");
  }

  initAbout() {
    this.animateSkills();
    this.toggleExpandCapsules();
  }

  animateSkills() {
    const triggerBottom = window.innerHeight / 2;

    window.addEventListener("scroll", (e) => {
      const targetTop = this.target.getBoundingClientRect().top;

      this.skills.forEach((skill, index) => {
        const dot = skill.querySelector(".dot");
        const svgContainer = skill.querySelector(".svg-container");
        const svg = skill.querySelector(".svg-line");
        const capsule = skill.querySelector(".capsule");
        const path = skill.querySelector(".path");

        const svgWidth = svg.clientWidth;
        const svgHeight = svg.clientHeight;

        svgContainer.style.width = `${svgWidth}px`;
        svgContainer.style.height = `${svgHeight}px`;

        const dotY = dot.offsetTop + dot.clientHeight / 2;
        const dotX = dot.offsetLeft + dot.clientWidth / 2;

        if (index === 0 || index === 1) {
          svgContainer.style.top = `${dotY - svgHeight}px`;
          svgContainer.style.left = `${dotX - svgWidth}px`;
          capsule.style.top = `-${capsule.clientHeight / 2}px`;
          capsule.style.right = `${svgWidth}px`;
        } else if (index === 2) {
          svgContainer.style.top = `${dotY - svgHeight}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.top = `-${capsule.clientHeight / 2}px`;
          capsule.style.left = `${svgWidth}px`;
        } else if (index === 3) {
          svgContainer.style.top = `${dotY}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.bottom = `-${capsule.clientHeight / 2}px`;
          capsule.style.left = `${svgWidth}px`;
        }

        path.style.strokeDasharray = `${path.getTotalLength()}px`;

        if (targetTop < triggerBottom) {
          capsule.classList.add("show");
          path.classList.add("show");
        } else {
          capsule.classList.remove("show");
          capsule.classList.remove("expand");
          path.classList.remove("show");
        }
      });
    });
  }

  toggleExpandCapsules() {
    this.capsules.forEach((capsule) => {
      capsule.addEventListener("click", () => {
        capsule.classList.toggle("expand");
      });
    });
  }
}
