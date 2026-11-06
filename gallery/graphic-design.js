(() => {
  const designs = [["Lini Masa Alumni SMPK Anugerah", "Alumni timeline", "banner", "../img/graphic-design/01-lini-masa-alumni.jpg", "Linimasa Alumni SMPK Anugerah", "Banner linimasa alumni"], ["Stop Bullying, Say No to Drugs", "Awareness campaign", "banner", "../img/graphic-design/02-anti-bullying-narkoba.jpg", "Stop Bullying, Say No to Drugs", "Banner kampanye anti-perundungan dan narkoba"], ["Selamat atas Diterimanya Siswa", "Student achievement", "poster", "../img/graphic-design/03-selamat-atas-diterimanya.png", "Selamat atas Diterimanya Siswa", "Poster apresiasi siswa"], ["Masa Muda dengan Kristus", "School seminar", "poster", "../img/graphic-design/04-2.png", "Masa Muda dengan Kristus", "Poster seminar sekolah"], ["Meet Up Grup Timotius", "Alumni gathering", "poster", "../img/graphic-design/05-fajar-suryawan-1.png", "Meet Up Grup Timotius", "Poster pertemuan alumni"], ["Seminar MPLS — E-Sport", "Speaker profile", "poster", "../img/graphic-design/06-keynote-speaker-1.png", "Seminar MPLS — E-Sport", "Poster profil narasumber"], ["Mengapa Harus Bayar Pajak?", "Educational webinar", "event", "../img/graphic-design/07-red-modern-webinar-poster-landscape.png", "Mengapa Harus Bayar Pajak?", "Poster webinar edukasi"], ["Festival Budaya Nusantara — Panel Kanan", "Cultural festival", "event", "../img/graphic-design/08-kananfesbud.png", "Festival Budaya Nusantara — Panel Kanan", "Panel kanan desain festival budaya"], ["Festival Budaya Nusantara — Panel Kiri", "Cultural festival", "event", "../img/graphic-design/09-kirifesbud.png", "Festival Budaya Nusantara — Panel Kiri", "Panel kiri desain festival budaya"], ["Chinese New Year Celebration", "School event", "event", "../img/graphic-design/10-red-modern-illustration-chinese-new-year-festival-poster.png", "Chinese New Year Celebration", "Poster perayaan Tahun Baru Imlek"], ["Timeline Kegiatan AMANPU", "Program timeline", "poster", "../img/graphic-design/11-poster-2.jpg", "Timeline Kegiatan AMANPU", "Linimasa kegiatan AMANPU"], ["Mentoring Quran AMANPU", "Program registration", "poster", "../img/graphic-design/12-poster.jpg", "Mentoring Quran AMANPU", "Poster pendaftaran mentoring Quran"]];
  const root = document.documentElement;
  const grid = document.getElementById("graphicMasonry");
  const empty = document.getElementById("graphicEmpty");
  const filters = [...document.querySelectorAll(".graphic-filter")];
  const lightbox = document.getElementById("graphicLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  let language = localStorage.getItem("portfolioLanguage") === "id" ? "id" : "en";
  let theme = localStorage.getItem("portfolioTheme") === "light" ? "light" : "dark";
  let activeFilter = "all";
  let visibleDesigns = [];
  let activeIndex = 0;

  const labels = {
    banner: {en:"Banner",id:"Banner"}, poster: {en:"Poster",id:"Poster"}, event: {en:"Event graphic",id:"Grafis acara"}
  };
  function setTheme() {
    root.classList.toggle("light-theme", theme === "light");
    const button = document.getElementById("themeToggle");
    button.textContent = theme === "light" ? "☀" : "☾";
    localStorage.setItem("portfolioTheme", theme);
  }
  function setLanguage() {
    root.lang = language;
    root.dataset.language = language;
    document.querySelectorAll("[data-en][data-id]").forEach(el => {
      el.innerHTML = el.dataset[language];
    });
    const toggle = document.getElementById("languageToggle");
    toggle.classList.toggle("is-id", language === "id");
    toggle.setAttribute("aria-pressed", String(language === "id"));
    toggle.setAttribute("aria-label", language === "en" ? "Switch language to Indonesian" : "Ganti bahasa ke Inggris");
    document.title = language === "id" ? "Desain Grafis — Danang Adianto" : "Graphic Design — Danang Adianto";
    render();
  }
  function render() {
    visibleDesigns = designs.filter(item => activeFilter === "all" || item[2] === activeFilter);
    grid.innerHTML = visibleDesigns.map((item, index) => `
      <article class="graphic-card">
        <button type="button" data-index="${index}" aria-label="${language === "id" ? "Lihat desain: " + item[4] : "View design: " + item[0]}">
          <img src="${item[3]}" alt="${language === "id" ? item[5] : item[0]}" loading="lazy" width="1447" height="2048">
          <span class="graphic-card-caption">
            <span><strong>${language === "id" ? item[4] : item[0]}</strong><small>${labels[item[2]][language]}</small></span>
            <span class="arrow" aria-hidden="true">↗</span>
          </span>
        </button>
      </article>`).join("");
    empty.hidden = visibleDesigns.length > 0;
    grid.querySelectorAll("button[data-index]").forEach(button => button.addEventListener("click", () => openLightbox(Number(button.dataset.index))));
  }
  function openLightbox(index) {
    activeIndex = index;
    const item = visibleDesigns[activeIndex];
    lightboxImage.src = item[3];
    lightboxImage.alt = language === "id" ? item[5] : item[0];
    lightboxCaption.textContent = language === "id" ? item[4] : item[0];
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("lightboxClose").focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }
  function moveLightbox(step) {
    if (!visibleDesigns.length) return;
    activeIndex = (activeIndex + step + visibleDesigns.length) % visibleDesigns.length;
    openLightbox(activeIndex);
  }
  filters.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(filter => filter.classList.toggle("active", filter === button));
    render();
  }));
  document.getElementById("themeToggle").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; setTheme(); });
  document.getElementById("languageToggle").addEventListener("click", () => {
    language = language === "en" ? "id" : "en";
    localStorage.setItem("portfolioLanguage", language);
    setLanguage();
  });
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => moveLightbox(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => moveLightbox(1));
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });
  setTheme();
  setLanguage();
})();
