/*
 * PHOTOGRAPHY GALLERY
 * File naming: (1).png, (2).png, etc.
 */

// =====================================================
// 1. INDIVIDUAL PHOTO METADATA
// =====================================================

// CITY & ARCHITECTURE
const CITY_PHOTO_DETAILS = {
  1: {
    title: "Urban Perspective",
    location: "Bandung",
    device: "Device not specified",
  },
  2: {
    title: "City Lights",
    location: "Jakarta",
    device: "Device not specified",
  },
  3: {
    title: "Urban Geometry",
    location: "Bandung",
    device: "Device not specified",
  },
};

// WILDLIFE & ZOO
const NATURE_PHOTO_DETAILS = {
  1: {
    title: "Giraffe",
    location: "Ragunan Zoo",
    device: "Canon G16",
  },
  2: {
    title: "Giraffe",
    location: "Ragunan Zoo",
    device: "Canon G16",
  },
  3: {
    title: "Giraffe",
    location: "Ragunan Zoo",
    device: "Canon G16",
  },
  4: {
    title: "A Quiet Encounter",
    location: "Bandung Zoo",
    device: "Device not specified",
  },
};

// EVERYDAY MOMENTS
const DAILY_PHOTO_DETAILS = {
  1: {
    title: "A Quiet Afternoon",
    location: "Bandung",
    device: "Device not specified",
  },
  2: {
    title: "Daily Journey",
    location: "Bandung",
    device: "Device not specified",
  },
  3: {
    title: "Little Details",
    location: "Bandung",
    device: "Device not specified",
  },
};

// =====================================================
// 2. PHOTO CONFIGURATION
// =====================================================

const PHOTO_CONFIG = {
  city: {
    folder: "city",
    count: 5,
    category: "city",
    categoryLabel: "City & Architecture",
    titlePrefix: "City Photograph",
    description: "An urban photograph from the collection.",
    details: CITY_PHOTO_DETAILS,
  },

  nature: {
    folder: "nature",
    count: 369,
    category: "wildlife",
    categoryLabel: "Wildlife & Zoo",
    titlePrefix: "Wildlife Photograph",
    description: "A wildlife photograph from the collection.",
    details: NATURE_PHOTO_DETAILS,
  },

  daily: {
    folder: "daily",
    count: 5,
    category: "everyday",
    categoryLabel: "Everyday Moments",
    titlePrefix: "Everyday Moment",
    description: "An everyday photograph from the collection.",
    details: DAILY_PHOTO_DETAILS,
  },
};

// =====================================================
// 3. PHOTO GENERATOR
// =====================================================

function generatePhotographyItems(config) {
  const items = [];

  for (let number = 1; number <= config.count; number++) {
    const paddedNumber = String(number).padStart(3, "0");
    const details = config.details[number] || {};

    items.push({
      id: `${config.folder}-${number}`,

      title: details.title || `${config.titlePrefix} ${paddedNumber}`,

      category: config.category,
      categoryLabel: config.categoryLabel,

      location: details.location || "Location not specified",
      device: details.device || "Device not specified",
      description: details.description || config.description,

      image: `../images/${config.folder}/(${number}).png`,

      alt: `${details.title || config.categoryLabel} photograph`,
    });
  }

  return items;
}

// =====================================================
// 4. RANDOMIZE ALL PHOTOGRAPHS
// =====================================================

// Load numbered photos whether the filename is "(1).png" or " (1).png".
// The gallery tries the standard filename first, then retries with one
// leading space before the opening parenthesis if the first path is missing.
function setPhotoImageSource(imageElement, imagePath) {
  if (!imageElement || !imagePath) return;

  imageElement.onerror = () => {
    imageElement.onerror = null;

    const spacedPath = imagePath.replace(/\/\((\d+)\)\.png$/i, "/ ($1).png");

    if (spacedPath !== imagePath) {
      imageElement.src = spacedPath;
    }
  };

  imageElement.src = imagePath;
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

const photographyItems = shuffleArray([
  ...generatePhotographyItems(PHOTO_CONFIG.city),
  ...generatePhotographyItems(PHOTO_CONFIG.nature),
  ...generatePhotographyItems(PHOTO_CONFIG.daily),
]);

// =====================================================
// 5. GALLERY SYSTEM
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // DOM ELEMENTS
  const grid = document.getElementById("galleryGrid");
  const emptyState = document.getElementById("galleryEmpty");
  const countLabel = document.getElementById("photoCount");
  const activeCategoryLabel = document.getElementById("activeCategoryLabel");

  const filterButtons = [...document.querySelectorAll(".filter-button")];

  // LIGHTBOX ELEMENTS
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDescription = document.getElementById("lightboxDescription");
  const lightboxIndex = document.getElementById("lightboxIndex");

  const closeButton = document.getElementById("lightboxClose");
  const prevButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  // Check required elements
  if (!grid || !emptyState || !countLabel || !activeCategoryLabel) {
    console.error("Gallery elements are missing.");
    return;
  }

  // STATE
  let activeFilter = "all";
  let visibleItems = [...photographyItems];
  let activeIndex = 0;
  let lastFocusedElement = null;

  const categoryNames = {
    en: {
      all: "All",
      city: "City & Architecture",
      wildlife: "Wildlife & Zoo",
      everyday: "Everyday Moments",
    },
    id: {
      all: "Semua",
      city: "Kota & Arsitektur",
      wildlife: "Satwa Liar & Kebun Binatang",
      everyday: "Momen Sehari-hari",
    },
  };

  const photoTitleTranslations = {
    "Urban Perspective": "Perspektif Perkotaan",
    "City Lights": "Cahaya Kota",
    "Urban Geometry": "Geometri Kota",
    "Giraffe": "Jerapah",
    "A Quiet Encounter": "Pertemuan yang Tenang",
    "A Quiet Afternoon": "Sore yang Tenang",
    "Daily Journey": "Perjalanan Sehari-hari",
    "Little Details": "Detail Kecil",
  };

  const getLanguage = () => window.portfolioLanguage?.() || "en";

  function localizedItemText(item, key) {
    if (getLanguage() !== "id") return item[key];
    if (key === "title") {
      if (photoTitleTranslations[item.title]) return photoTitleTranslations[item.title];
      if (getLanguage() === "id") {
        return item.title
          .replace(/^City Photograph/, "Foto Perkotaan")
          .replace(/^Wildlife Photograph/, "Foto Satwa")
          .replace(/^Everyday Moment/, "Momen Sehari-hari");
      }
      return item.title;
    }
    if (key === "categoryLabel") return categoryNames.id[item.category] || item.categoryLabel;
    if (key === "device" && item.device === "Device not specified") return "Perangkat tidak dicantumkan";
    if (key === "description" && item.description === "An urban photograph from the collection.") return "Foto bertema perkotaan dari koleksi ini.";
    if (key === "description" && item.description === "A wildlife photograph from the collection.") return "Foto satwa liar dari koleksi ini.";
    if (key === "description" && item.description === "An everyday photograph from the collection.") return "Foto momen sehari-hari dari koleksi ini.";
    return item[key];
  }

  // =================================================
  // 6. CATEGORY COUNTS
  // =================================================

  function updateFilterCounts() {
    filterButtons.forEach((button) => {
      const category = button.dataset.filter;

      const count =
        category === "all"
          ? photographyItems.length
          : photographyItems.filter((item) => item.category === category)
              .length;

      const countElement = button.querySelector("span");

      if (countElement) {
        countElement.textContent = count;
      }
    });
  }

  // =================================================
  // 7. ESCAPE HTML
  // =================================================

  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[character],
    );
  }

  // =================================================
  // 8. RENDER GALLERY
  // =================================================

  function renderGallery() {
    visibleItems = photographyItems.filter((item) => {
      return activeFilter === "all" || item.category === activeFilter;
    });

    const language = getLanguage();
    const ui = language === "id"
      ? { view: "Lihat", photograph: "foto", photographs: "foto" }
      : { view: "View", photograph: "photograph", photographs: "photographs" };

    // PHOTO CARDS
    grid.innerHTML = visibleItems
      .map(
        (item, index) => `
      <button
        class="gallery-photo-card"
        type="button"
        data-index="${index}"
        aria-label="${ui.view} ${escapeHTML(localizedItemText(item, "title"))}"
      >
        <img
          data-photo-src="${item.image}"
          alt="${escapeHTML(
            getLanguage() === "id"
              ? `${localizedItemText(item, "title")} — foto ${localizedItemText(item, "categoryLabel")}`
              : item.alt
          )}"
          loading="lazy"
          decoding="async"
        />

        <span class="gallery-card-caption">

          <strong class="gallery-card-title">
            ${escapeHTML(localizedItemText(item, "title"))}
          </strong>

          <span class="gallery-card-location">
            ${escapeHTML(item.location)}
          </span>

          <span class="gallery-card-device">
            ${escapeHTML(localizedItemText(item, "device"))}
          </span>

        </span>
      </button>
    `,
      )
      .join("");

    // Support both "(1).png" and " (1).png" file naming styles.
    grid.querySelectorAll(".gallery-photo-card img").forEach((image) => {
      const card = image.closest(".gallery-photo-card");
      const item = visibleItems[Number(card?.dataset.index)];
      if (item) setPhotoImageSource(image, image.dataset.photoSrc || item.image);
    });

    // EMPTY STATE
    emptyState.hidden = visibleItems.length > 0;

    // PHOTO COUNT
    countLabel.textContent = `${visibleItems.length} ${
      language === "id"
        ? "foto"
        : (visibleItems.length === 1 ? "photograph" : "photographs")
    }`;

    // CATEGORY LABEL
    activeCategoryLabel.textContent = `— ${categoryNames[language][activeFilter]}`;

    // CLICK EVENTS
    grid.querySelectorAll(".gallery-photo-card").forEach((card) => {
      card.addEventListener("click", () => {
        openLightbox(Number(card.dataset.index), card);
      });
    });
  }

  // =================================================
  // 9. OPEN LIGHTBOX
  // =================================================

  function openLightbox(index, trigger) {
    if (!visibleItems.length || !lightbox) return;

    activeIndex = index;
    lastFocusedElement = trigger || document.activeElement;

    updateLightbox();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton?.focus();
  }

  // =================================================
  // 10. UPDATE LIGHTBOX
  // =================================================

  function updateLightbox() {
    const item = visibleItems[activeIndex];

    if (!item) return;

    if (lightboxImage) {
      setPhotoImageSource(lightboxImage, item.image);
      lightboxImage.alt = getLanguage() === "id"
        ? `Foto ${localizedItemText(item, "title")}`
        : `${localizedItemText(item, "title")} photograph`;
    }

    if (lightboxCategory) {
      lightboxCategory.textContent = localizedItemText(item, "categoryLabel");
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = localizedItemText(item, "title");
    }

    if (lightboxDescription) {
      lightboxDescription.textContent = `${item.location} · ${localizedItemText(item, "device")}`;
    }

    if (lightboxIndex) {
      lightboxIndex.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
        visibleItems.length,
      ).padStart(2, "0")}`;
    }

    if (prevButton) {
      prevButton.disabled = visibleItems.length < 2;
    }

    if (nextButton) {
      nextButton.disabled = visibleItems.length < 2;
    }
  }

  // =================================================
  // 11. CLOSE LIGHTBOX
  // =================================================

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    if (lightboxImage) {
      lightboxImage.src = "";
    }

    document.body.style.overflow = "";

    lastFocusedElement?.focus?.();
  }

  // =================================================
  // 12. NEXT / PREVIOUS PHOTO
  // =================================================

  function moveLightbox(direction) {
    if (visibleItems.length < 2) return;

    activeIndex =
      (activeIndex + direction + visibleItems.length) % visibleItems.length;

    updateLightbox();
  }

  // =================================================
  // 13. CATEGORY FILTER
  // =================================================

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach((filter) => {
        const selected = filter === button;

        filter.classList.toggle("active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });

      renderGallery();
    });
  });

  // =================================================
  // 14. LIGHTBOX BUTTONS
  // =================================================

  closeButton?.addEventListener("click", closeLightbox);

  prevButton?.addEventListener("click", () => {
    moveLightbox(-1);
  });

  nextButton?.addEventListener("click", () => {
    moveLightbox(1);
  });

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // =================================================
  // 15. KEYBOARD CONTROLS
  // =================================================

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      moveLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      moveLightbox(1);
    }
  });

  // =================================================
  // 16. INITIALIZATION
  // =================================================

  updateFilterCounts();
  renderGallery();

  document.addEventListener("portfolio:languagechange", () => {
    renderGallery();
    if (lightbox?.classList.contains("open")) {
      updateLightbox();
    }
  });
});


