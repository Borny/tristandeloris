export class Travel {
  constructor() {
    this.travel = document.getElementById('travel');
    this.loader = document.getElementById('loader');
    this.carousel = document.getElementById('carousel');
    this.imgContainer = document.getElementById('images-container');
    this.imgs = document.querySelectorAll('.img__container');
    this.btnLeft = document.getElementById('btn-carousel-left');
    this.btnRight = document.getElementById('btn-carousel-right');
    this.carouselWidth;
    this.index = 3;
    this.carouselTransform = 0;

    this.initTravel();
  }

  getImgContainerLength() {
    // console.log(this.imgs.length);
    // console.log(this.imgs[0].offsetWidth);
    // console.log(this.carouselWidth / 3);
    // console.log((this.carouselWidth / 3) * this.imgs.length);

    return (this.imgContainer.style.width = `${
      (this.carouselWidth / 3) * this.imgs.length
    }px`);
  }

  initTravel() {
    window.addEventListener('load', () => {
      // setTimeout(() => {
      this.loader.classList.add('hidden');
      // }, 2000);
      this.travel.classList.remove('hidden');

      // TODO: get the albums from the backend : one array with the snapshots then on opening the modal the album selected
      if (this.index === 3) {
        this.btnLeft.setAttribute('disabled', true);
      }
      this.carouselWidth = this.carousel.offsetWidth;
      this.getImgContainerLength();
      this.onPrevious();
      this.onNext();
    });
    // console.log(this.imgs.length);
  }

  updateBtns() {
    if (this.index <= 3) {
      this.btnLeft.setAttribute('disabled', true);
      this.btnRight.removeAttribute('disabled');
    } else if (this.index >= this.imgs.length) {
      this.btnLeft.removeAttribute('disabled');
      this.btnRight.setAttribute('disabled', true);
    } else {
      this.btnRight.removeAttribute('disabled');
      this.btnLeft.removeAttribute('disabled');
    }
  }

  onPrevious() {
    console.log('on previous');
    this.btnLeft.addEventListener('click', () => {
      this.index--;
      this.updateBtns();

      console.log(this.carouselTransform - this.carouselWidth / 3);

      this.imgContainer.style.transform = `translateX(${
        this.carouselTransform + this.carouselWidth / 3
      }px)`;

      console.log(this.imgContainer.style.transform);

      this.carouselTransform = this.carouselTransform + this.carouselWidth / 3;
      console.log('this.carouselTransform', this.carouselTransform);
    });
  }

  onNext() {
    console.log('on next');
    this.btnRight.addEventListener('click', () => {
      this.imgContainer.style.transform = `translateX(${
        this.carouselTransform - this.carouselWidth / 3
      }px)`;
      this.index++;
      this.updateBtns();

      // console.log(this.carouselTransform - this.carouselWidth / 3);

      console.log(this.imgContainer.style.transform);

      this.carouselTransform = this.carouselTransform - this.carouselWidth / 3;
      //   console.log('this.carouselTransform', this.carouselTransform);
    });
  }
}

new Travel();
