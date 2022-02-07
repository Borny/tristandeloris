export class About {
  constructor() {
    this.capsules = document.querySelectorAll('.capsule');
    this.target = document.getElementById('target');
    this.skills = document.querySelectorAll('.skill');

    this.initAbout();
  }

  initAbout() {
    window.addEventListener('load', () => {
      this.toggleExpandCapsules();
      this.animateSkills();
    });
  }

  animateSkills() {
    const triggerBottom = (window.innerHeight / 3) * 2;

    this.skills.forEach((skill, index) => {
      const svgContainer = skill.querySelector('.svg-container');
      let svgLine, path, capsule, dot;

      if (window.innerWidth <= 768) {
        // Defining the elements of each skills
        svgLine = skill.querySelector('.svg-line--mobile');
        path = svgLine.querySelector('.path');
        capsule = skill.querySelector('.capsule'); // button
        dot = skill.querySelector('.dot');

        const capsuleHeight = capsule.clientHeight;
        const svgLineWidth = svgLine.clientWidth;
        const svgLineHeight = svgLine.clientHeight;
        const dotY = dot.offsetTop + dot.clientHeight / 2;
        const dotX = dot.offsetLeft + dot.clientWidth / 2;

        svgContainer.style.width = `${svgLineWidth}px`;
        svgContainer.style.height = `${svgLineHeight}px`;

        if (index === 0) {
          svgContainer.style.top = `${dotY - svgLineHeight}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.top = `-${capsuleHeight}px`;
          capsule.style.right = `-${capsuleHeight / 2}px`;
        } else if (index === 1) {
          svgContainer.style.top = `${dotY}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.top = `${svgLineHeight}px`;
          capsule.style.right = `-${capsuleHeight / 2}px`;
        } else if (index === 2) {
          svgContainer.style.top = `${dotY - svgLineHeight}px`;
          svgContainer.style.left = `-${svgLineWidth - dotX}px`;
          capsule.style.top = `-${capsuleHeight}px`;
          capsule.style.left = `-${capsuleHeight / 2}px`;
        } else if (index === 3) {
          svgContainer.style.top = `${dotY}px`;
          svgContainer.style.left = `-${svgLineWidth - dotX}px`;
          capsule.style.bottom = `-${capsuleHeight}px`;
          capsule.style.left = `-${capsuleHeight / 2}px`;
        }
      } else {
        svgLine = skill.querySelector('.svg-line--desktop');
        path = svgLine.querySelector('.path');
        capsule = skill.querySelector('.capsule');
        dot = skill.querySelector('.dot');

        const capsuleHeight = capsule.clientHeight;
        const svgLineWidth = svgLine.clientWidth;
        const svgLineHeight = svgLine.clientHeight;
        const dotY = dot.offsetTop + dot.clientHeight / 2;
        const dotX = dot.offsetLeft + dot.clientWidth / 2;

        svgContainer.style.width = `${svgLineWidth}px`;
        svgContainer.style.height = `${svgLineHeight}px`;

        if (index === 0 || index === 1) {
          svgContainer.style.top = `${dotY - svgLineHeight}px`;
          svgContainer.style.left = `${dotX - svgLineWidth}px`;
          capsule.style.top = `-${capsuleHeight / 2}px`;
          capsule.style.right = `${svgLineWidth}px`;
        } else if (index === 2) {
          svgContainer.style.top = `${dotY - svgLineHeight}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.top = `-${capsuleHeight / 2}px`;
          capsule.style.left = `${svgLineWidth}px`;
        } else if (index === 3) {
          svgContainer.style.top = `${dotY}px`;
          svgContainer.style.left = `${dotX}px`;
          capsule.style.bottom = `-${capsuleHeight / 2}px`;
          capsule.style.left = `${svgLineWidth}px`;
        }
      }

      path.style.strokeDasharray = `${path.getTotalLength()}px`;

      // DISPLAYING THE CAPSULES
      window.addEventListener('scroll', (e) => {
        const targetTop = this.target.getBoundingClientRect().top;
        if (targetTop < triggerBottom) {
          capsule.classList.add('show');
          path.classList.add('show');
        } else {
          capsule.classList.remove('show');
          path.classList.remove('show');
          capsule.classList.remove('expand');
        }
      });
    });
  }

  toggleExpandCapsules() {
    this.capsules.forEach((capsule) => {
      const btn = capsule.querySelector('.btn-arrow');
      btn.addEventListener('click', () => {
        capsule.classList.toggle('expand');
      });
    });
  }
}
