const heroSlider = new Swiper(".hero-slider", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 3200,

    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },

    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
});