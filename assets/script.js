const copyright = document.getElementById('copyright'),
  menu = document.querySelector('.nav__list'),
  hamburger = document.getElementById('hamburger'),
  close = document.getElementById('close'),
  navItems = document.querySelectorAll('.nav__item'),
  navLinks = document.querySelectorAll('.nav__item a'),
  scrollBtn = document.querySelector('.top'),
  rootEl = document.documentElement,
  next = document.querySelector('.next'),
  prev = document.querySelector('.prev'),
  slides = document.querySelectorAll('.slide'),
  scrollIndicator = document.querySelector('.scroll__indicator'),
  progressBar = document.querySelector('.progress')

// header on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header')
  header.classList.toggle('sticky', window.scrollY > 200)
  if (window.scrollY > 250) {
    scrollIndicator.style.top = '90px'
  } else {
    scrollIndicator.style.top = '0px'
  }
  scrollProgress()
})

// Scroll progress
function scrollProgress() {
  const currentState = document.body.scrollTop || document.documentElement.scrollTop

  const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

  const scrollPercentage = Math.round((currentState / pageHeight) * 100)
  
  progressBar.style.width = scrollPercentage + '%'
}

// current year
copyright.appendChild(document.createTextNode(new Date().getFullYear()))

// responsive nav
const showMenu = () => {
  hamburger.style.display = 'none'
  close.style.display = 'block'
  menu.style.left = '-32px'
}

const hideMenu = () => {
  hamburger.style.display = 'block'
  close.style.display = 'none'
  menu.style.left = '-200%'
}

hamburger.addEventListener('click', showMenu)
close.addEventListener('click', hideMenu)
navLinks.forEach((link) => {
  link.addEventListener('click', hideMenu)
})

// Scmooth scroll with JS
navLinks.forEach((link) => {
  link.addEventListener('click', smoothScroll)
})

function smoothScroll(e) {
  e.preventDefault()
  const href = this.getAttribute('href')
  document.querySelector(href).scrollIntoView({
    behavior: 'smooth',
  })
}

// Active Links on Scroll
const sectionAll = document.querySelectorAll('section[id]')
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset
  sectionAll.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('li a[href*="' + sectionId + '"]')
        .classList.add('active')
    } else {
      document
        .querySelector('li a[href*="' + sectionId + '"]')
        .classList.remove('active')
    }
  })
})

// Testimonials Section
let index = 0

next.addEventListener('click', nextSlide)
prev.addEventListener('click', nextSlide)
display(index)

function display(index) {
  slides.forEach((slide) => {
    slide.style.display = 'none'
  })
  slides[index].style.display = 'flex'
}

function nextSlide() {
  index++
  if (index > slides.length - 1) {
    index = 0
  }
  display(index)
}

function prevSlide() {
  index--
  if (index < 0) {
    index = slides.length - 1
  }
  display(index)
}

// Scroll to top
document.addEventListener('scroll', showBtn)
scrollBtn.addEventListener('click', scrollToTop)

function showBtn() {
  const scrollTotal = rootEl.scrollHeight - rootEl.clientHeight
  if (rootEl.scrollTop / scrollTotal > 0.5) {
    scrollBtn.classList.add('show-btn')
  } else {
    scrollBtn.classList.remove('show-btn')
  }
}

function scrollToTop() {
  rootEl.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
