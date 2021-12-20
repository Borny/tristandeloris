export class Hero {
  constructor() {
    this.heroSection = document.querySelector('.hero');
    this.imgsMobile = document.querySelectorAll('.hero__bg-img--mobile');
    this.imgsDesktop = document.querySelectorAll('.hero__bg-img--desktop');
    // this.hideableElements = document.querySelectorAll(".hideable")
    // this.toggleTextBtn = document.getElementById("text-action")
    this.imgTransition = 5000;

    this.initHero();
  }

  initHero() {
    let idx = 0;
    let imgs = this.imgsMobile;
    if (window.innerWidth >= 992) {
      imgs = this.imgsDesktop;
    }

    setInterval(() => {
      imgs.forEach((img) => img.classList.remove('active'));
      idx++;
      if (idx > imgs.length - 1) {
        idx = 0;
      }
      imgs[idx].classList.add('active');
    }, this.imgTransition);
  }

  // toggleText() {
  //   this.toggleTextBtn.addEventListener('click', () => {
  //     this.toggleTextBtn.classList.toggle('masked')
  //     this.hideableElements.forEach(element => element.classList.toggle('hide'))
  //   })
  // }
}
