// const slides = document.querySelector(".analyses__slider-list");
// const slideCount = document.querySelectorAll(".analyses__slider-item").length;
// const prevButton = document.querySelector(".analyses__arrow-prev-button");
// const nextButton = document.querySelector(".analyses__arrow-next-button");

// let currentIndex = 0;

// function goToSlide(index) {
//     if (index < 0) {
//         index = slideCount - 1;
//     } else if (index >= slideCount) {
//         index = 0;
//     }

//     currentIndex = index;
//     slides.style.transform = `translateX(${-index * 100}%)`;
// }

// prevButton.addEventListener("click", () => {
//     goToSlide(currentIndex - 1);
// });

// nextButton.addEventListener("click", () => {
//     goToSlide(currentIndex + 1);
// });

// goToSlide(0);

window.addEventListener("scroll", () => {
    if (window.scrollY < window.innerHeight) {
        document.querySelector(".mobile-controls").classList.add("visually-hidden");
    } else {
        document.querySelector(".mobile-controls").classList.remove("visually-hidden");
    }
});
