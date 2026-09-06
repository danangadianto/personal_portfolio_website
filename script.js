document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    const themeToggle = document.getElementById("themeToggle");

    // Mobile navigation
    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
            mainNav.classList.toggle("active");
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Theme
    function setTheme(theme) {
        document.documentElement.classList.toggle("light-theme", theme === "light");
        if (themeToggle) {
            themeToggle.textContent = theme === "light" ? "☀" : "☾";
            themeToggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
        }
        localStorage.setItem("portfolioTheme", theme);
    }

    const savedTheme = localStorage.getItem("portfolioTheme");
    setTheme(savedTheme === "light" ? "light" : "dark");

    themeToggle?.addEventListener("click", () => {
        const isLight = document.documentElement.classList.contains("light-theme");
        setTheme(isLight ? "dark" : "light");
    });

    // Photo modal
    const photoModal = document.getElementById("photoModal");
    const photoModalImg = document.getElementById("photoModalImg");
    const photoModalTitle = document.getElementById("photoModalTitle");
    const photoModalClose = document.getElementById("photoModalClose");

    document.querySelectorAll(".photo-card").forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            if (!img || !photoModal || !photoModalImg || !photoModalTitle) return;

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
    photoModal?.addEventListener("click", e => {
        if (e.target === photoModal) closePhotoModal();
    });

    // Video modal
    const videoModal = document.getElementById("videoModal");
    const videoIframe = document.getElementById("videoModalIframe");
    const videoTitle = document.getElementById("videoModalTitle");
    const videoModalClose = document.getElementById("videoModalClose");

    document.querySelectorAll(".video-card").forEach(card => {
        card.addEventListener("click", () => {
            const videoId = card.dataset.videoId;
            if (!videoId || !videoModal || !videoIframe || !videoTitle) return;

            videoTitle.textContent = card.dataset.title || "Video Preview";
            videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            videoModal.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    function closeVideoModal() {
        videoModal?.classList.remove("open");
        if (videoIframe) videoIframe.src = "";
        document.body.style.overflow = "";
    }

    videoModalClose?.addEventListener("click", closeVideoModal);
    videoModal?.addEventListener("click", e => {
        if (e.target === videoModal) closeVideoModal();
    });

    // Escape closes any modal and mobile nav
    document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;
        closePhotoModal();
        closeVideoModal();
        mainNav?.classList.remove("active");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});
