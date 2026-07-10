(function () {
    const slider = document.querySelector(".slider-section .slider");
    if (!slider) return;

    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".slider-arrow-left");
    const nextBtn = slider.querySelector(".slider-arrow-right");
    const dots = slider.querySelectorAll(".slider-dot");
    const video = slider.querySelector(".slide video");

    let currentIndex = 0;
    const slideCount = slides.length;

    const IMAGE_DURATION = 4000;
    const VIDEO_DURATION = 22000;

    let timer = null;

    function scheduleAutoAdvance() {
        clearTimeout(timer);

        if (currentIndex === 1) {
            // Video slide: restart video, switch back to image after 22s
            if (video) {
                video.currentTime = 0;
                video.play().catch(() => {});
            }
            timer = setTimeout(() => goToSlide(0), VIDEO_DURATION);
        } else {
            // Image slide: switch to video after 4s
            timer = setTimeout(() => goToSlide(1), IMAGE_DURATION);
        }
    }

    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
        scheduleAutoAdvance();
    }

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            goToSlide(Number(dot.dataset.index));
        });
    });

    // Start the automatic cycle on the initial image slide
    scheduleAutoAdvance();
})();

