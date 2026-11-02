/* Videos open on the vacancy page, without leaving the site. */
(() => {
  "use strict";

  function embeddedUrl(href) {
    let url;
    try { url = new URL(href); } catch { return null; }
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
      const segments = url.pathname.split("/").filter(Boolean);
      const videoId = host === "youtu.be" ? segments[0]
        : segments[0] === "shorts" || segments[0] === "embed" ? segments[1] : url.searchParams.get("v");
      if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null;
      return { provider: "youtube", src: "https://www.youtube-nocookie.com/embed/" + videoId + "?rel=0&autoplay=1", platform: "YouTube" };
    }
    if (host === "instagram.com") {
      const segments = url.pathname.split("/").filter(Boolean);
      const type = segments[0], shortcode = segments[1];
      if (!["p", "reel", "tv"].includes(type) || !shortcode || !/^[a-zA-Z0-9_-]{5,25}$/.test(shortcode)) return null;
      return { provider: "instagram", src: "https://www.instagram.com/" + type + "/" + shortcode + "/embed/", platform: "Instagram" };
    }
    return null;
  }

  function init() {
    const links = [...document.querySelectorAll(".offer-media-links a[href]")];
    if (!links.length || typeof HTMLDialogElement === "undefined") return;
    const dialog = document.createElement("dialog");
    dialog.className = "offer-video-dialog";
    dialog.setAttribute("aria-label", "Просмотр видео");
    dialog.innerHTML = `
      <div class="offer-video-top">
        <strong class="offer-video-title">Видео</strong>
        <button type="button" class="offer-video-close" aria-label="Закрыть видео">Закрыть ×</button>
      </div>
      <div class="offer-video-stage"><iframe class="offer-video-frame" title="Видеоплеер" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      <div class="offer-video-bottom">Если площадка ограничивает просмотр, <a class="offer-video-fallback" href="#" target="_blank" rel="noopener noreferrer">откройте видео на платформе</a>.</div>`;
    document.body.append(dialog);
    const frame = dialog.querySelector("iframe");
    const fallback = dialog.querySelector(".offer-video-fallback");
    const title = dialog.querySelector(".offer-video-title");
    dialog.querySelector(".offer-video-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => { frame.removeAttribute("src"); dialog.removeAttribute("data-provider"); });
    links.forEach(link => {
      const info = embeddedUrl(link.href);
      if (!info) return;
      const name = link.textContent.replace(/[↗▶]/g, "").trim() || "Видео";
      link.textContent = "▶ " + name;
      link.setAttribute("aria-label", "Смотреть " + name + " на этой странице");
      link.removeAttribute("target");
      link.addEventListener("click", event => {
        event.preventDefault();
        if (dialog.open) dialog.close();
        title.textContent = name;
        dialog.dataset.provider = info.provider;
        fallback.href = link.href;
        fallback.textContent = "откройте видео в " + info.platform;
        frame.title = name + " — " + info.platform;
        frame.src = info.src;
        dialog.showModal();
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
