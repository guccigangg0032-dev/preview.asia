
'use strict';
(function(){
  const search = document.getElementById('job-search');
  const category = document.getElementById('job-category');
  const grid = document.getElementById('job-grid');
  const counter = document.getElementById('result-count');
  const loadMore = document.getElementById('load-more');
  const empty = document.getElementById('job-empty');
  const error = document.getElementById('catalog-error');
  const reset = document.getElementById('reset-filters');
  const dialog = document.getElementById('job-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogCategory = document.getElementById('dialog-category');
  const dialogLocation = document.getElementById('dialog-location');
  const dialogDetails = document.getElementById('dialog-details');
  const dialogSource = document.getElementById('dialog-source');
  const dialogApply = document.getElementById('dialog-apply');
  const closeDialog = document.getElementById('close-dialog');
  if (!search || !category || !grid) return;
  let jobs = [];
  let visibleCount = 12;
  const supportedCountries = ['Польша', 'Германия', 'Литва', 'Словакия', 'Нидерланды'];
  const requestedCountry = new URLSearchParams(window.location.search).get('country');
  let selectedCountry = supportedCountries.includes(requestedCountry) ? requestedCountry : '';
  if (selectedCountry) {
    const title = document.querySelector('.page-hero h1');
    if (title) title.setAttribute('data-country-view', selectedCountry);
    const hint = document.getElementById('job-empty');
    if (hint) {
      const heading = hint.querySelector('strong');
      const paragraph = hint.querySelector('p');
      if (heading) heading.textContent = 'Нет опубликованных вакансий: ' + selectedCountry;
      if (paragraph) paragraph.textContent = 'Подтвердите актуальные предложения и требования у менеджера или выберите другую страну.';
    }
  }
  const wa = 'https://wa.me/77052753333?text=';
  function normalize(value) { return String(value || '').toLocaleLowerCase('ru').replace(/ё/g,'е').trim(); }
  function matches(job) {
    const q = normalize(search.value);
    if (category.value !== 'Все' && category.value !== job.category) return false;
    if (selectedCountry && normalize(job.country) !== normalize(selectedCountry)) return false;
    return !q || normalize([job.title,job.country,job.location,job.category,job.details].join(' ')).includes(q);
  }
  function openJob(job) {
    dialogTitle.textContent = job.title;
    dialogCategory.textContent = job.category;
    dialogLocation.textContent = (job.location || 'Город уточняется') + ' · ' + (job.country || 'Польша');
    dialogDetails.textContent = job.details || 'Подробности уточняйте у менеджера.';
    dialogSource.textContent = 'Источник: «Вакансии Польша», ' + job.source + '. Дата публикации и наличие мест не подтверждены.';
    const message = 'Здравствуйте! Интересует предложение «' + job.title + '» (' + job.id + ', ' + job.location + '). Подскажите актуальность, оплату, жильё и условия оформления.';
    dialogApply.href = wa + encodeURIComponent(message);
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }
  function addTextElement(parent, tag, className, content) {
    const el = document.createElement(tag); if(className) el.className = className; el.textContent = content; parent.append(el); return el;
  }
  function createCard(job) {
    const card = document.createElement('article'); card.className='job-card';
    const top = document.createElement('div'); top.className='job-card-top';
    addTextElement(top,'span','job-tag',job.category);
    addTextElement(top,'span','job-country',job.country || 'Польша');
    card.append(top);
    addTextElement(card,'h3','',job.title);
    addTextElement(card,'div','job-location','⌖  ' + (job.location || 'Локация уточняется'));
    const meta = document.createElement('div'); meta.className='job-meta';
    addTextElement(meta,'span','','Условия уточняются');
    const button = document.createElement('button'); button.type='button';button.className='job-view';button.textContent='Подробнее ↗';button.setAttribute('aria-label','Подробнее: '+job.title);button.addEventListener('click',()=>openJob(job));meta.append(button);
    card.append(meta); return card;
  }
  function render() {
    const filtered = jobs.filter(matches);
    grid.replaceChildren(...filtered.slice(0,visibleCount).map(createCard));
    counter.textContent = (selectedCountry ? 'Страна: ' + selectedCountry + ' · ' : '') + 'Найдено предложений: ' + filtered.length + (filtered.length > visibleCount ? ' · Показано ' + visibleCount : '');
    empty.hidden = filtered.length !== 0;
    loadMore.hidden = visibleCount >= filtered.length;
  }
  function onFilter(){visibleCount=12;render();}
  search.addEventListener('input',onFilter);
  category.addEventListener('change',onFilter);
  reset.addEventListener('click',()=>{
    search.value='';category.value='Все';selectedCountry='';
    if (requestedCountry) window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    const heading = empty?.querySelector('strong');
    const paragraph = empty?.querySelector('p');
    if (heading) heading.textContent = 'Ничего не найдено';
    if (paragraph) paragraph.textContent = 'Попробуй другой город, название работы или категорию.';
    onFilter();search.focus();
  });
  loadMore.addEventListener('click',()=>{visibleCount+=12;render();});
  closeDialog.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  fetch('./vacancies-data.json',{cache:'no-store'})
    .then(response=>{if(!response.ok)throw new Error('Catalog HTTP '+response.status);return response.json();})
    .then(data=>{
      if(!data || !Array.isArray(data.jobs))throw new Error('Invalid vacancies catalog');
      jobs=data.jobs;
      const categories=[...new Set(jobs.map(j=>j.category))].sort((a,b)=>a.localeCompare(b,'ru'));
      categories.forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name;category.append(option);});
      const total=document.getElementById('total-jobs');if(total)total.textContent=String(jobs.length);
      render();
    })
    .catch(e=>{console.error('Catalog unavailable:',e);counter.textContent='Не удалось загрузить предложения';grid.replaceChildren();loadMore.hidden=true;error.hidden=false;});
})();