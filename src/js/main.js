// Variables
const nav = document.querySelector(".nav");
const allNavItems = document.querySelectorAll(".nav__item");
const hamburger = document.querySelector(".hamburger");
const prevBtn = document.querySelector(".gallery-button.prev");
const nextBtn = document.querySelector(".gallery-button.next");
const galleryImages = document.querySelector(".gallery-images");
const images = document.querySelectorAll(".gallery-images img");
const footerYear = document.querySelector(".footer__year");
const cards = document.querySelectorAll(".card");
const flexfunBoxes = document.querySelectorAll(".flexfun__box");

let imageIndex = 0;
let currentIndex = 1;

// Functions
const handleNavItemsAnimation = () => {
  let delayTime = 5;

  allNavItems.forEach((item) => {
    item.classList.toggle(".nav-items-animation");
    item.style.animationDelay = "." + delayTime + "s";
    delayTime++;
  });
};

const handleBoxClick = (event) => {
  const box = event.currentTarget;
  box.classList.toggle("is-scaled"); // Zakładając, że masz taką klasę CSS do obracania diva
};

const handleNav = () => {
  nav.classList.toggle("nav--active");

  allNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("nav--active");
    });
  });

  handleNavItemsAnimation();
};

const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  footerYear.innerText = year;
  console.log(".footer-year");
};

handleCurrentYear();

const changeSlide = (newIndex) => {
  galleryImages.style.transition = "transform 0.4s ease-in-out";
  galleryImages.style.transform = `translateX(-${(newIndex * 100) / 6}%)`;
};

const handleTransitionEnd = () => {
  galleryImages.removeEventListener("transitionend", handleTransitionEnd);

  if (currentIndex === 0) {
    currentIndex = images.length;
  } else if (currentIndex === images.length + 1) {
    currentIndex = 1;
  }

  galleryImages.style.transition = "none";
  galleryImages.style.transform = `translateX(-${(currentIndex * 100) / 6}%)`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      galleryImages.style.transition = "transform 0.4s ease-in-out";
    });
  });
};

const updateImageSources = () => {
  const screenWidth = window.innerWidth;
  const galleryImages = document.querySelectorAll(".gallery-images img");

  galleryImages.forEach((image) => {
    let newSrc;

    if (screenWidth >= 992) {
      newSrc = image.src.replace("-640.webp", "-1920.webp");
    } else {
      newSrc = image.src.replace("-1920.webp", "-640.webp");
    }

    image.src = newSrc;
  });
};

const handleCardClick = (event) => {
  // Tutaj logika obracania karty lub inna akcja, np.:
  const card = event.currentTarget;
  card.classList.toggle("is-flipped"); // Zakładając, że masz taką klasę CSS do obracania karty
};

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
  // Dodanie obsługi dotyku, jeśli jest potrzebna specyficzna logika dla urządzeń mobilnych
  card.addEventListener("touchend", handleCardClick);
});

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const navElementsToHide = document.querySelectorAll(".nav__element-to-hide");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    navElementsToHide.forEach((element) => {
      if (scrollTop > 200) {
        element.style.opacity = "0";
      } else {
        element.style.opacity = "1";
      }
    });
  });

  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
  });
});

hamburger.addEventListener("click", handleNav);

prevBtn.addEventListener("click", () => {
  if (currentIndex === 0) {
    galleryImages.addEventListener("transitionend", handleTransitionEnd);
    currentIndex = images.length;
  } else {
    currentIndex--;
  }
  changeSlide(currentIndex);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex === images.length + 1) {
    galleryImages.addEventListener("transitionend", handleTransitionEnd);
    currentIndex = 1;
  } else {
    currentIndex++;
  }
  changeSlide(currentIndex);
});

// Initialize
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

firstClone.id = "firstClone";
lastClone.id = "lastClone";

galleryImages.append(firstClone);
galleryImages.prepend(lastClone);

galleryImages.style.transform = `translateX(-${(currentIndex + 1) * 100}vw)`;

window.addEventListener("resize", updateImageSources);
updateImageSources();

flexfunBoxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
  // Zastąpienie touchend przez touchstart
  box.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Zapobieganie potencjalnemu podwójnemu wywołaniu z click
    handleBoxClick(event);
  });
});
