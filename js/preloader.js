(function () {
  const preloader = document.getElementById("preloader");
  const bar = document.getElementById("preloader-bar");
  const percent = document.getElementById("preloader-percent");

  // Блокируем скролл сразу
  document.body.classList.add("is-loading");

  let progress = 0;
  // Интервал для имитации процесса (быстро в начале, медленно в конце)
  const interval = setInterval(() => {
    // Замедляемся по мере приближения к 90%
    const step = Math.max(1, (90 - progress) / 10);

    if (progress < 90) {
      progress += Math.random() * step; // Немного случайности
      updateDisplay(progress);
    }
  }, 100);

  // Функция обновления UI
  function updateDisplay(val) {
    const rounded = Math.round(val);
    bar.style.width = `${rounded}%`;
    percent.innerText = `${rounded}%`;
  }

  // Когда всё (картинки, стили, скрипты) загрузилось
  window.addEventListener("load", () => {
    clearInterval(interval);

    // Добиваем до 100%
    progress = 100;
    updateDisplay(progress);

    // Небольшая задержка, чтобы юзер увидел 100%
    setTimeout(() => {
      preloader.classList.add("is-hidden");
      document.body.classList.remove("is-loading"); // Возвращаем скролл

      // Удаляем из DOM полностью после анимации (для оптимизации)
      setTimeout(() => {
        preloader.remove();
      }, 600);
    }, 400);
  });
})();
