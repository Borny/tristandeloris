new class{getImgContainerLength(){return this.imgContainer.style.width=this.carouselWidth/3*this.imgs.length+"px"}initTravel(){window.addEventListener("load",(()=>{3===this.index&&this.btnLeft.setAttribute("disabled",!0),this.carouselWidth=this.carousel.offsetWidth,this.getImgContainerLength(),this.onPrevious(),this.onNext()}))}updateBtns(){this.index<=3?(this.btnLeft.setAttribute("disabled",!0),this.btnRight.removeAttribute("disabled")):this.index>=this.imgs.length?(this.btnLeft.removeAttribute("disabled"),this.btnRight.setAttribute("disabled",!0)):(this.btnRight.removeAttribute("disabled"),this.btnLeft.removeAttribute("disabled"))}onPrevious(){this.btnLeft.addEventListener("click",(()=>{this.index--,this.updateBtns(),console.log(this.carouselTransform-this.carouselWidth/3),this.imgContainer.style.transform=`translateX(${this.carouselTransform+this.carouselWidth/3}px)`,console.log(this.imgContainer.style.transform),this.carouselTransform=this.carouselTransform+this.carouselWidth/3,console.log("this.carouselTransform",this.carouselTransform)}))}onNext(){this.btnRight.addEventListener("click",(()=>{this.index++,this.updateBtns(),this.imgContainer.style.transform=`translateX(${this.carouselTransform-this.carouselWidth/3}px)`,console.log(this.imgContainer.style.transform),this.carouselTransform=this.carouselTransform-this.carouselWidth/3}))}constructor(){this.carousel=document.getElementById("carousel"),this.imgContainer=document.getElementById("images-container"),this.imgs=document.querySelectorAll(".img__container"),this.btnLeft=document.getElementById("btn-carousel-left"),this.btnRight=document.getElementById("btn-carousel-right"),this.carouselWidth,this.index=3,this.carouselTransform=0,this.initTravel()}};