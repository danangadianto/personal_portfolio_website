document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // 1. MOBILE NAVIGATION
  // =====================================================

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const themeToggle = document.getElementById("themeToggle");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";

      navToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("active");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =====================================================
  // 2. THEME SWITCHER
  // =====================================================

  function setTheme(theme) {
    document.documentElement.classList.toggle("light-theme", theme === "light");

    if (themeToggle) {
      themeToggle.textContent = theme === "light" ? "☀" : "☾";

      themeToggle.removeAttribute("title");
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${theme === "light" ? "dark" : "light"} theme`,
      );
    }

    localStorage.setItem("portfolioTheme", theme);
  }

  const savedTheme = localStorage.getItem("portfolioTheme");

  setTheme(savedTheme === "light" ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    const isLight = document.documentElement.classList.contains("light-theme");

    setTheme(isLight ? "dark" : "light");
  });


  // =====================================================
  // 3. BILINGUAL CONTENT SYSTEM
  // =====================================================

  const languageToggle = document.getElementById("languageToggle");

  const translations = {
    en: {
      "#mainNav > a": ["About", "Work", "Experience", "Skills", "Contact"],
      ".hero .eyebrow": "VIDEO EDITOR · CONTENT CREATOR · VISUAL STORYTELLER",
      ".hero h1": 'I turn raw footage into <span>content people want to watch.</span>',
      ".hero-copy": "I edit videos for YouTube, TikTok, Instagram and digital brands — combining clean visuals, strong pacing and purposeful storytelling.",
      ".hero-actions .btn": ["Explore my work <span>↗</span>", "Let's work together"],
      ".hero-meta span": ["<i></i> Based in Indonesia", "Available for freelance projects"],
      "#about .eyebrow": "01 — ABOUT",
      "#about .section-heading h2": "A creative editor with a <em>creator's perspective.</em>",
      ".photo-caption": "Creative work / Indonesia",
      ".about-copy .lead": "I'm Danang, a video editor and content creator who enjoys turning ideas into clear, engaging visual stories.",
      ".about-copy > p:not(.lead)": [
        "My approach goes beyond simply cutting clips together. I pay attention to hooks, pacing, visual rhythm, storytelling and the expectations of each platform so the final video feels intentional from the first frame to the last.",
        "I've worked across video, photography and graphic content, which gives me a broader understanding of how visuals can support a creator, brand or business."
      ],
      ".about-facts strong": ["Video", "Social", "Visual"],
      ".about-facts span": ["Editing & storytelling", "YouTube · TikTok · Instagram", "Photography & design"],
      "#work .eyebrow": "02 — SELECTED WORK",
      "#work .section-heading h2": "Work that speaks for itself.",
      "#work .section-note": "A selection of projects across different formats and styles.",
      "#work .work-gallery-link": 'View all video work <span aria-hidden="true">→</span>',
      "#work .media-tag": ["LONG-FORM", "VLOG", "SOCIAL"],
      "#work .work-card h3": ["Educational Video", "Running Vlog", "Social Reel"],
      "#work .work-card .work-info p": [
        "Long-form editing with a structured, informative flow.",
        "Short-form storytelling built around movement and rhythm.",
        "Fast-paced social content designed for vertical viewing."
      ],
      "#work .subsection-heading .eyebrow": "PHOTOGRAPHY",
      "#work .subsection-heading h3": "A second language of visual storytelling.",
      ".photography-intro": "A curated collection of photographs exploring urban spaces, architecture, nature, wildlife, and everyday moments — observed through composition, light, and timing.",
      "#work .subsection-heading .work-gallery-link": 'View full gallery <span aria-hidden="true">→</span>',
      ".photo-overlay span": ["Bundaran HI", "Golden Light", "Fine Art"],
      ".graphic-design-heading .eyebrow": "GRAPHIC DESIGN",
      ".graphic-design-heading h3": "Visual ideas, shaped into design.",
      ".graphic-design-intro": "A selection of posters, event graphics, school publications, and visual communication projects.",
      ".graphic-privacy-note": "Some names, faces, and personal details have been obscured to respect individual privacy.",
      ".graphic-design-heading .work-gallery-link": 'Explore graphic design <span aria-hidden="true">→</span>',
      ".graphic-preview-card span": ["Alumni Timeline", "Awareness Campaign", "Event Poster"],
      "#experience .eyebrow": "03 — EXPERIENCE",
      "#experience .section-heading h2": "Experience across <em>content & visual media.</em>",
      ".timeline-content h3": ["Video Editor & Photographer", "Content Creator & Video Editor", "Content Designer", "Freelance Photographer"],
      ".timeline-content li": [
        "Created and edited photo/video documentation for school activities and digital publications.",
        "Edited content for YouTube and Instagram while supporting the school's visual communication.",
        "Collaborated with the team on media and promotional needs.",
        "Developed content independently for YouTube and social media.",
        "Handled the process from concept and footage to editing and publishing.",
        "Experimented with hooks, pacing, storytelling and different content formats.",
        "Designed daily Instagram content around finance, economics and technology.",
        "Developed visual concepts based on target audiences and brand identity.",
        "Explored lifestyle, documentary and creative photography.",
        "Focused on composition, lighting and visual storytelling."
      ],
      "#skills .eyebrow": "04 — SKILLS",
      "#skills .section-heading h2": "Great tools help.<br><em>Great thinking makes the difference.</em>",
      "#skills .section-note": "Turning ideas into meaningful content through strategy, storytelling, and visual execution.",
      ".skill-card h3": ["Video Editing", "Content Strategy", "Photography & Design"],
      ".skill-card p": [
        "Storytelling, pacing, hooks, captions, B-roll, transitions and social-first editing.",
        "Content ideas, audience perspective, platform adaptation and visual communication.",
        "Composition, lighting, photo editing and visual assets that support a consistent brand."
      ],
      "#contact .eyebrow": "05 — CONTACT",
      "#contact h2": "Have footage?<br><em>Let's make it worth watching.</em>",
      ".contact-copy > p": "Tell me what you're creating, what you need edited, and where the content will be published. I'll be happy to discuss the best approach.",
      ".cv-link-label": "Download CV",
      ".footer span:nth-child(2)": "Video Editor · Content Creator",
      ".footer-back-label": "Back to top",
      "#photoModal .eyebrow": "PHOTOGRAPHY",
      "#photoModalTitle": "Preview",
      "#photoModalClose": "×",
      "#videoModal .eyebrow": "VIDEO",
      "#videoModalTitle": "Preview",
      "#videoModalClose": "×"
    },
    id: {
      "#mainNav > a": ["Tentang", "Karya", "Pengalaman", "Keahlian", "Kontak"],
      ".hero .eyebrow": "EDITOR VIDEO · KREATOR KONTEN · PENCERITA VISUAL",
      ".hero h1": 'Mengubah rekaman mentah menjadi <span>konten yang ingin ditonton.</span>',
      ".hero-copy": "Saya mengedit video untuk YouTube, TikTok, Instagram, dan berbagai merek digital—dengan visual yang rapi, ritme yang kuat, serta alur cerita yang terarah.",
      ".hero-actions .btn": ['Lihat karya saya <span>↗</span>', "Mari bekerja sama"],
      ".hero-meta span": ["<i></i> Berbasis di Indonesia", "Terbuka untuk proyek freelance"],
      "#about .eyebrow": "01 — TENTANG",
      "#about .section-heading h2": "Editor kreatif dengan <em>sudut pandang seorang kreator.</em>",
      ".photo-caption": "Karya kreatif / Indonesia",
      ".about-copy .lead": "Saya Danang, seorang editor video dan kreator konten yang senang mengubah ide menjadi cerita visual yang jelas dan menarik.",
      ".about-copy > p:not(.lead)": [
        "Bagi saya, proses penyuntingan bukan sekadar menyambungkan klip. Saya memperhatikan hook, tempo, ritme visual, alur cerita, serta karakter setiap platform agar video terasa terarah sejak bingkai pertama hingga terakhir.",
        "Saya pernah mengerjakan video, fotografi, dan konten grafis. Pengalaman tersebut memberi saya pemahaman yang lebih luas tentang bagaimana visual dapat mendukung kreator, merek, maupun bisnis."
      ],
      ".about-facts strong": ["Video", "Media Sosial", "Visual"],
      ".about-facts span": ["Penyuntingan & penceritaan", "YouTube · TikTok · Instagram", "Fotografi & desain"],
      "#work .eyebrow": "02 — KARYA PILIHAN",
      "#work .section-heading h2": "Karya yang mampu berbicara sendiri.",
      "#work .section-note": "Pilihan proyek dari berbagai format dan gaya.",
      "#work .work-gallery-link": 'Lihat semua karya video <span aria-hidden="true">→</span>',
      "#work .media-tag": ["VIDEO PANJANG", "VLOG", "MEDIA SOSIAL"],
      "#work .work-card h3": ["Video Edukasi", "Vlog Lari", "Reel Media Sosial"],
      "#work .work-card .work-info p": [
        "Penyuntingan video berdurasi panjang dengan alur yang terstruktur dan informatif.",
        "Cerita berdurasi singkat yang dibangun melalui gerak dan ritme.",
        "Konten media sosial bertempo cepat yang dirancang untuk format vertikal."
      ],
      "#work .subsection-heading .eyebrow": "FOTOGRAFI",
      "#work .subsection-heading h3": "Bahasa kedua dalam bercerita melalui visual.",
      ".photography-intro": "Kumpulan foto pilihan yang merekam ruang perkotaan, arsitektur, alam, satwa liar, dan momen sehari-hari—melalui komposisi, cahaya, dan ketepatan waktu.",
      "#work .subsection-heading .work-gallery-link": 'Lihat galeri lengkap <span aria-hidden="true">→</span>',
      ".photo-overlay span": ["Bundaran HI", "Cahaya Kota", "Seni Visual"],
      ".graphic-design-heading .eyebrow": "DESAIN GRAFIS",
      ".graphic-design-heading h3": "Ide visual yang diwujudkan menjadi desain.",
      ".graphic-design-intro": "Pilihan poster, grafis acara, publikasi sekolah, dan proyek komunikasi visual.",
      ".graphic-privacy-note": "Beberapa nama, wajah, dan informasi pribadi disamarkan untuk menghormati privasi masing-masing individu.",
      ".graphic-design-heading .work-gallery-link": 'Jelajahi desain grafis <span aria-hidden="true">→</span>',
      ".graphic-preview-card span": ["Linimasa Alumni", "Kampanye Edukasi", "Poster Acara"],
      "#experience .eyebrow": "03 — PENGALAMAN",
      "#experience .section-heading h2": "Pengalaman di bidang <em>konten dan media visual.</em>",
      ".timeline-content h3": ["Editor Video & Fotografer", "Kreator Konten & Editor Video", "Desainer Konten", "Fotografer Lepas"],
      ".timeline-content li": [
        "Membuat dan menyunting dokumentasi foto/video untuk kegiatan sekolah serta publikasi digital.",
        "Menyunting konten YouTube dan Instagram sekaligus mendukung komunikasi visual sekolah.",
        "Berkolaborasi dengan tim dalam kebutuhan media dan promosi.",
        "Mengembangkan konten secara mandiri untuk YouTube dan media sosial.",
        "Menangani proses mulai dari pengembangan konsep dan pengambilan materi hingga penyuntingan dan publikasi.",
        "Bereksperimen dengan hook, tempo, penceritaan, dan berbagai format konten.",
        "Merancang konten Instagram harian seputar keuangan, ekonomi, dan teknologi.",
        "Mengembangkan konsep visual berdasarkan target audiens dan identitas merek.",
        "Mengeksplorasi fotografi gaya hidup, dokumenter, dan kreatif.",
        "Berfokus pada komposisi, pencahayaan, dan penceritaan visual."
      ],
      "#skills .eyebrow": "04 — KEAHLIAN",
      "#skills .section-heading h2": "Perangkat yang tepat membantu.<br><em>Pemikiran yang matang memberi pembeda.</em>",
      "#skills .section-note": "Mengubah ide menjadi konten bermakna melalui strategi, penceritaan, dan eksekusi visual.",
      ".skill-card h3": ["Penyuntingan Video", "Strategi Konten", "Fotografi & Desain"],
      ".skill-card p": [
        "Penceritaan, tempo, hook, takarir, B-roll, transisi, dan penyuntingan yang mengutamakan media sosial.",
        "Ide konten, sudut pandang audiens, adaptasi platform, dan komunikasi visual.",
        "Komposisi, pencahayaan, penyuntingan foto, dan aset visual untuk membangun identitas merek yang konsisten."
      ],
      "#contact .eyebrow": "05 — KONTAK",
      "#contact h2": "Punya materi video?<br><em>Mari buat jadi tontonan yang menarik.</em>",
      ".contact-copy > p": "Ceritakan apa yang sedang Anda buat, bagian apa yang perlu disunting, dan di mana konten tersebut akan dipublikasikan. Saya dengan senang hati akan mendiskusikan pendekatan terbaiknya.",
      ".cv-link-label": "Unduh CV",
      ".footer span:nth-child(2)": "Editor Video · Kreator Konten",
      ".footer-back-label": "Kembali ke atas",
      "#photoModal .eyebrow": "FOTOGRAFI",
      "#photoModalTitle": "Pratinjau",
      "#photoModalClose": "×",
      "#videoModal .eyebrow": "VIDEO",
      "#videoModalTitle": "Pratinjau",
      "#videoModalClose": "×"
    }
  };

  const galleryTranslations = {
    en: {
      photo: {
        nav: ["About", "Work", "Experience", "Contact"],
        heroKicker: "SELECTED PHOTOGRAPHY",
        heroTitle: "Looking closer.<br><em>Seeing differently.</em>",
        heroDescription: "A visual archive of places, details, and moments worth keeping. Browse the collection by subject.",
        metaCollection: "A personal photography collection",
        toolbarEyebrow: "THE COLLECTION",
        toolbarTitle: "Photographs",
        filters: ["All", "City & Architecture", "Wildlife & Zoo", "Everyday Moments"],
        empty: "No photographs found in this category.",
        footnote: "A selection of photographs. More work will be added over time.",
        footer: "Photography / Selected works",
        close: "Close photograph",
        previous: "Previous photograph",
        next: "Next photograph",
        backHome: "Back to home"
      },
      video: {
        nav: ["Home", "About", "Photography", "Video", "Contact"],
        kicker: "02 — VIDEO WORK",
        title: "Work that moves<br><span>with purpose.</span>",
        intro: "A collection of video editing projects across educational content, vlogs, social media, documentaries, and short-form storytelling. Each project is edited with attention to pacing, structure, and visual communication.",
        aria: "Video portfolio",
        footer: "More work available on request.",
        backHome: "Back to home",
        close: "Close video",
        cards: [
          ["Educational", "Educational content about government economic policy, edited with a structured and informative flow."],
          ["Vlog", "A short personal vlog focused on everyday activities, pacing, and natural storytelling."],
          ["Role Play", "A two-role format created for Ramadan, combining simple storytelling with character-based presentation."],
          ["Documentary", "Event and learning activity documentation designed to capture the process and atmosphere of the experience."],
          ["Short Film", "A short horror project exploring atmosphere, visual effects, and tension through editing."],
          ["Edutainment", "An educational guessing-game format about Indonesian provincial capitals, designed to stay engaging and accessible."],
          ["History", "A historical short film built around the theme of Sumpah Pemuda and presented through visual storytelling."]
        ]
      }
    },
    id: {
      photo: {
        nav: ["Tentang", "Karya", "Pengalaman", "Kontak"],
        heroKicker: "PILIHAN FOTOGRAFI",
        heroTitle: "Melihat lebih dekat.<br><em>Memaknai dengan cara berbeda.</em>",
        heroDescription: "Arsip visual berisi tempat, detail, dan momen yang layak dikenang. Jelajahi koleksi berdasarkan tema.",
        metaCollection: "Koleksi fotografi pribadi",
        toolbarEyebrow: "KOLEKSI",
        toolbarTitle: "Foto",
        filters: ["Semua", "Kota & Arsitektur", "Satwa Liar & Kebun Binatang", "Momen Sehari-hari"],
        empty: "Tidak ada foto dalam kategori ini.",
        footnote: "Pilihan karya fotografi. Karya lainnya akan ditambahkan secara berkala.",
        footer: "Fotografi / Karya pilihan",
        close: "Tutup foto",
        previous: "Foto sebelumnya",
        next: "Foto berikutnya",
        backHome: "Kembali ke halaman utama"
      },
      video: {
        nav: ["Beranda", "Tentang", "Fotografi", "Video", "Kontak"],
        kicker: "02 — KARYA VIDEO",
        title: "Karya yang bergerak<br><span>dengan tujuan.</span>",
        intro: "Kumpulan proyek penyuntingan video yang mencakup konten edukasi, vlog, media sosial, dokumenter, dan penceritaan berdurasi singkat. Setiap proyek disunting dengan memperhatikan tempo, struktur, dan komunikasi visual.",
        aria: "Portofolio video",
        footer: "Karya lainnya tersedia berdasarkan permintaan.",
        backHome: "Kembali ke halaman utama",
        close: "Tutup video",
        cards: [
          ["Edukasi", "Konten edukasi mengenai kebijakan ekonomi pemerintah, disunting dengan alur yang terstruktur dan informatif."],
          ["Vlog", "Vlog personal singkat yang berfokus pada aktivitas sehari-hari, tempo, dan penceritaan yang alami."],
          ["Peran Ganda", "Konten Ramadan dengan dua peran yang memadukan penceritaan sederhana dan penyajian berbasis karakter."],
          ["Dokumenter", "Dokumentasi kegiatan dan pembelajaran yang menangkap proses serta suasana pengalaman."],
          ["Film Pendek", "Proyek film horor pendek yang mengeksplorasi suasana, efek visual, dan ketegangan melalui penyuntingan."],
          ["Edutainment", "Format permainan tebak-tebakan edukatif tentang ibu kota provinsi di Indonesia yang dirancang agar menarik dan mudah diikuti."],
          ["Sejarah", "Film pendek bertema sejarah Sumpah Pemuda yang disampaikan melalui penceritaan visual."]
        ]
      }
    }
  };

  function applyTranslations(language) {
    const page = document.body.classList.contains("gallery-page")
      ? (document.querySelector(".gallery-hero-grid") ? "video" : "photo")
      : "main";

    if (page === "main") {
      const dictionary = translations[language];
      Object.entries(dictionary).forEach(([selector, values]) => {
        const elements = [...document.querySelectorAll(selector)];
        if (!elements.length) return;
        const list = Array.isArray(values) ? values : [values];
        elements.forEach((element, index) => {
          const value = list[Math.min(index, list.length - 1)];
          if (value !== undefined) element.innerHTML = value;
        });
      });

      document.title = language === "id"
        ? "Danang Adianto — Editor Video & Kreator Konten"
        : "Danang Adianto — Video Editor & Content Creator";
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = language === "id"
        ? "Danang Adianto — Editor Video, Kreator Konten, Fotografer, dan Pencerita Visual."
        : "Danang Adianto — Video Editor, Content Creator, Photographer and Visual Storyteller.";

      setAttr("#navToggle", "aria-label", language === "id" ? "Buka atau tutup navigasi" : "Toggle navigation");
      setAttr("#themeToggle", "aria-label", language === "id" ? "Ganti tema warna" : "Toggle color theme");
      setAttr("#photoModalClose", "aria-label", language === "id" ? "Tutup foto" : "Close photo");
      setAttr("#videoModalClose", "aria-label", language === "id" ? "Tutup video" : "Close video");
      setAttr(".about-photo-wrap img", "alt", language === "id" ? "Danang Adianto" : "Danang Adianto");
      const workAlts = language === "id"
        ? ["Thumbnail video edukasi", "Thumbnail vlog lari", "Thumbnail reel media sosial"]
        : ["Educational video thumbnail", "Running vlog thumbnail", "Social reel thumbnail"];
      document.querySelectorAll("#work .work-card img").forEach((img, index) => {
        if (workAlts[index]) img.alt = workAlts[index];
      });
      const photoAlts = language === "id"
        ? ["Bundaran HI pada malam hari", "Pemandangan cahaya kota", "Foto seni visual bunga"]
        : ["Bundaran HI", "Golden Light", "Fine Art"];
      document.querySelectorAll("#work .photo-card img").forEach((img, index) => {
        if (photoAlts[index]) img.alt = photoAlts[index];
      });
      const playLabels = language === "id"
        ? ["Putar Video Edukasi", "Putar Vlog Lari", "Putar Reel Media Sosial"]
        : ["Play Educational Video", "Play Running Vlog", "Play Social Reel"];
      document.querySelectorAll("#work .play-button").forEach((button, index) => {
        if (playLabels[index]) button.setAttribute("aria-label", playLabels[index]);
      });

      document.querySelectorAll(".video-card").forEach((card) => {
        card.dataset.displayTitle = translateVideoTitle(card.dataset.title, language);
      });
      const photoTitles = language === "id"
        ? { "Bundaran HI": "Bundaran HI", "Golden Light": "Cahaya Kota", "Fine Art": "Seni Visual" }
        : { "Bundaran HI": "Bundaran HI", "Golden Light": "Golden Light", "Fine Art": "Fine Art" };
      document.querySelectorAll(".photo-card").forEach((card) => {
        card.dataset.displayTitle = photoTitles[card.dataset.title] || card.dataset.title;
      });
    } else if (page === "photo") {
      const t = galleryTranslations[language].photo;
      const navLinks = [...document.querySelectorAll("#mainNav > a")];
      navLinks.forEach((link, i) => { if (t.nav[i]) link.textContent = t.nav[i]; });
      setText(".gallery-hero .eyebrow", t.heroKicker);
      setHTML(".gallery-hero h1", t.heroTitle);
      setText(".gallery-description", t.heroDescription);
      setHTML(".gallery-meta span:first-child", "<i></i> " + t.metaCollection);
      setText(".gallery-toolbar .eyebrow", t.toolbarEyebrow);
      setText(".gallery-toolbar h2", t.toolbarTitle + " <span id='activeCategoryLabel'>— " + (language === "id" ? "Semua" : "All") + "</span>", true);
      const filters = [...document.querySelectorAll(".filter-button")];
      filters.forEach((button, i) => {
        const count = button.querySelector("span")?.textContent || "";
        button.innerHTML = `${t.filters[i]} <span>${count}</span>`;
      });
      setText("#galleryEmpty", t.empty);
      setText(".gallery-footnote", t.footnote);
      setText(".gallery-footer span:nth-child(2)", t.footer);
      setAttr("#lightboxClose", "aria-label", t.close);
      setAttr("#lightboxPrev", "aria-label", t.previous);
      setAttr("#lightboxNext", "aria-label", t.next);
      setAttr("#galleryLightbox", "aria-label", language === "id" ? "Penampil foto" : "Photograph viewer");
      setAttr(".gallery-filters", "aria-label", language === "id" ? "Saring foto berdasarkan kategori" : "Filter photographs by category");
      setAttr("#navToggle", "aria-label", language === "id" ? "Buka atau tutup navigasi" : "Toggle navigation");
      setAttr("#themeToggle", "aria-label", language === "id" ? "Ganti tema warna" : "Toggle color theme");
      setAttr(".floating-home", "aria-label", t.backHome);
      setAttr(".floating-home", "title", t.backHome);
      document.title = language === "id" ? "Galeri Fotografi — Danang Adianto" : "Photography Gallery — Danang Adianto";
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = language === "id"
        ? "Pilihan fotografi Danang Adianto — kota, arsitektur, satwa liar, dan momen sehari-hari."
        : "Selected photography by Danang Adianto — city, architecture, wildlife and everyday moments.";
    } else {
      const t = galleryTranslations[language].video;
      const navLinks = [...document.querySelectorAll("#mainNav > a")];
      navLinks.forEach((link, i) => { if (t.nav[i]) link.textContent = t.nav[i]; });
      setText(".gallery-kicker", t.kicker);
      setHTML(".gallery-hero h1", t.title);
      setText(".gallery-intro", t.intro);
      setAttr(".gallery-section", "aria-label", t.aria);
      setText(".gallery-footer-note", t.footer);
      setAttr("#navToggle", "aria-label", language === "id" ? "Buka atau tutup navigasi" : "Toggle menu");
      setAttr("#themeToggle", "aria-label", language === "id" ? "Ganti tema warna" : "Toggle theme");
      setAttr("#videoModalClose", "aria-label", t.close);
      setAttr("#videoModalIframe", "title", language === "id" ? "Pemutar video" : "Video player");
      setAttr(".floating-home", "aria-label", t.backHome);
      setAttr(".floating-home", "title", t.backHome);
      setAttr("#videoModalClose", "aria-label", t.close);
      document.querySelectorAll(".gallery-card").forEach((card, index) => {
        const pair = t.cards[index];
        if (!pair) return;
        const tag = card.querySelector(".gallery-tag");
        const description = card.querySelector(".gallery-info p");
        const image = card.querySelector(".gallery-media img");
        if (tag) tag.textContent = pair[0];
        if (description) description.textContent = pair[1];
        if (image) {
          const title = translateVideoTitle(card.dataset.title, language);
          image.alt = language === "id" ? `Thumbnail untuk ${title}` : `Thumbnail for ${title}`;
        }
        card.dataset.displayTitle = translateVideoTitle(card.dataset.title, language);
      });
      document.title = language === "id" ? "Karya Video — Danang Adianto" : "Video Work — Danang Adianto";
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = language === "id"
        ? "Pilihan karya penyuntingan video Danang Adianto — konten edukasi, vlog, film pendek, konten sosial, dan dokumenter."
        : "Selected video editing work by Danang Adianto — educational content, vlogs, short films, social content, and documentary-style projects.";
    }

    document.documentElement.lang = language === "id" ? "id" : "en";
    document.documentElement.dataset.language = language;

    if (languageToggle) {
      languageToggle.classList.toggle("is-id", language === "id");
      languageToggle.setAttribute("aria-pressed", String(language === "id"));
      languageToggle.setAttribute(
        "aria-label",
        language === "id" ? "Ganti bahasa ke Inggris" : "Switch language to Indonesian"
      );
    }

    window.dispatchEvent(new CustomEvent("portfolio:languagechange", {
      detail: { language }
    }));
  }

  function setText(selector, value, asHTML = false) {
    const element = document.querySelector(selector);
    if (!element) return;
    if (asHTML) element.innerHTML = value;
    else element.textContent = value;
  }

  function setHTML(selector, value) {
    setText(selector, value, true);
  }

  function setAttr(selector, attribute, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.setAttribute(attribute, value);
    });
  }

  function translateVideoTitle(title, language) {
    if (language !== "id") return title;
    const titles = {
      "Educational Video": "Video Edukasi",
      "Running Vlog": "Vlog Lari",
      "Social Reel": "Reel Media Sosial",
      "Personal Education Edit": "Suntingan Video Edukasi Personal",
      "Personal Vlog": "Vlog Personal",
      "Ramadan Content": "Konten Ramadan",
      "School Activity Documentation": "Dokumentasi Kegiatan Sekolah",
      "Mini Short Film — Horror": "Film Pendek Mini — Horor",
      "Educational Fun Content": "Konten Edukasi Interaktif",
      "Short Film — Youth Pledge": "Film Pendek — Sumpah Pemuda",
      "Photo Preview": "Pratinjau Foto"
    };
    return titles[title] || title;
  }

  function setLanguage(language) {
    const selected = language === "id" ? "id" : "en";
    localStorage.setItem("portfolioLanguage", selected);
    applyTranslations(selected);
  }

  const savedLanguage = localStorage.getItem("portfolioLanguage");
  setLanguage(savedLanguage === "id" ? "id" : "en");

  languageToggle?.addEventListener("click", () => {
    const current = document.documentElement.dataset.language || "en";
    setLanguage(current === "en" ? "id" : "en");
  });

  // Keep language API available to page-specific scripts.
  window.portfolioLanguage = () => document.documentElement.dataset.language || "en";
  window.setPortfolioLanguage = setLanguage;

  // =====================================================
  // 4. PHOTO MODAL
  // =====================================================

  const photoModal = document.getElementById("photoModal");
  const photoModalImg = document.getElementById("photoModalImg");
  const photoModalTitle = document.getElementById("photoModalTitle");
  const photoModalClose = document.getElementById("photoModalClose");

  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");

      if (!img || !photoModal || !photoModalImg || !photoModalTitle) {
        return;
      }

      photoModalImg.src = img.src;
      photoModalImg.alt = img.alt;

      photoModalTitle.textContent = card.dataset.displayTitle || card.dataset.title || "Photo Preview";

      photoModal.classList.add("open");

      document.body.style.overflow = "hidden";
    });
  });

  function closePhotoModal() {
    photoModal?.classList.remove("open");

    document.body.style.overflow = "";
  }

  photoModalClose?.addEventListener("click", closePhotoModal);

  photoModal?.addEventListener("click", (event) => {
    if (event.target === photoModal) {
      closePhotoModal();
    }
  });

  // =====================================================
  // 4. VIDEO MODAL
  // =====================================================

  const videoModal = document.getElementById("videoModal");
  const videoIframe = document.getElementById("videoModalIframe");
  const videoTitle = document.getElementById("videoModalTitle");
  const videoModalClose = document.getElementById("videoModalClose");

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      const videoId = card.dataset.videoId;

      if (!videoId || !videoModal || !videoIframe || !videoTitle) {
        return;
      }

      videoTitle.textContent = card.dataset.displayTitle || card.dataset.title || "Video Preview";

      videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

      videoModal.classList.add("open");

      document.body.style.overflow = "hidden";
    });
  });

  function closeVideoModal() {
    videoModal?.classList.remove("open");

    if (videoIframe) {
      videoIframe.src = "";
    }

    document.body.style.overflow = "";
  }

  videoModalClose?.addEventListener("click", closeVideoModal);

  videoModal?.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeVideoModal();
    }
  });

  // =====================================================
  // 5. KEYBOARD CONTROLS
  // =====================================================

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closePhotoModal();
    closeVideoModal();

    mainNav?.classList.remove("active");

    navToggle?.setAttribute("aria-expanded", "false");
  });

  // =====================================================
  // 6. FLOATING BACK TO TOP
  // =====================================================

  const backToTop = document.getElementById("backToTop");
  const reducedMotionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (backToTop) {
    const updateBackToTop = () => {
      const shouldShow = window.scrollY > 400;

      backToTop.classList.toggle("is-visible", shouldShow);
      backToTop.setAttribute("aria-hidden", String(!shouldShow));
      backToTop.tabIndex = shouldShow ? 0 : -1;
    };

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotionPreference.matches ? "auto" : "smooth",
      });
    });

    window.addEventListener("scroll", updateBackToTop, {
      passive: true,
    });

    updateBackToTop();
  }


  // =====================================================
  // 7. ANIMATION SYSTEM
  // =====================================================

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Respect visitor accessibility preferences.
  if (prefersReducedMotion) {
    return;
  }

  // =====================================================
  // 8. HERO ELEMENTS
  // =====================================================

  const hero = document.querySelector(".hero");

  const heroContent = hero?.querySelector(".hero-content");

  const heroVisual = hero?.querySelector(".hero-visual");

  // -----------------------------------------------------
  // HERO TEXT: LEFT TO RIGHT
  // -----------------------------------------------------

  if (heroContent) {
    const heroTextElements = [...heroContent.children];

    heroTextElements.forEach((element, index) => {
      element.dataset.heroReveal = "true";

      element.style.setProperty("--motion-delay", `${index * 130}ms`);
    });
  }

  // -----------------------------------------------------
  // HERO VISUAL: SEPARATE STARTING POSITIONS
  // -----------------------------------------------------

  const heroPieces = [
    heroVisual?.querySelector(".hero-frame"),

    heroVisual?.querySelector(".hero-orbit-one"),

    heroVisual?.querySelector(".hero-orbit-two"),
  ].filter(Boolean);

  // =====================================================
  // 9. SCROLL REVEAL CONFIGURATION
  // =====================================================

  const revealGroups = [
    // ABOUT SECTION

    {
      selector: "#about > .section-heading",
      direction: "left",
    },

    {
      selector: ".about-photo-wrap",
      direction: "left",
    },

    {
      selector: ".about-copy",
      direction: "right",
    },

    // WORK SECTION

    {
      selector: "#work > .section-heading",
      direction: "left",
    },

    {
      selector: ".work-card",
      direction: "up",
      stagger: 110,
    },

    {
      selector: "#work .section-actions",
      direction: "up",
    },

    {
      selector: "#work .subsection-heading",
      direction: "left",
    },

    {
      selector: ".photo-card",
      direction: "up",
      stagger: 100,
    },

    // EXPERIENCE SECTION

    {
      selector: "#experience > .section-heading",
      direction: "left",
    },

    {
      selector: ".roadmap-item",
      direction: "right",
      stagger: 100,
    },

    // SKILLS SECTION

    {
      selector: "#skills > .section-heading",
      direction: "left",
    },

    {
      selector: ".skill-card",
      direction: "up",
      stagger: 110,
    },


    // CONTACT SECTION

    {
      selector: ".contact-inner > div:first-child",
      direction: "left",
    },

    {
      selector: ".contact-copy",
      direction: "right",
    },
  ];

  // =====================================================
  // 10. PREPARE SCROLL ELEMENTS
  // =====================================================

  const revealElements = [];

  revealGroups.forEach((group) => {
    document.querySelectorAll(group.selector).forEach((element, index) => {
      // Prevent duplicate animation registration.
      if (element.dataset.scrollReveal) return;

      element.dataset.scrollReveal = group.direction;

      element.style.setProperty(
        "--motion-delay",
        `${(group.stagger || 0) * index}ms`,
      );

      revealElements.push(element);
    });
  });

  // =====================================================
  // 11. ACTIVATE ANIMATION CSS
  // =====================================================

  // This class activates the initial hidden states.
  // It is added only after all animation targets are prepared.

  document.documentElement.classList.add("motion-ready");

  // =====================================================
  // 12. START HERO ANIMATION
  // =====================================================

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Text appears from the left.
      heroContent?.querySelectorAll("[data-hero-reveal]").forEach((element) => {
        element.classList.add("is-visible");
      });

      // Photo, frame and decorative circles converge.
      heroPieces.forEach((element) => {
        element.classList.add("is-visible");
      });
    });
  });

  // =====================================================
  // 13. SCROLL OBSERVER
  // =====================================================

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          // Animation happens only once.
          observer.unobserve(entry.target);
        });
      },

      {
        threshold: 0.14,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    // Observe all elements below the hero.
    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers.
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }
});
