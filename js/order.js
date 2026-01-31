document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Настройка элементов ---
  const form = document.getElementById("orderForm");
  const policyCheckbox = document.getElementById("policyCheckbox");
  const policyLabel = document.getElementById("policyLabel");
  const phoneInput = document.getElementById("userPhone");

  if (!form) return;

  // --- 2. Логика Чекбокса (JS-driven) ---
  // Принудительно управляем визуальным состоянием через класс
  if (policyCheckbox && policyLabel) {
    policyCheckbox.addEventListener("change", () => {
      if (policyCheckbox.checked) {
        policyLabel.classList.add("is-checked");
        policyLabel.classList.remove("error"); // Убираем красную рамку сразу
      } else {
        policyLabel.classList.remove("is-checked");
      }
    });
  }

  // --- 3. Маска телефона ---
  const phoneMask = (e) => {
    let el = e.target,
      clearVal = el.value.replace(/\D/g, ""),
      matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = clearVal;

    if (def.length >= val.length) val = def;

    el.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
          ? ""
          : a;
    });
  };

  if (phoneInput) {
    phoneInput.addEventListener("input", phoneMask);
    phoneInput.addEventListener("focus", () => {
      if (!phoneInput.value) phoneInput.value = "+7 ";
    });
    phoneInput.addEventListener("blur", () => {
      if (phoneInput.value === "+7 ") phoneInput.value = "";
    });
  }

  // --- 4. Тост-уведомления ---
  const showToast = (message, type = "success") => {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.style.cssText =
        "position:fixed; top:20px; right:20px; z-index:9999; display:flex; flex-direction:column; gap:10px;";
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const color = type === "success" ? "#007E3A" : "#FF0000";
    const icon = type === "success" ? "✔" : "✖";

    toast.style.cssText = `
            background: #fff; border-left: 4px solid ${color}; padding: 16px 24px;
            border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            display: flex; gap: 12px; align-items: center; font-family: 'Montserrat', sans-serif;
            min-width: 280px; transform: translateX(100%); transition: transform 0.3s ease;
          `;

    toast.innerHTML = `<span style="color:${color}; font-weight:bold; font-size:1.2em;">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    // Анимация входа
    requestAnimationFrame(() => (toast.style.transform = "translateX(0)"));

    // Удаление
    setTimeout(() => {
      toast.style.transform = "translateX(120%)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // --- 5. Валидация и Отправка ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let errors = 0;

    // Валидация Имени
    const nameInp = form.querySelector('input[name="name"]');
    if (nameInp.value.trim().length < 2) {
      showError(nameInp, "Введите имя");
      errors++;
    } else showSuccess(nameInp);

    // Валидация Почты
    const emailInp = form.querySelector('input[name="email"]');
    if (!emailInp.value.includes("@") || !emailInp.value.includes(".")) {
      showError(emailInp, "Введите корректную почту");
      errors++;
    } else showSuccess(emailInp);

    // Валидация Чекбокса (Важно!)
    if (!policyCheckbox.checked) {
      policyLabel.classList.add("error");
      errors++;
    } else {
      policyLabel.classList.remove("error");
    }

    // Итог
    if (errors === 0) {
      const btn = form.querySelector('button[type="submit"]');
      const oldText = btn.textContent;
      btn.textContent = "Отправка...";
      btn.disabled = true;

      // Имитация успешной отправки
      setTimeout(() => {
        showToast("Заявка успешно отправлена!");
        form.reset();
        policyLabel.classList.remove("is-checked"); // Сброс визуала галочки

        // Сброс стилей инпутов
        form.querySelectorAll(".order-form__input").forEach((i) => {
          i.style.borderColor = "transparent";
          i.style.backgroundColor = "#F8F8F8";
        });

        btn.textContent = oldText;
        btn.disabled = false;
      }, 1500);
    } else {
      showToast("Заполните обязательные поля", "error");
    }
  });

  // Хелперы стилей
  function showError(input, msg) {
    input.style.borderColor = "#FF0000";
    input.style.backgroundColor = "rgba(255,0,0,0.02)";
    // Можно добавить вывод текста ошибки в span, если нужно
  }
  function showSuccess(input) {
    input.style.borderColor = "#007E3A";
    input.style.backgroundColor = "#fff";
  }
});
