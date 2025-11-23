document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  // Mobile nav toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

        // Close mobile nav after clicking
        if (mainNav && navToggle) {
          mainNav.classList.remove("open");
          navToggle.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Expand / collapse course cards
  document.querySelectorAll(".course-card").forEach((card) => {
    const header = card.querySelector(".course-header");
    header.addEventListener("click", () => {
      const isOpen = card.classList.toggle("open");

      // Optional: close others when opening one
      if (isOpen) {
        document.querySelectorAll(".course-card").forEach((other) => {
          if (other !== card) other.classList.remove("open");
        });
      }
    });
  });

  // Vacancy "Apply now" buttons: open mailto with subject pre-filled
  const applyButtons = document.querySelectorAll(".apply-btn");
  applyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.dataset.role || "Security Role";
      const email = "info@advancesecuritytraining.co.uk";
      const subject = encodeURIComponent(`Application - ${role}`);
      const body = encodeURIComponent(
        `Dear Advance Security Training,\n\nPlease find my CV attached for the ${role} position.\n\nKind regards,\n`
      );

      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  });

  // Current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
