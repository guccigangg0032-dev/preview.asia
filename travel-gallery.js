/* Optional travel photographs in the home-page vacancy directions section.
   The gallery is shown only when uploaded assets are actually available. */
(() => {
  const root = document.querySelector(".direction-grid");
  if (!root) return;
  const items = [
    {file:"uae-dubai.webp", title:"Дубай", alt:"Вечерний город и путешественник с табличкой"},
    {file:"hungary-budapest.webp", title:"Будапешт", alt:"Путешественник на фоне Дуная и парламента Будапешта"},
    {file:"us-washington.webp", title:"Вашингтон", alt:"Путешественник у Капитолия в Вашингтоне"},
    {file:"france-paris.webp", title:"Париж", alt:"Путешественник у Эйфелевой башни"},
    {file:"journey-sign.webp", title:"Моменты поездок", alt:"Путешественник держит синюю табличку"},
    {file:"us-new-york.webp", title:"Нью-Йорк", alt:"Путешественник на Таймс-сквер в Нью-Йорке"}
  ];
  const imgUrl = f => "./assets/travel/" + f;
  const test = item => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imgUrl(item.file);
  });
  Promise.all(items.map(test)).then(loaded => {
    const present = items.filter((_,i)=>loaded[i]);
    if (!present.length) return;
    const wrap = document.createElement("section");
    wrap.className = "travel-showcase";
    wrap.setAttribute("aria-label","Фотографии путешествий");
    const title = document.createElement("div");
    title.className = "travel-showcase__intro";
    title.innerHTML = '<div><span class="travel-showcase__eyebrow">ГЕОГРАФИЯ ВПЕЧАТЛЕНИЙ</span><h3>Мир ближе, чем кажется.</h3></div><p>Фотографии путешествий из предоставленного архива. Снимки не являются подтверждением доступности вакансий или получения визы.</p>';
    const grid = document.createElement("div");
    grid.className = "travel-showcase__grid";
    for (const item of present) {
      const fig = document.createElement("figure");
      fig.className = "travel-showcase__photo";
      const img = document.createElement("img");
      img.src = imgUrl(item.file);
      img.alt = item.alt;
      img.loading = "lazy";
      img.decoding = "async";
      const caption = document.createElement("figcaption");
      caption.textContent = item.title;
      fig.append(img,caption);
      grid.append(fig);
    }
    wrap.append(title,grid);
    root.after(wrap);
    if (loaded[2]) {
      const usa = document.querySelector(".v2-card .country-image.country-usa");
      if(usa) {
        usa.classList.add("has-travel-image");
        usa.style.backgroundImage = 'linear-gradient(0deg,rgba(7,20,47,.54),rgba(7,20,47,.05) 68%),url("' + imgUrl("us-washington.webp") + '")';
      }
    }
  });
})();