document.querySelectorAll(".otp-box").forEach((otpBox, boxIndex) => {
    const inputs = otpBox.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
            // auto next
            if (input.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            checkOTP();
        });
        666665;
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const data = e.clipboardData
                .getData("text")
                .replace(/[^a-zA-Z0-9]/g, "")
                .split("");

            inputs.forEach((inp, i) => {
                inp.value = data[i] || "";
            });
            checkOTP();
        });
    });
    function checkOTP() {
        if ([...inputs].every((i) => i.value !== "")) {
            const otp = [...inputs].map((i) => i.value).join("");
            console.log(`OTP box ${boxIndex + 1}:`, otp);
        }
    }
});