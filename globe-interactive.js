(() => {
  'use strict';
  const host = document.getElementById('interactive-globe');
  const scene = host?.closest('.premium-scene');
  if (!host || !scene || typeof window.Globe !== 'function') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countries = [
    { code: 'poland', name: 'Польша', flag: '🇵🇱', lat: 52.23, lng: 21.01 },
    { code: 'germany', name: 'Германия', flag: '🇩🇪', lat: 52.52, lng: 13.40 },
    { code: 'lithuania', name: 'Литва', flag: '🇱🇹', lat: 54.69, lng: 25.28 },
    { code: 'slovakia', name: 'Словакия', flag: '🇸🇰', lat: 48.15, lng: 17.11 },
    { code: 'netherlands', name: 'Нидерланды', flag: '🇳🇱', lat: 52.37, lng: 4.90 }
  ];

  const countryLink = country => './vacancies.html?country=' + encodeURIComponent(country.name);
  try {
    const globe = new window.Globe(host, { animateIn: !reducedMotion })
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe@2.37.2/example/img/earth-blue-marble.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#5589ef')
      .atmosphereAltitude(0.17)
      .htmlElementsData(countries)
      .htmlLat('lat')
      .htmlLng('lng')
      .htmlAltitude(0.045)
      .htmlElement(country => {
        const link = document.createElement('a');
        link.href = countryLink(country);
        link.className = 'globe-pin';
        link.textContent = country.flag;
        link.setAttribute('aria-label', 'Вакансии: ' + country.name);
        link.title = country.name + ' — посмотреть вакансии';
        link.addEventListener('pointerdown', event => event.stopPropagation());
        return link;
      })
      .pointOfView({ lat: 51, lng: 17, altitude: 2.1 }, 0);

    const resize = () => {
      if (!host.isConnected) return;
      globe.width(Math.max(200, host.clientWidth));
      globe.height(Math.max(200, host.clientHeight));
    };
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
    else window.addEventListener('resize', resize, { passive: true });

    const controls = globe.controls();
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.35;

    globe.onGlobeReady(() => {
      scene.classList.add('has-3d');
      host.setAttribute('aria-label', 'Интерактивная 3D-Земля. Вращайте мышью или пальцем, нажимайте на флажки стран.');
    });
    host.addEventListener('pointerenter', () => { controls.autoRotate = false; });
    host.addEventListener('pointerleave', () => { controls.autoRotate = !reducedMotion; });
    document.addEventListener('visibilitychange', () => {
      controls.autoRotate = !reducedMotion && !document.hidden;
    });
    document.querySelectorAll('[data-globe-country]').forEach(link => {
      const country = countries.find(item => item.code === link.dataset.globeCountry);
      if (!country) return;
      link.addEventListener('pointerenter', () => {
        controls.autoRotate = false;
        globe.pointOfView({ lat: country.lat, lng: country.lng, altitude: 1.55 }, 900);
      });
      link.addEventListener('pointerleave', () => { controls.autoRotate = !reducedMotion; });
    });
  } catch (error) {
    // The accessible country links and illustrated globe remain available without WebGL.
    console.warn('3D globe unavailable; showing static fallback.', error);
  }
})();
