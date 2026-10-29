(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const interestSelect = document.getElementById('interest');
  // New country options. Lithuania is visible but not accepting applications.
  if (interestSelect) {
    [...interestSelect.options].forEach(option => option.remove());
    interestSelect.add(new Option('Подобрать направление', 'Подобрать направление'));
    const countries = [['Польша','🇵🇱'],['Германия','🇩🇪'],['Литва','🇱🇹'],
      ['Словакия','🇸🇰'],['Нидерланды','🇳🇱'],['Чехия','🇨🇿'],
      ['Сербия','🇷🇸'],['Черногория','🇲🇪'],['Турция','🇹🇷']];
    for (const [name, flag] of countries) {
      const option = new Option(flag + ' ' + name + (name === 'Литва' ? ' · приостановлено' : ''), 'Работа — ' + name);
      if (name === 'Литва') option.disabled = true;
      interestSelect.add(option);
    }
    interestSelect.add(new Option('🇺🇸 США · отдельная консультация', 'Консультация по США'));
  }
  const stepsGrid = document.querySelector('.steps-grid');
  if (stepsGrid) {
    const steps = [
      ['✳', 'Консультация', 'Знакомство, опыт работы и выбор целей.'],
      ['⌕', 'Подбор направления', 'Обсуждаем предложения и требования.'],
      ['▤', 'Договор', 'Уточняем услуги, стоимость и обязанности сторон.'],
      ['✉', 'Приглашение', 'Ожидаем необходимые документы от работодателя.'],
      ['◈', 'Собеседование и виза', 'Проверяем список документов и порядок подачи. Решение принимает консульство.'],
      ['✈', 'Поездка и адаптация', 'После всех согласований обсуждаем прибытие и первые дни на месте.']
    ];
    stepsGrid.classList.add('premium-six-steps');
    stepsGrid.innerHTML = steps.map(([icon, title, description]) => '<article class="step"><span class="step-icon">' + icon + '</span><h3>' + title + '</h3><p>' + description + '</p></article>').join('');
  }
  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    mobileMenu.hidden = true;
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileMenu.hidden = !open;
  });
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 940) closeMenu(); });
  const filters = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.direction-card')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    filters.forEach(button => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  }));
  document.querySelectorAll('.interest-link').forEach(link => link.addEventListener('click', () => {
    if (interestSelect) interestSelect.value = link.dataset.interest || 'Работа в Европе';
  }));
  document.getElementById('send-whatsapp')?.addEventListener('click', () => {
    const interest = interestSelect?.value || 'Работа в Европе';
    const text = `Здравствуйте! Меня интересует: ${interest}. Подскажите, пожалуйста, актуальные условия и порядок оформления.`;
    window.open(`https://wa.me/77052753333?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
