// aos animation js
AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    mirror: true,
    once: false,
    offset: 120,
    anchorPlacement: "top-bottom",
    disableMutationObserver: false,
});

// preloader js
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("opacity-0");
    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 800);
});
// canvas menu js
const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");
const canvasMenu = document.getElementById("canvas-menu");
const overlay = document.getElementById("overlay");
openBtn.addEventListener("click", () => {
    canvasMenu.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
});
closeBtn.addEventListener("click", () => {
    canvasMenu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
    canvasMenu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
});