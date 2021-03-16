import railURL from "../img/pics/rail-road-down-center.jpg";
import sunsetURL from "../img/pics/hourtin-sunset.jpg";

export class Hero {
  constructor() {
    this.heroSection = document.querySelector(".hero");
    this.imgsMobile = document.querySelectorAll(".hero__bg-img--mobile");
    this.imgsDesktop = document.querySelectorAll(".hero__bg-img--desktop");
  }

  initHero() {
    let idx = 0;
    let imgs = this.imgsMobile;
    if (window.innerWidth >= 992) {
      imgs = this.imgsDesktop;
    }

    setInterval(() => {
      imgs.forEach((img) => img.classList.remove("active"));
      idx++;
      if (idx > imgs.length - 1) {
        idx = 0;
      }
      imgs[idx].classList.add("active");
    }, 4000);
  }
}
