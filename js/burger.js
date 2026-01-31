document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger-btn");
  const burgerMenu = document.getElementById("burgerMenu");
  const burgerClose = document.getElementById("burgerClose");
  const menuLinks = document.querySelectorAll(".burger-menu__link");

  // Функция открытия
  const openMenu = () => {
    burgerMenu.classList.add("is-active");
    burgerMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open"); // Блокируем скролл фона
  };

  // Функция закрытия
  const closeMenu = () => {
    burgerMenu.classList.remove("is-active");
    burgerMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  };

  // 1. Открытие по кнопке в хедере
  if (burgerBtn) {
    burgerBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Чтобы клик не ушел на document
      openMenu();
    });
  }

  // 2. Закрытие по крестику
  if (burgerClose) {
    burgerClose.addEventListener("click", closeMenu);
  }

  // 3. Закрытие при клике на ссылку (навигация)
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // 4. Закрытие при клике вне меню (опционально, но удобно для UX)
  document.addEventListener("click", (e) => {
    const isClickInside = burgerMenu.contains(e.target);
    const isClickOnBtn = burgerBtn.contains(e.target);

    // Если меню активно и клик был НЕ по меню и НЕ по кнопке открытия
    if (
      burgerMenu.classList.contains("is-active") &&
      !isClickInside &&
      !isClickOnBtn
    ) {
      closeMenu();
    }
  });

  // 5. Закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burgerMenu.classList.contains("is-active")) {
      closeMenu();
    }
  });
});
