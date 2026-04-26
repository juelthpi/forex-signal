const userReviewSlider = new Swiper(".user-review-slider", {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    speed: 1200,
    spaceBetween: 20,
    autoplay: true,

    autoplay: {
        delay: 1000,
        disableOnInteraction: true,
    },
    navigation: {
        nextEl: "#swiper-slider-button-next",
        prevEl: "#swiper-slider-button-prev",
    },
    grabCursor: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 3,
        },
    },
});