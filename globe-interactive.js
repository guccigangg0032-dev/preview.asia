(() => {
  'use strict';
  const host = document.getElementById('interactive-globe');
  const scene = host?.closest('.premium-scene');
  const explorer = document.getElementById('globe-explorer');
  if (!host || !scene || !explorer) return;

  // Coordinates are representative city-centre positions, not country borders.
  // All 48 UNSD M49 countries/areas of Asia, Egypt and countries matching site languages.
  // "destination" is a consultation direction, never a guarantee of a live vacancy.
  const countries = [{"iso":"PL","code":"poland","name":"Польша","lat":52.23,"lng":21.01,"groups":["destination","language"]},{"iso":"DE","code":"germany","name":"Германия","lat":52.52,"lng":13.4,"groups":["destination"]},{"iso":"LT","code":"lithuania","name":"Литва","lat":54.69,"lng":25.28,"groups":["destination"]},{"iso":"SK","code":"slovakia","name":"Словакия","lat":48.15,"lng":17.11,"groups":["destination"]},{"iso":"NL","code":"netherlands","name":"Нидерланды","lat":52.37,"lng":4.9,"groups":["destination"]},{"iso":"CZ","code":"czechia","name":"Чехия","lat":50.08,"lng":14.42,"groups":["destination"]},{"iso":"RS","code":"serbia","name":"Сербия","lat":44.81,"lng":20.46,"groups":["destination","language"]},{"iso":"ME","code":"montenegro","name":"Черногория","lat":42.44,"lng":18.77,"groups":["destination"]},{"iso":"TR","code":"turkey","name":"Турция","lat":39.93,"lng":32.86,"groups":["destination","asia"]},{"iso":"US","code":"usa","name":"США","lat":38.9,"lng":-77.04,"groups":["destination","language"]},{"iso":"KZ","code":"kazakhstan","name":"Казахстан","lat":51.17,"lng":71.43,"groups":["asia","language","region"]},{"iso":"KG","code":"kyrgyzstan","name":"Кыргызстан","lat":42.87,"lng":74.59,"groups":["asia","language","region"]},{"iso":"TJ","code":"tajikistan","name":"Таджикистан","lat":38.56,"lng":68.78,"groups":["asia","language","region"]},{"iso":"TM","code":"turkmenistan","name":"Туркменистан","lat":37.96,"lng":58.33,"groups":["asia","region"]},{"iso":"UZ","code":"uzbekistan","name":"Узбекистан","lat":41.31,"lng":69.28,"groups":["asia","language","region"]},{"iso":"CN","code":"china","name":"Китай","lat":39.9,"lng":116.4,"groups":["asia"]},{"iso":"JP","code":"japan","name":"Япония","lat":35.68,"lng":139.69,"groups":["asia"]},{"iso":"MN","code":"mongolia","name":"Монголия","lat":47.92,"lng":106.92,"groups":["asia"]},{"iso":"KP","code":"north-korea","name":"КНДР","lat":39.04,"lng":125.76,"groups":["asia"]},{"iso":"KR","code":"south-korea","name":"Южная Корея","lat":37.57,"lng":126.98,"groups":["asia"]},{"iso":"BN","code":"brunei","name":"Бруней","lat":4.89,"lng":114.94,"groups":["asia"]},{"iso":"KH","code":"cambodia","name":"Камбоджа","lat":11.56,"lng":104.93,"groups":["asia"]},{"iso":"ID","code":"indonesia","name":"Индонезия","lat":-6.2,"lng":106.85,"groups":["asia"]},{"iso":"LA","code":"laos","name":"Лаос","lat":17.96,"lng":102.6,"groups":["asia"]},{"iso":"MY","code":"malaysia","name":"Малайзия","lat":3.14,"lng":101.69,"groups":["asia"]},{"iso":"MM","code":"myanmar","name":"Мьянма","lat":19.76,"lng":96.07,"groups":["asia"]},{"iso":"PH","code":"philippines","name":"Филиппины","lat":14.59,"lng":120.98,"groups":["asia"]},{"iso":"SG","code":"singapore","name":"Сингапур","lat":1.29,"lng":103.85,"groups":["asia"]},{"iso":"TH","code":"thailand","name":"Таиланд","lat":13.75,"lng":100.5,"groups":["asia"]},{"iso":"TL","code":"timor-leste","name":"Восточный Тимор","lat":-8.56,"lng":125.58,"groups":["asia"]},{"iso":"VN","code":"vietnam","name":"Вьетнам","lat":21.03,"lng":105.85,"groups":["asia"]},{"iso":"AF","code":"afghanistan","name":"Афганистан","lat":34.53,"lng":69.17,"groups":["asia"]},{"iso":"BD","code":"bangladesh","name":"Бангладеш","lat":23.81,"lng":90.41,"groups":["asia"]},{"iso":"BT","code":"bhutan","name":"Бутан","lat":27.47,"lng":89.64,"groups":["asia"]},{"iso":"IN","code":"india","name":"Индия","lat":28.61,"lng":77.21,"groups":["asia"]},{"iso":"IR","code":"iran","name":"Иран","lat":35.69,"lng":51.42,"groups":["asia"]},{"iso":"MV","code":"maldives","name":"Мальдивы","lat":4.17,"lng":73.51,"groups":["asia"]},{"iso":"NP","code":"nepal","name":"Непал","lat":27.72,"lng":85.32,"groups":["asia"]},{"iso":"PK","code":"pakistan","name":"Пакистан","lat":33.69,"lng":73.06,"groups":["asia"]},{"iso":"LK","code":"sri-lanka","name":"Шри-Ланка","lat":6.93,"lng":79.85,"groups":["asia"]},{"iso":"AM","code":"armenia","name":"Армения","lat":40.18,"lng":44.51,"groups":["asia","region"]},{"iso":"AZ","code":"azerbaijan","name":"Азербайджан","lat":40.41,"lng":49.87,"groups":["asia","language","region"]},{"iso":"BH","code":"bahrain","name":"Бахрейн","lat":26.23,"lng":50.58,"groups":["asia"]},{"iso":"CY","code":"cyprus","name":"Кипр","lat":35.17,"lng":33.36,"groups":["asia"]},{"iso":"GE","code":"georgia","name":"Грузия","lat":41.72,"lng":44.78,"groups":["asia","region"]},{"iso":"IQ","code":"iraq","name":"Ирак","lat":33.31,"lng":44.37,"groups":["asia"]},{"iso":"IL","code":"israel","name":"Израиль","lat":31.77,"lng":35.22,"groups":["asia"]},{"iso":"JO","code":"jordan","name":"Иордания","lat":31.95,"lng":35.91,"groups":["asia"]},{"iso":"KW","code":"kuwait","name":"Кувейт","lat":29.38,"lng":47.98,"groups":["asia"]},{"iso":"LB","code":"lebanon","name":"Ливан","lat":33.89,"lng":35.5,"groups":["asia"]},{"iso":"OM","code":"oman","name":"Оман","lat":23.61,"lng":58.54,"groups":["asia"]},{"iso":"QA","code":"qatar","name":"Катар","lat":25.29,"lng":51.53,"groups":["asia"]},{"iso":"SA","code":"saudi-arabia","name":"Саудовская Аравия","lat":24.71,"lng":46.67,"groups":["asia"]},{"iso":"PS","code":"palestine","name":"Палестина","lat":31.9,"lng":35.2,"groups":["asia"]},{"iso":"SY","code":"syria","name":"Сирия","lat":33.51,"lng":36.29,"groups":["asia"]},{"iso":"AE","code":"uae","name":"ОАЭ","lat":24.45,"lng":54.37,"groups":["asia"]},{"iso":"YE","code":"yemen","name":"Йемен","lat":15.37,"lng":44.19,"groups":["asia"]},{"iso":"EG","code":"egypt","name":"Египет","lat":30.04,"lng":31.24,"groups":["egypt"]},{"iso":"RU","code":"russia","name":"Россия","lat":55.75,"lng":37.62,"groups":["language","region"]},{"iso":"GB","code":"uk","name":"Великобритания","lat":51.51,"lng":-0.13,"groups":["language"]},{"iso":"ES","code":"spain","name":"Испания","lat":40.42,"lng":-3.7,"groups":["language"]},{"iso":"BY","code":"belarus","name":"Беларусь","lat":53.9,"lng":27.56,"groups":["region"]},{"iso":"MD","code":"moldova","name":"Молдова","lat":47.01,"lng":28.86,"groups":["region"]},{"iso":"UA","code":"ukraine","name":"Украина","lat":50.45,"lng":30.52,"groups":["region"]}];
  const originCities = [{"iso":"KZ","code":"city-astana","name":"Астана","country":"Казахстан","lat":51.17,"lng":71.43,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-almaty","name":"Алматы","country":"Казахстан","lat":43.24,"lng":76.95,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-shymkent","name":"Шымкент","country":"Казахстан","lat":42.31,"lng":69.59,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-karaganda","name":"Караганда","country":"Казахстан","lat":49.8,"lng":73.1,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-aktobe","name":"Актобе","country":"Казахстан","lat":50.28,"lng":57.17,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-atyrau","name":"Атырау","country":"Казахстан","lat":47.11,"lng":51.92,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-aktau","name":"Актау","country":"Казахстан","lat":43.65,"lng":51.16,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-taraz","name":"Тараз","country":"Казахстан","lat":42.9,"lng":71.37,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-turkistan","name":"Туркестан","country":"Казахстан","lat":43.3,"lng":68.27,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-pavlodar","name":"Павлодар","country":"Казахстан","lat":52.29,"lng":76.95,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-ust-kamenogorsk","name":"Усть-Каменогорск","country":"Казахстан","lat":49.95,"lng":82.62,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-kyzylorda","name":"Кызылорда","country":"Казахстан","lat":44.85,"lng":65.51,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-kostanay","name":"Костанай","country":"Казахстан","lat":53.22,"lng":63.62,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-uralsk","name":"Уральск","country":"Казахстан","lat":51.23,"lng":51.38,"groups":["cities"],"city":true},{"iso":"KZ","code":"city-semey","name":"Семей","country":"Казахстан","lat":50.41,"lng":80.23,"groups":["cities"],"city":true},{"iso":"RU","code":"city-moscow","name":"Москва","country":"Россия","lat":55.76,"lng":37.62,"groups":["cities"],"city":true},{"iso":"RU","code":"city-saint-petersburg","name":"Санкт-Петербург","country":"Россия","lat":59.94,"lng":30.32,"groups":["cities"],"city":true},{"iso":"RU","code":"city-novosibirsk","name":"Новосибирск","country":"Россия","lat":55.03,"lng":82.92,"groups":["cities"],"city":true},{"iso":"RU","code":"city-yekaterinburg","name":"Екатеринбург","country":"Россия","lat":56.84,"lng":60.61,"groups":["cities"],"city":true},{"iso":"RU","code":"city-kazan","name":"Казань","country":"Россия","lat":55.79,"lng":49.12,"groups":["cities"],"city":true},{"iso":"RU","code":"city-nizhny-novgorod","name":"Нижний Новгород","country":"Россия","lat":56.33,"lng":44.01,"groups":["cities"],"city":true},{"iso":"RU","code":"city-samara","name":"Самара","country":"Россия","lat":53.2,"lng":50.15,"groups":["cities"],"city":true},{"iso":"RU","code":"city-chelyabinsk","name":"Челябинск","country":"Россия","lat":55.16,"lng":61.4,"groups":["cities"],"city":true},{"iso":"RU","code":"city-ufa","name":"Уфа","country":"Россия","lat":54.73,"lng":55.96,"groups":["cities"],"city":true},{"iso":"RU","code":"city-perm","name":"Пермь","country":"Россия","lat":58.01,"lng":56.25,"groups":["cities"],"city":true},{"iso":"RU","code":"city-omsk","name":"Омск","country":"Россия","lat":54.99,"lng":73.37,"groups":["cities"],"city":true},{"iso":"RU","code":"city-krasnoyarsk","name":"Красноярск","country":"Россия","lat":56.02,"lng":92.87,"groups":["cities"],"city":true},{"iso":"RU","code":"city-rostov-on-don","name":"Ростов-на-Дону","country":"Россия","lat":47.24,"lng":39.7,"groups":["cities"],"city":true},{"iso":"RU","code":"city-krasnodar","name":"Краснодар","country":"Россия","lat":45.04,"lng":38.98,"groups":["cities"],"city":true},{"iso":"RU","code":"city-volgograd","name":"Волгоград","country":"Россия","lat":48.71,"lng":44.51,"groups":["cities"],"city":true},{"iso":"UZ","code":"city-tashkent","name":"Ташкент","country":"Узбекистан","lat":41.3,"lng":69.27,"groups":["cities"],"city":true},{"iso":"UZ","code":"city-samarkand","name":"Самарканд","country":"Узбекистан","lat":39.65,"lng":66.96,"groups":["cities"],"city":true},{"iso":"UZ","code":"city-bukhara","name":"Бухара","country":"Узбекистан","lat":39.77,"lng":64.43,"groups":["cities"],"city":true},{"iso":"UZ","code":"city-namangan","name":"Наманган","country":"Узбекистан","lat":40.99,"lng":71.67,"groups":["cities"],"city":true},{"iso":"UZ","code":"city-andijan","name":"Андижан","country":"Узбекистан","lat":40.78,"lng":72.34,"groups":["cities"],"city":true},{"iso":"UZ","code":"city-fergana","name":"Фергана","country":"Узбекистан","lat":40.39,"lng":71.78,"groups":["cities"],"city":true},{"iso":"KG","code":"city-bishkek","name":"Бишкек","country":"Кыргызстан","lat":42.87,"lng":74.59,"groups":["cities"],"city":true},{"iso":"KG","code":"city-osh","name":"Ош","country":"Кыргызстан","lat":40.54,"lng":72.8,"groups":["cities"],"city":true},{"iso":"KG","code":"city-jalal-abad","name":"Джалал-Абад","country":"Кыргызстан","lat":40.93,"lng":73,"groups":["cities"],"city":true},{"iso":"TJ","code":"city-dushanbe","name":"Душанбе","country":"Таджикистан","lat":38.56,"lng":68.78,"groups":["cities"],"city":true},{"iso":"TJ","code":"city-khujand","name":"Худжанд","country":"Таджикистан","lat":40.28,"lng":69.62,"groups":["cities"],"city":true},{"iso":"TJ","code":"city-bokhtar","name":"Бохтар","country":"Таджикистан","lat":37.84,"lng":68.78,"groups":["cities"],"city":true},{"iso":"TM","code":"city-ashgabat","name":"Ашхабад","country":"Туркменистан","lat":37.96,"lng":58.33,"groups":["cities"],"city":true},{"iso":"TM","code":"city-turkmenabat","name":"Туркменабад","country":"Туркменистан","lat":39.08,"lng":63.58,"groups":["cities"],"city":true},{"iso":"AZ","code":"city-baku","name":"Баку","country":"Азербайджан","lat":40.41,"lng":49.87,"groups":["cities"],"city":true},{"iso":"AZ","code":"city-ganja","name":"Гянджа","country":"Азербайджан","lat":40.68,"lng":46.36,"groups":["cities"],"city":true},{"iso":"AZ","code":"city-sumgait","name":"Сумгаит","country":"Азербайджан","lat":40.59,"lng":49.67,"groups":["cities"],"city":true},{"iso":"AM","code":"city-yerevan","name":"Ереван","country":"Армения","lat":40.18,"lng":44.51,"groups":["cities"],"city":true},{"iso":"AM","code":"city-gyumri","name":"Гюмри","country":"Армения","lat":40.79,"lng":43.85,"groups":["cities"],"city":true},{"iso":"BY","code":"city-minsk","name":"Минск","country":"Беларусь","lat":53.9,"lng":27.56,"groups":["cities"],"city":true},{"iso":"BY","code":"city-gomel","name":"Гомель","country":"Беларусь","lat":52.44,"lng":30.98,"groups":["cities"],"city":true},{"iso":"BY","code":"city-brest","name":"Брест","country":"Беларусь","lat":52.1,"lng":23.7,"groups":["cities"],"city":true},{"iso":"BY","code":"city-grodno","name":"Гродно","country":"Беларусь","lat":53.68,"lng":23.83,"groups":["cities"],"city":true},{"iso":"MD","code":"city-chisinau","name":"Кишинёв","country":"Молдова","lat":47.01,"lng":28.86,"groups":["cities"],"city":true},{"iso":"MD","code":"city-balti","name":"Бельцы","country":"Молдова","lat":47.76,"lng":27.93,"groups":["cities"],"city":true},{"iso":"UA","code":"city-kyiv","name":"Киев","country":"Украина","lat":50.45,"lng":30.52,"groups":["cities"],"city":true},{"iso":"UA","code":"city-lviv","name":"Львов","country":"Украина","lat":49.84,"lng":24.03,"groups":["cities"],"city":true},{"iso":"UA","code":"city-odesa","name":"Одесса","country":"Украина","lat":46.48,"lng":30.73,"groups":["cities"],"city":true},{"iso":"UA","code":"city-kharkiv","name":"Харьков","country":"Украина","lat":49.99,"lng":36.23,"groups":["cities"],"city":true},{"iso":"UA","code":"city-dnipro","name":"Днепр","country":"Украина","lat":48.47,"lng":35.04,"groups":["cities"],"city":true},{"iso":"UA","code":"city-zaporizhzhia","name":"Запорожье","country":"Украина","lat":47.84,"lng":35.14,"groups":["cities"],"city":true},{"iso":"GE","code":"city-tbilisi","name":"Тбилиси","country":"Грузия","lat":41.72,"lng":44.78,"groups":["cities"],"city":true},{"iso":"GE","code":"city-batumi","name":"Батуми","country":"Грузия","lat":41.65,"lng":41.64,"groups":["cities"],"city":true}];
  const select = document.getElementById('globe-country-select');
  const citySearch = document.getElementById('globe-city-search');
  const results = document.getElementById('globe-country-results');
  const detail = document.getElementById('globe-country-detail');
  const filters = [...document.querySelectorAll('[data-globe-filter]')];
  const knownPages = {
    poland: './vacancies.html',
    germany: './directions.html#germany', lithuania: './directions.html#lithuania',
    slovakia: './directions.html#slovakia', netherlands: './directions.html#netherlands',
    czechia: './directions.html#czechia', serbia: './directions.html#serbia',
    montenegro: './directions.html#montenegro', turkey: './directions.html#turkey',
    usa: './usa.html'
  };
  const ui = {
    ru: {city:'Крупный город, из которого можно обратиться за консультацией по работе за рубежом. Это не подтверждение отправки клиентов или доступности рейсов из этого города.',title:'Выбрана страна',directions:'Направление консультаций. Наличие вакансий и условия уточняйте у менеджера.',other:'Страна показана на глобусе для навигации. Наличие вакансий в этой стране не заявлено.',lang:'Язык этой страны представлен в переключателе сайта. Это не означает, что здесь ведётся набор.',go:'Открыть направление',contact:'Обсудить вопрос',default:'Выберите страну на глобусе или в списке.',types:['Направления','Азия','Языки сайта','Египет']},
    kk: {title:'Таңдалған ел',directions:'Кеңес беру бағыты. Бос орындар мен шарттарды менеджерден нақтылаңыз.',other:'Бұл ел картада көрсетілген. Мұнда бос жұмыс орындары бар дегенді білдірмейді.',lang:'Бұл елдің тілі сайтта бар. Бұл елде жұмысқа қабылдау жүріп жатыр деген сөз емес.',go:'Бағытты ашу',contact:'Сұрақ қою',default:'Картадан немесе тізімнен елді таңдаңыз.'},
    en: {city:'A major city from which people may inquire about working abroad. This map does not verify historical departures from the city.',title:'Selected country',directions:'Consultation destination. Confirm vacancy availability and conditions with a manager.',other:'Shown for geographic navigation. No open vacancies in this country are claimed.',lang:'A language associated with this country is available on the site; this does not indicate local recruitment.',go:'View destination',contact:'Ask a question',default:'Select a country on the globe or from the list.'},
    sr: {title:'Izabrana zemlja',directions:'Smer konsultacija. Proverite dostupnost poslova kod menadžera.',other:'Zemlja je prikazana na karti. Poslovi nisu potvrđeni.',lang:'Jezik ove zemlje je na sajtu, ali to ne znači da postoje slobodna radna mesta.',go:'Detalji',contact:'Postavite pitanje',default:'Izaberite zemlju na globusu ili sa liste.'},
    ky: {title:'Тандалган өлкө',directions:'Кеңеш берүү багыты. Бош орундарды менеджерден тактаңыз.',other:'Өлкө картада көрсөтүлгөн. Бош орундар бар деп айтылбайт.',lang:'Бул өлкөнүн тили сайтта бар, бирок бул ишке кабыл алуу деген эмес.',go:'Багытты ачуу',contact:'Суроо берүү',default:'Картадан же тизмеден өлкөнү тандаңыз.'},
    uz: {title:'Tanlangan davlat',directions:'Maslahat yo‘nalishi. Ish o‘rinlarini menejerdan aniqlang.',other:'Davlat xaritada ko‘rsatilgan. Bo‘sh ish o‘rinlari tasdiqlanmagan.',lang:'Bu mamlakat tili saytda mavjud, ammo bu ishga qabul qilishni anglatmaydi.',go:'Yo‘nalishni ochish',contact:'Savol berish',default:'Xaritadan yoki ro‘yxatdan davlatni tanlang.'},
    tg: {title:'Кишвари интихобшуда',directions:'Самти машварат. Мавҷудияти ҷойҳои кориро аз менеҷер пурсед.',other:'Ин кишвар дар харита аст. Ҷойҳои корӣ тасдиқ нашудаанд.',lang:'Забони ин кишвар дар сомона мавҷуд аст; ин маънои ҷойи кориро надорад.',go:'Дидани самт',contact:'Савол додан',default:'Кишварро аз харита ё рӯйхат интихоб кунед.'},
    az: {title:'Seçilmiş ölkə',directions:'Məsləhət istiqaməti. İş yerlərini menecerdən dəqiqləşdirin.',other:'Ölkə xəritədə göstərilib. İş yerləri elan edilmir.',lang:'Bu ölkənin dili saytda var, lakin bu işə qəbul demək deyil.',go:'İstiqamətə baxın',contact:'Sual verin',default:'Xəritədə və ya siyahıda ölkə seçin.'},
    pl: {title:'Wybrany kraj',directions:'Kierunek konsultacji. Dostępność ofert należy potwierdzić.',other:'Kraj jest zaznaczony na globusie. Nie potwierdzamy aktywnych ofert pracy.',lang:'Język tego kraju jest na stronie, ale nie oznacza to rekrutacji.',go:'Zobacz kierunek',contact:'Zadaj pytanie',default:'Wybierz kraj na globusie lub z listy.'},
    es: {title:'País seleccionado',directions:'Destino de consulta. Confirma las vacantes con un asesor.',other:'País visible en el mapa. No se anuncian empleos activos aquí.',lang:'El idioma de este país está en la web, pero no implica contratación.',go:'Ver destino',contact:'Consultar',default:'Selecciona un país en el globo o en la lista.'}
  };
  let language = (document.documentElement.lang || 'ru').split('-')[0];
  let group = 'destination';
  let selected = null;
  let globe = null;
  let controls = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function t() { return ui[language] || ui.ru; }
  function flag(iso) {
    return String.fromCodePoint(...iso.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0)));
  }
  function name(country) {
    if (country.city) return country.name+' · '+country.country;
    try {
      const dn = new Intl.DisplayNames([language], {type:'region'});
      const localized = dn.of(country.iso);
      return localized && localized !== country.iso ? localized : country.name;
    } catch (e) { return country.name; }
  }
  const byName = (a,b) => name(a).localeCompare(name(b), language);
  const belongs = (item,g) => g === 'cities' ? !!item.city : !item.city && item.groups.includes(g);
  const visible = () => (group === 'cities' ? originCities : countries).filter(item=>belongs(item,group));
  function showFallback() {
    scene.classList.remove('has-3d');
    scene.classList.add('has-fallback');
    host.setAttribute('aria-label','Иллюстрация Земли. Для выбора страны используйте список ниже.');
  }

  function pick(country, focusGlobe=true) {
    selected = country;
    if (!belongs(country,group)) {
      group = country.city ? 'cities' : country.groups.includes('destination') ? 'destination' : country.groups.includes('asia') ? 'asia' : country.groups.includes('region') ? 'region' : country.groups.includes('language') ? 'language' : 'egypt';
      renderSelect();
      render();
    }
    select.value = country.code;
    const words = t();
    const description = country.city ? (words.city || ui.ru.city) : country.groups.includes('destination') ? words.directions :
      country.groups.includes('language') ? words.lang : words.other;
    detail.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = flag(country.iso)+' '+name(country);
    const paragraph = document.createElement('p');
    paragraph.textContent = description;
    const a = document.createElement('a');
    a.href = knownPages[country.code] || './contacts.html';
    a.textContent = knownPages[country.code] ? words.go+' ↗' : words.contact+' ↗';
    detail.append(heading, paragraph, a);
    detail.classList.add('has-selection');
    results.querySelectorAll('button[data-country-code]').forEach(el => {
      el.setAttribute('aria-pressed', String(el.dataset.countryCode === country.code));
    });
    if (focusGlobe && globe) {
      controls.autoRotate = false;
      globe.pointOfView({lat:country.lat, lng:country.lng, altitude:1.7}, reducedMotion ? 0 : 950);
    }
  }

  function render() {
    const choices = visible().filter(c=>!c.city||!citySearch?.value||name(c).toLocaleLowerCase().includes(citySearch.value.trim().toLocaleLowerCase())).sort(byName);
    filters.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.globeFilter === group)));
    results.replaceChildren();
    const fragment = document.createDocumentFragment();
    for (const c of choices) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'globe-country-choice';
      button.dataset.countryCode = c.code;
      button.setAttribute('aria-pressed', String(selected?.code === c.code));
      button.textContent = flag(c.iso)+' '+name(c);
      button.addEventListener('click',()=>pick(c));
      fragment.append(button);
    }
    results.append(fragment);
    if(citySearch)citySearch.hidden = group!=='cities';
    if(globe) globe.htmlElementsData(visible());
  }
  function renderSelect() {
    const current = selected?.code || '';
    select.replaceChildren();
    const blank = document.createElement('option');
    blank.value = '';blank.textContent = group === 'cities' ? 'Выберите город отправления' : t().default;select.append(blank);
    for (const c of visible().sort(byName)) {
      const option = document.createElement('option');
      option.value=c.code;option.textContent=flag(c.iso)+' '+name(c);
      select.append(option);
    }
    select.value = current;
  }

  const total = document.getElementById('globe-country-total');
  if (total) total.textContent = String(countries.length);
  const originTotal=document.getElementById('globe-city-total');
  if(originTotal)originTotal.textContent=String(originCities.length);
  const asianCount = document.getElementById('globe-asia-total');
  if (asianCount) asianCount.textContent = String(countries.filter(c=>c.groups.includes('asia')).length);
  renderSelect();
  render();
  filters.forEach(button => button.addEventListener('click', () => {
    group = button.dataset.globeFilter;
    if (selected && !belongs(selected,group)) {
      selected = null;
      detail.replaceChildren();
      const p = document.createElement('p');p.textContent = t().default;detail.append(p);
      detail.classList.remove('has-selection');
    }
    renderSelect();render();
  }));
  select.addEventListener('change',()=>{const c=[...countries,...originCities].find(i=>i.code===select.value);if(c)pick(c);});
  citySearch?.addEventListener('input',render);
  new MutationObserver(() => {
    const next=(document.documentElement.lang||'ru').split('-')[0];
    if(next===language) return;
    language=next;
    renderSelect();render();
    if(selected) pick(selected,false);
    else {const p=detail.querySelector('p');if(p)p.textContent=t().default;}
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  // Controls remain available in the DOM when the globe library or WebGL is unavailable.
  if(typeof window.Globe!=='function'){showFallback();return;}
  try {
    const probe=document.createElement('canvas');
    const gl=probe.getContext('webgl2')||probe.getContext('webgl');
    if(!gl){showFallback();return;}
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }catch(e){showFallback();return;}

  try {
    let ready=false;
    globe=new window.Globe(host,{animateIn:!reducedMotion})
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe@2.37.2/example/img/earth-blue-marble.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#5589ef')
      .atmosphereAltitude(0.17)
      .htmlElementsData(visible())
      .htmlLat('lat').htmlLng('lng')
      .htmlAltitude(0.045)
      .htmlElement(country=>{
        const button=document.createElement('button');
        button.type='button';
        const important=country.groups.includes('destination');
        button.className='globe-pin '+(country.city?'globe-pin--city':important?'globe-pin--featured':'globe-pin--dot');
        button.textContent=country.city?'•':important?flag(country.iso):'';
        button.title=name(country);
        button.setAttribute('aria-label','Выбрать страну: '+name(country));
        button.addEventListener('pointerdown',event=>event.stopPropagation());
        button.addEventListener('click',event=>{event.stopPropagation();pick(country);});
        return button;
      })
      .pointOfView({lat:44,lng:54,altitude:2.05},0);
    const resize=()=>{
      if(!host.isConnected)return;
      globe.width(Math.max(220,host.clientWidth));
      globe.height(Math.max(220,host.clientHeight));
    };
    resize();
    if('ResizeObserver' in window)new ResizeObserver(resize).observe(host);
    else window.addEventListener('resize',resize,{passive:true});
    controls=globe.controls();
    controls.enablePan=false;controls.enableZoom=false;
    controls.autoRotate=!reducedMotion;controls.autoRotateSpeed=0.32;
    const timeout=setTimeout(()=>{if(!ready){showFallback();globe.pauseAnimation?.();}},12000);
    globe.onGlobeReady(()=>{
      ready=true;clearTimeout(timeout);scene.classList.remove('has-fallback');scene.classList.add('has-3d');
      host.setAttribute('aria-label','3D-глобус с '+countries.length+' странами. Страну можно также выбрать из списка ниже.');
    });
    if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      host.addEventListener('pointerenter',()=>{controls.autoRotate=false;});
      host.addEventListener('pointerleave',()=>{controls.autoRotate=!reducedMotion&&!document.hidden;});
    }else{
      host.addEventListener('pointerdown',()=>{controls.autoRotate=false;},{passive:true});
      const resume=()=>{controls.autoRotate=!reducedMotion&&!document.hidden;};
      host.addEventListener('pointerup',resume,{passive:true});
      host.addEventListener('pointercancel',resume,{passive:true});
    }
    document.addEventListener('visibilitychange',()=>{
      controls.autoRotate=!reducedMotion&&!document.hidden;
    });
    document.querySelectorAll('[data-globe-country]').forEach(link=>{
      const country=countries.find(c=>c.code===link.dataset.globeCountry);
      if(!country)return;
      link.addEventListener('pointerenter',()=>{
        controls.autoRotate=false;
        globe.pointOfView({lat:country.lat,lng:country.lng,altitude:1.7},650);
      });
      link.addEventListener('focus',()=>{
        controls.autoRotate=false;
        globe.pointOfView({lat:country.lat,lng:country.lng,altitude:1.7},650);
      });
    });
  }catch(e){
    showFallback();
    console.warn('3D globe unavailable; country selector remains accessible.',e);
  }
})();