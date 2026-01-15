document.addEventListener("DOMContentLoaded", () => {
  class FadeSlider {
    constructor(selector) {
      this.container = document.querySelector(selector);
      if (!this.container) return;

      // Select the wrapper slides, not the cards directly
      this.slides = Array.from(
        this.container.querySelectorAll(".solutions__slide")
      );
      this.totalSlides = this.slides.length;
      this.activeIndex = 0;

      this.init();
    }

    init() {
      this.updateSlider();
      this.bindEvents();
    }

    bindEvents() {
      this.container.addEventListener("click", (e) => {
        const btn = e.target.closest(".solution-card__arrow");
        if (!btn) return;

        if (btn.classList.contains("solution-card__arrow--next")) {
          this.nextSlide();
        } else if (btn.classList.contains("solution-card__arrow--prev")) {
          this.prevSlide();
        }
      });
    }

    nextSlide() {
      if (this.activeIndex < this.totalSlides - 1) {
        this.activeIndex++;
        this.updateSlider();
      }
    }

    prevSlide() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.updateSlider();
      }
    }

    updateSlider() {
      this.slides.forEach((slide, index) => {
        const isActive = index === this.activeIndex;

        slide.classList.toggle("solutions__slide--active", isActive);

        // Accessibility attributes if needed
        slide.setAttribute("aria-hidden", !isActive);

        if (isActive) {
          this.updateButtons(slide);
        }
      });
    }

    updateButtons(activeSlide) {
      const prevBtn = activeSlide.querySelector(".solution-card__arrow--prev");
      const nextBtn = activeSlide.querySelector(".solution-card__arrow--next");

      if (prevBtn) {
        prevBtn.style.display = this.activeIndex === 0 ? "none" : "";
        prevBtn.disabled = this.activeIndex === 0;
      }

      if (nextBtn) {
        nextBtn.style.display =
          this.activeIndex === this.totalSlides - 1 ? "none" : "";
        nextBtn.disabled = this.activeIndex === this.totalSlides - 1;
      }
    }
  }

  new FadeSlider(".solutions__slider");
});
