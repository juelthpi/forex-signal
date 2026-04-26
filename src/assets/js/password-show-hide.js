document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".password-toggle").forEach((toggleBtn) => {
        toggleBtn.addEventListener("click", () => {
            const input = toggleBtn
                .closest(".relative")
                .querySelector(".password-input");
            const eyeOpen = toggleBtn.querySelector(".eye-open");
            const eyeClosed = toggleBtn.querySelector(".eye-closed");
            if (input.type === "password") {
                input.type = "text";
                eyeOpen.classList.remove("hidden");
                eyeClosed.classList.add("hidden");
            } else {
                input.type = "password";
                eyeOpen.classList.add("hidden");
                eyeClosed.classList.remove("hidden");
            }
        });
    });
});