const input = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");
const arc = document.getElementById("progressArc");
const block = document.getElementById("progressBlock");

const CIRCLE_LENGTH = 283;

function setValue(val) {
    const clamp = Math.max(0, Math.min(100, val));
    const offset = CIRCLE_LENGTH - (CIRCLE_LENGTH * clamp / 100);
    arc.style.strokeDashoffset = offset;
}

input.addEventListener("input", () => {
    setValue(+input.value);
});

animateToggle.addEventListener("change", () => {
    if (animateToggle.checked) {
        block.classList.add("animated");
    } else {
        block.classList.remove("animated");
    }
});

hideToggle.addEventListener("change", () => {
    block.style.opacity = hideToggle.checked ? "0" : "1";
});

/* Init */
setValue(input.value);
