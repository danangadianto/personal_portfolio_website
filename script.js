document.addEventListener("DOMContentLoaded", function () {
  const viewFullPhoto = document.getElementById("viewFullPhoto");
  const viewFullVideo = document.getElementById("viewFullVideo");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  const themeToggle = document.getElementById("themeToggle");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("active");
    });
  }

  function setTheme(theme) {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
    localStorage.setItem("portfolioTheme", theme);
  }

  const savedTheme = localStorage.getItem("portfolioTheme");
  setTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.classList.contains("light-theme")
        ? "light"
        : "dark";
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  if (viewFullPhoto) {
    viewFullPhoto.addEventListener("click", function () {
      window.location.href = "gallery/photo.html";
    });
  }

  if (viewFullVideo) {
    viewFullVideo.addEventListener("click", function () {
      window.location.href = "gallery/video.html";
    });
  }

  // Photo modal functionality
  const photoCards = document.querySelectorAll(".photo-card");
  const photoModal = document.getElementById("photoModal");
  const photoModalImg = document.getElementById("photoModalImg");
  const photoModalTitle = document.getElementById("photoModalTitle");
  const photoModalClose = document.getElementById("photoModalClose");

  function closePhotoModal() {
    if (photoModal) {
      photoModal.classList.remove("open");
    }
  }

  photoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3").textContent;
      if (img && photoModal && photoModalImg && photoModalTitle) {
        photoModalImg.src = img.src;
        photoModalImg.alt = img.alt;
        photoModalTitle.textContent = title;
        photoModal.classList.add("open");
      }
    });
  });

  if (photoModalClose) {
    photoModalClose.addEventListener("click", closePhotoModal);
  }

  if (photoModal) {
    photoModal.addEventListener("click", (e) => {
      if (e.target === photoModal) {
        closePhotoModal();
      }
    });
  }

  // Video modal functionality
  const videoCards = document.querySelectorAll(".video-card");
  const videoModal = document.getElementById("videoModal");
  const videoModalIframe = document.getElementById("videoModalIframe");
  const videoModalTitle = document.getElementById("videoModalTitle");
  const videoModalClose = document.getElementById("videoModalClose");

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.remove("open");
      if (videoModalIframe) {
        videoModalIframe.src = ""; // Stop video when closing
      }
    }
  }

  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoId = card.getAttribute("data-video-id");
      const title = card.querySelector("h3").textContent;
      if (videoId && videoModal && videoModalIframe && videoModalTitle) {
        videoModalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        videoModalTitle.textContent = title;
        videoModal.classList.add("open");
      }
    });
  });

  if (videoModalClose) {
    videoModalClose.addEventListener("click", closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Video cards now have inline iframes for direct playback
});
