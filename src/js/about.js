export class About {
  constructor() {
    this.capsules = document.querySelectorAll(".capsule");
    this.target = document.getElementById("target");
    this.skills = document.querySelectorAll(".skill");
  }

  initAbout() {
    this.animateSkills();
    this.toggleExpandCapsules();
  }

  animateSkills() {
    const triggerBottom = window.innerHeight / 2;

    this.skills.forEach((skill, index) => {
      const svgContainer = skill.querySelector(".svg-container");
      let svg, path, capsule, dot;

      if (window.innerWidth <= 992) {
        svg = skill.querySelector(".svg-line--mobile");
        path = svg.querySelector(".path");
        capsule = skill.querySelector(".capsule");
        dot = skill.querySelector(".dot");
      } else {
        svg = skill.querySelector(".svg-line--desktop");
        path = svg.querySelector(".path");
        capsule = skill.querySelector(".capsule");
        dot = skill.querySelector(".dot");
      }

      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;

      svgContainer.style.width = `${svgWidth}px`;
      svgContainer.style.height = `${svgHeight}px`;

      const dotY = dot.offsetTop + dot.clientHeight / 2;
      const dotX = dot.offsetLeft + dot.clientWidth / 2;

      // On mobile we change the top position of the second svg line
      if (window.innerWidth <= 992) {
        if (index === 0) {
          svgContainer.style.top = `${dotY - svgHeight}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.top = `-${capsule.clientHeight}px`;
          capsule.style.right = `-${capsule.clientHeight / 2}px`;
        } else if (index === 1) {
          svgContainer.style.top = `${dotY}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.top = `${svgHeight}px`;
          capsule.style.right = `-${capsule.clientWidth / 2}px`;
        } else if (index === 2) {
          svgContainer.style.top = `${dotY - svgHeight}px`;
          svgContainer.style.left = `-${svgWidth - dotX}px`;
          capsule.style.top = `-${capsule.clientHeight}px`;
          capsule.style.left = `-${capsule.clientWidth / 2}px`;
        } else if (index === 3) {
          svgContainer.style.top = `${dotY}px`;
          svgContainer.style.left = `-${svgWidth - dotX}px`;
          capsule.style.bottom = `-${capsule.clientHeight}px`;
          capsule.style.left = `-${capsule.clientHeight / 2}px`;
        }
      } else {
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
      }

      path.style.strokeDasharray = `${path.getTotalLength()}px`;

      window.addEventListener("scroll", (e) => {
        const targetTop = this.target.getBoundingClientRect().top;
        if (targetTop < triggerBottom) {
          capsule.classList.add("show");
          path.classList.add("show");
        } else {
          capsule.classList.remove("show");
          path.classList.remove("show");
        }
      });
    });
  }

  toggleExpandCapsules() {
    this.capsules.forEach((capsule) => {
      const btn = capsule.querySelector(".btn-arrow");
      btn.addEventListener("click", () => {
        capsule.classList.toggle("expand");
      });
    });
  }
}
