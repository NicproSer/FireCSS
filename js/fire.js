//Fire CSS V 0.1.6
//@author: Fire de NICPRO SERVICE
//nicproservice (https://nicprodev.mgpanel.org)
//Realizado por Nicolás Gómez
//Copyright © 2022
//Licencia: MIT

//Slider

function Carousel(element) {
  this._autoDuration = 0;
  this._container = element.querySelector('.container-fluid');
  this._interval = null;
  this._nav = element.querySelector('nav');
  this._slide = 0;
  this._touchAnchorX = 0;
  this._touchTime = 0;
  this._touchX1 = 0;
  this._touchX2 = 0;
  element.addEventListener('click', this);
  element.addEventListener('touchstart', this);
  element.addEventListener('touchmove', this);
  element.addEventListener('touchend', this);
  element.addEventListener('transitionend', this);
  window.addEventListener('blur', this);
  window.addEventListener('focus', this);
  this.set(0);
}

Carousel.prototype.auto = function (ms) {
  if (this._interval) {
    clearInterval(this._interval);
    this._interval = null;
  }
  if (ms) {
    this._autoDuration = ms;
    var self = this;
    this._interval = setInterval(function () { self.next(); }, ms);
  }
}

Carousel.prototype.handleEvent = function (event) {
  if (event.touches && event.touches.length > 0) {
    this._touchTime = +new Date;
    this._touchX1 = this._touchX2;
    this._touchX2 = event.touches[0].screenX;
  }

  var screen = document.documentElement.clientWidth;
  var position = this._slide + (this._touchAnchorX - this._touchX2) / screen;
  var velocity = (new Date - this._touchTime) <= 200 ? (this._touchX1 - this._touchX2) / screen : 0;

  switch (event.type) {
    case 'blur':
      this.auto(0);
      break;
    case 'click':
      if (event.target.parentNode != this._nav) break;
      var i = parseInt(event.target.dataset.slide);
      if (!isNaN(i)) {
        event.preventDefault();
        this.auto(0);
        this.set(i);
      }
      break;
    case 'focus':
      this.auto(this._autoDuration);
      break;
    case 'touchstart':
      event.preventDefault();
      this.auto(0);
      this._container.style.transition = 'none';
      this._touchAnchorX = this._touchX1 = this._touchX2;
      break;
    case 'touchmove':
      this._container.style.transform = 'translate3d(' + (-position * 100) + 'vw, 0, 0)';
      break;
    case 'touchend':
      this._container.style.transition = '';
      var offset = Math.min(Math.max(velocity * 4, -0.5), 0.5);
      this.set(Math.round(position + offset));
      break;
    case 'transitionend':
      var i = this._slide, count = this._countSlides();
      if (i >= 0 && i < count) break;
      // The slides should wrap around. Instantly move to just outside screen on the other end.
      this._container.style.transition = 'none';
      this._container.style.transform = 'translate3d(' + (i < 0 ? -count * 100 : 100) + 'vw, 0, 0)';
      // Force changes to be applied sequentially by reflowing the element.
      this._container.offsetHeight;
      this._container.style.transition = '';
      this._container.offsetHeight;
      // Animate the first/last slide in.
      this.set(i < 0 ? count - 1 : 0);
      break;
  }
};

Carousel.prototype.next = function () {
  this.set(this._slide + 1);
};

Carousel.prototype.previous = function () {
  this.set(this._slide - 1);
};

Carousel.prototype.set = function (i) {
  var count = this._countSlides();
  if (i < 0) { i = -1; } else if (i >= count) { i = count; }
  this._slide = i;
  this._container.style.transform = 'translate3d(' + (-i * 100) + 'vw, 0, 0)';
  this._updateNav();
};

Carousel.prototype._countSlides = function () {
  return this._container.querySelectorAll('.slide').length;
};

Carousel.prototype._updateNav = function () {
  var html = '', count = this._countSlides();
  for (var i = 0; i < count; i++) {
    if (i > 0) html += '&nbsp;';
    html += '<a' +  (i == this._slide ? ' class="current"' : '') + ' data-slide="' + i + '" href="#">●</a>';
  }
  this._nav.innerHTML = html;
}

var carousels = Array.prototype.map.call(document.querySelectorAll('.carousel'), function (element) {
  var carousel = new Carousel(element);
  carousel.auto(5000);
  return carousel;
});

//Navbar


//Navbar-Sidebar Open Close JS Code


//Dropdown
function show(anything){
   document.querySelector('.textBox').value = anything;
}

let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function(){
   dropdown.classList.toggle('active');
}

//MODAL

const openEls = document.querySelectorAll('[data-open]');
const closeEls = document.querySelectorAll('[data-close]');
const isVisible = "is-visible";

for (const el of openEls) {
   el.addEventListener("click", function(){
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
   });
}

for (const el of closeEls) {
   el.addEventListener("click", function(){
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
   });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".fir-modal.is-visible")) {
    document.querySelector(".fir-modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".fir-modal.is-visible")) {
    document.querySelector(".fir-modal.is-visible").classList.remove(isVisible);
  }
});

//Temas


//Scroll Up

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp(){
   var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

   if (currentScroll > 0) {
      window.requestAnimationFrame(scrollUp);
       window.scrollTo (0, currentScroll - (currentScroll / 10));
       buttonUp.style.transform = "scale(0)";
   }
}
///
buttonUp = document.getElementById("button-up");

window.onscroll = function(){

   var scroll = document.documentElement.scrollTop;
   if (scroll > 500){
      buttonUp.style.transform = "scale(1)";
   }else if(scroll < 500){
      buttonUp.style.transform = "scale(0)";
   }
}