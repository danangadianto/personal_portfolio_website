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

  const videoCards = document.querySelectorAll(".video-card");
  const modal = document.getElementById("videoModal");
  const videoWrapper = document.getElementById("videoWrapper");
  const modalClose = document.getElementById("modalClose");

  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
    }
    if (videoWrapper) {
      videoWrapper.innerHTML = "";
    }
  }

  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-video-id");
      if (id && modal && videoWrapper) {
        videoWrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        modal.classList.add("open");
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});
