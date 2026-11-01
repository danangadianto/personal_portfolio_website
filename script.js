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
  // 3. PHOTO MODAL
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

      photoModalTitle.textContent = card.dataset.title || "Photo Preview";

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

      videoTitle.textContent = card.dataset.title || "Video Preview";

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
  // 6. ANIMATION SYSTEM
  // =====================================================

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Respect visitor accessibility preferences.
  if (prefersReducedMotion) {
    return;
  }

  // =====================================================
  // 7. HERO ELEMENTS
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
  // 8. SCROLL REVEAL CONFIGURATION
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
      selector: ".timeline-item",
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
  // 9. PREPARE SCROLL ELEMENTS
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
  // 10. ACTIVATE ANIMATION CSS
  // =====================================================

  // This class activates the initial hidden states.
  // It is added only after all animation targets are prepared.

  document.documentElement.classList.add("motion-ready");

  // =====================================================
  // 11. START HERO ANIMATION
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
  // 12. SCROLL OBSERVER
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
