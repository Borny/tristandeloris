import railURL from "../img/pics/rail-road-down-center.jpg";
import sunsetURL from "../img/pics/hourtin-sunset.jpg";

export class Hero {
  constructor() {
    this.heroSection = document.querySelector(".hero");
  }

  initHero() {
    // console.log(imageURL);
    const railImg = "rail-road-down.jpg";
    const sunsetImg = "/img/pics/hourtin-sunset.jpg";
    let idx = 0;
    const imgs = [
      railURL,
      sunsetURL,
      //   "https://images.unsplash.com/photo-1536744052983-bcf122437f48?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      //   "https://images.unsplash.com/photo-1531743672295-bbd901790069?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    ];

    this.heroSection.style.backgroundImage = `url('${imgs[idx]}')`;
    setInterval(() => {
      console.log(idx);
      this.heroSection.style.backgroundImage = `url('${imgs[idx]}')`;
      idx++;
      if (idx > imgs.length - 1) {
        idx = 0;
      }
    }, 4000);
  }
}
