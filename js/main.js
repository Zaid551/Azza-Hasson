/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
  navToggle.addEventListener('click', ()=> 
    navMenu.classList.add("show_menu"))
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
  navClose.addEventListener('click', ()=> 
    navMenu.classList.remove("show_menu"))
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*==================== About Counter ====================*/
const aboutSection = document.querySelector("#about"),
      nums = document.querySelectorAll(".about__info .num");
let started = false; // function started? No

  window.onscroll = function (){
    if(window.scrollY >= aboutSection.offsetTop){
      if(!started){
        nums.forEach((num) => startCount(num));
      }
      started = true;
    }
  };
  function startCount(el){
    let goal = el.dataset.goal;
    let count = setInterval(()=>{
      el.textContent++;
      if(el.textContent == goal){
        clearInterval(count);
      }
    }, 2000 / goal);
}
/*==================== ACCORDION SKILLS ====================*/
const showDropdown = (content, button) =>{
  const dropdownContent = document.getElementById(content),
        dropdownButton = document.getElementById(button),
        spans = document.querySelectorAll(".skills__bar span");

  dropdownButton.addEventListener('click', () =>{
     // We add the show-dropdown class, so that the menu is displayed
     dropdownContent.classList.toggle('show-dropdown');
     spans.forEach((span) => {
      span.style.width = span.dataset.width;
    })
  })
}
showDropdown('dropdown-content','dropdown-button');
/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
  tab.addEventListener('click', () =>{
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')

    tabs.forEach(tab =>{
      tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')
  })
})


/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function( modalClick){
  modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i)=>{
  modalBtn.addEventListener('click',()=>{
    modal(i);
  })
})

modalCloses.forEach((modalClose, i )=>{
  modalClose.addEventListener('click',()=>{
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal');
    })
  })
})
/*==================== PORTFOLIO SWIPER  ====================*/

// Load JSON data using AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', 'portfolio.json', true);
xhr.onload = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    // Use the data to populate Swiper slides
    var swiper = new Swiper('.portfolio__container', {
      // Set Swiper options
      cssMode: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      },
      on: {
        init: function () {
          var swiperWrapper = document.querySelector(".swiper-wrapper");
          data.forEach(function (item, books) {
            var swiperSlide = document.createElement('div');
            swiperSlide.className = 'portfolio__content grid swiper-slide';
            swiperSlide.innerHTML = `
            <img src=" ${item.image}" alt= "${item.title}" class="portfolio__img">
            <div class="portfolio__data">
              <h3 class="book_title"> ${item.title}</h3>
              <p class="book_author"><strong>Author:</strong> ${item.author}</p>
              <p class="book_publisher"><strong>Publisher:</strong> ${item.publisher}</p>
              <p class="book_year"><strong>Year:</strong> ${item.year}</p>
              <p class="book_role"><strong>Role:</strong> ${item.role}</p>
              <p class="book_description"><strong>Description:</strong> ${item.description} </p>
            </div>`;
            swiperWrapper.appendChild(swiperSlide);
          });
        },
      },
    });
    swiper.slideTo(0);   // Navigates to the First slide
    swiper.update();     // Updates the Swiper instance
    var activeSlide = swiper.slides[swiper.activeIndex]; 
  }
};

xhr.send();
/*==================== Articles ====================*/
async function loadArticles() {
  const response = await fetch('articles.json');
  const articles = await response.json();
  const container = document.getElementById('articles-container');

  articles.forEach(article => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
      <div class="article-card simple">
        <div class="article-date">${article.date}</div>
        <div class="article-content">
          <h3 class="article-title">${article.title}</h3>
          <p class="article-source"><strong>${article.source}</strong></p>
          <p class="article-issue">${article.issue}</p>
        </div>
      </div>`
    ;
    container.appendChild(slide);
  });

  new Swiper(".articlesSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next2",
      prevEl: ".swiper-button-prev2",
    },
    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 }
    }
  });
}

loadArticles();

/*==================== Contact Send Message ====================*/
  // ربط الفورم مع EmailJS
  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_h2oygx8", "template_7qdn4xl", templateParams)
      .then(() => {
        alert("Email Sent Successfully!");
        document.getElementById("contact-form").reset(); // تفريغ الفورم
      })
      .catch((error) => {
        console.error("Error Sending Email:", error);
        alert("Failed to Send Email. Please Try Again.");
      });
  });
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
  const nav = document.getElementById('header')
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})