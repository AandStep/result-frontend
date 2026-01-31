document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("reviewsTrack");
  if (!track) return;

  // Находим эталонную группу (первый элемент в треке)
  const originalGroup = track.querySelector(".reviews__group");
  if (!originalGroup) return;

  // Настройки
  const speed = 0.5; // Скорость (чем меньше, тем медленнее)
  let currentPos = 0;
  let animationId;
  let totalWidth = 0; // Ширина одного цикла (группы)

  // Функция инициализации контента
  const initMarquee = () => {
    // 1. Сбрасываем трек до состояния "только оригинал"
    // Сначала останавливаем анимацию, чтобы не было конфликтов
    cancelAnimationFrame(animationId);

    // Удаляем все клоны, оставляем только первый элемент (originalGroup)
    while (track.children.length > 1) {
      track.removeChild(track.lastChild);
    }

    // Сбрасываем позицию
    currentPos = 0;
    track.style.transform = `translate3d(0, 0, 0)`;

    // 2. Вычисляем размеры
    // Получаем gap из CSS (важно, чтобы не хардкодить 20px)
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 0;

    // Ширина одной группы = ширина элемента + gap
    const groupRect = originalGroup.getBoundingClientRect();
    const singleGroupWidth = groupRect.width + gap;

    // Сохраняем ширину цикла для анимации
    totalWidth = singleGroupWidth;

    // 3. Рассчитываем необходимое количество клонов
    // Нам нужно заполнить экран (window.innerWidth)
    // + добавить запас (еще одну ширину экрана, чтобы при скролле не было дыр)
    // + еще одну группу для безопасности цикла.
    const screenWidth = window.innerWidth;
    const minWidthToCover = screenWidth * 2 + singleGroupWidth;

    // Сколько групп нужно, чтобы покрыть это расстояние?
    const groupsNeeded = Math.ceil(minWidthToCover / singleGroupWidth);

    // 4. Создаем клоны
    // i начинается с 1, так как 0-й элемент (оригинал) уже есть
    for (let i = 1; i < groupsNeeded; i++) {
      const clone = originalGroup.cloneNode(true);
      clone.setAttribute("aria-hidden", "true"); // Скрываем дубликаты от скринридеров
      track.appendChild(clone);
    }

    // Перезапускаем анимацию
    animationLoop();
  };

  // Цикл анимации
  const animationLoop = () => {
    currentPos += speed;

    // Если прокрутили на ширину одной группы (цикл завершен) -> сбрасываем в 0
    // Это происходит мгновенно и незаметно, так как клон выглядит идентично началу
    if (currentPos >= totalWidth) {
      currentPos = 0;
    }

    track.style.transform = `translate3d(-${currentPos}px, 0, 0)`;
    animationId = requestAnimationFrame(animationLoop);
  };

  // Запуск
  // Используем setTimeout, чтобы убедиться, что CSS стили (шрифты, размеры) загрузились
  // и getBoundingClientRect вернул верные значения
  setTimeout(initMarquee, 100);

  // Пересчет при ресайзе окна (чтобы добавить клонов, если окно растянули)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initMarquee, 200); // Дебаунс, чтобы не дергалось при каждом пикселе
  });
});
