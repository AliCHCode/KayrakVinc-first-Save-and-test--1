(function () {
    const slider = document.querySelector(".slider-section .slider");
    if (!slider) return;

    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".slider-arrow-left");
    const nextBtn = slider.querySelector(".slider-arrow-right");
    const dots = slider.querySelectorAll(".slider-dot");

    let currentIndex = 0;
    const slideCount = slides.length;

    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            goToSlide(Number(dot.dataset.index));
        });
    });
})();
