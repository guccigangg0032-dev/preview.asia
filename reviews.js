(() => {
  'use strict';
  const grid = document.getElementById('review-grid');
  const empty = document.getElementById('review-empty');
  const filters = document.getElementById('country-filters');
  const status = document.getElementById('video-status');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  if (!grid || !empty || !filters || !status) return;
  const knownCountries = ['Польша', 'Германия', 'Литва', 'Словакия', 'Нидерланды'];
  let reviews = [];
  let selected = 'Все';

  const youtubeId = item => {
    if (typeof item.videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(item.videoId)) return item.videoId;
    const match = String(item.url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  };
  function card(item) {
    const article = document.createElement('article');
    article.className = 'review-card';
    const media = document.createElement('div');
    media.className = 'review-media';
    const id = item.platform === 'youtube' ? youtubeId(item) : null;
    if (id) {
      const img = document.createElement('img');
      img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
      img.loading = 'lazy';
      img.alt = 'Обложка видео: ' + item.title;
      media.append(img);
      const play = document.createElement('button');
      play.type = 'button';
      play.className = 'play-button';
      play.textContent = '▶';
      play.setAttribute('aria-label', 'Воспроизвести: ' + item.title);
      play.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
        iframe.title = item.title;
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        media.replaceChildren(iframe);
      }, { once: true });
      media.append(play);
    } else {
      const glyph = document.createElement('span');
      glyph.className = 'big-play';
      glyph.textContent = '↗';
      media.append(glyph);
    }
    const copy = document.createElement('div');
    copy.className = 'review-copy';
    const tag = document.createElement('span');
    tag.className = 'review-tag';
    tag.textContent = item.country || 'ИСТОРИЯ';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const desc = document.createElement('p');
    desc.textContent = item.summary || 'Публикация из открытого профиля компании.';
    copy.append(tag, title, desc);
    if (typeof item.url === 'string' && /^https:\/\//.test(item.url)) {
      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Открыть источник ↗';
      copy.append(link);
    }
    article.append(media, copy);
    return article;
  }
  function render() {
    const filtered = reviews.filter(item => selected === 'Все' || item.country === selected);
    grid.replaceChildren(...filtered.map(card));
    empty.hidden = filtered.length > 0;
    if (!reviews.length) {
      status.textContent = '';
    } else {
      status.textContent = 'Показано историй: ' + filtered.length;
      if (filtered.length === 0) {
        empty.querySelector('h3').textContent = 'Пока нет историй по этой стране';
        empty.querySelector('p').textContent = 'Попробуйте выбрать другое направление или посмотрите материалы компании в Instagram.';
      }
    }
  }
  function buildFilters() {
    const countrySet = new Set(reviews.map(item => item.country).filter(Boolean));
    const choices = ['Все', ...knownCountries.filter(country => countrySet.has(country)), ...[...countrySet].filter(country => !knownCountries.includes(country)).sort()];
    if (choices.length <= 1) return;
    filters.hidden = false;
    choices.forEach(name => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter';
      button.textContent = name;
      button.setAttribute('aria-pressed', String(name === selected));
      button.addEventListener('click', () => {
        selected = name;
        filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        render();
      });
      filters.append(button);
    });
  }
  fetch('./reviews-data.json', { cache: 'no-store' })
    .then(response => { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); })
    .then(data => {
      reviews = Array.isArray(data.items) ? data.items.filter(item =>
        item && item.approved === true && typeof item.title === 'string' &&
        ((item.platform === 'youtube' && youtubeId(item)) ||
        (item.platform === 'instagram' && /^https:\/\/www\.instagram\.com\//.test(String(item.url || ''))))
      ) : [];
      buildFilters();
      render();
    })
    .catch(() => { status.textContent = ''; render(); });
})();
