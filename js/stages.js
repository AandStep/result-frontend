document.addEventListener("DOMContentLoaded", () => {
  // 1. Инициализация Слайдера
  const mainSwiper = new Swiper(".stages__slider", {
    slidesPerView: "auto",
    spaceBetween: 0,
    centeredSlides: true,
    centeredSlidesBounds: true,
    speed: 600,
    grabCursor: true,
    slideActiveClass: "swiper-slide-active",
    touchEventsTarget: "container",
  });

  // 2. Навигация
  const navItems = document.querySelectorAll(".stages__nav-item");

  // Добавили второй аргумент 'shouldScroll' (по умолчанию true)
  const updateNavState = (activeIndex, shouldScroll = true) => {
    navItems.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add("stages__nav-item--active");

        // Выполняем скролл, только если разрешено
        if (shouldScroll) {
          item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      } else {
        item.classList.remove("stages__nav-item--active");
      }
    });
  };

  // Клик по тексту
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      mainSwiper.slideTo(index);
    });
  });

  // Синхронизация при свайпе
  mainSwiper.on("slideChange", () => {
    // При свайпе скролл меню нужен
    updateNavState(mainSwiper.activeIndex, true);
  });

  // Старт (передаем false, чтобы при загрузке НЕ скроллило)
  updateNavState(0, false);

  // Клик по тексту
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      mainSwiper.slideTo(index);
    });
  });
});
