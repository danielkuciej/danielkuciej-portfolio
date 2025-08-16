"use script";

///////////////////////////////////////////////////////////
// STICKY NAVIGATION
///////////////////////////////////////////////////////////
const heroSectionEl = document.querySelector(".section-hero");
const bodyEl = document.body;

const observe = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) bodyEl.classList.add("sticky");
    else bodyEl.classList.remove("sticky");
  },

  {
    root: null,
    threshold: 0,
    rootMargin: "-18px",
  }
);
observe.observe(heroSectionEl);

const headerEl = document.querySelector(".header");
const sectionsObserve = document.querySelectorAll("[data-nav-color]");

const colorObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const navColor = entry.target.dataset.navColor;

        headerEl.classList.remove("nav-dark", "nav-light");
        headerEl.classList.add(`nav-${navColor}`);
      }
    });
  },
  {
    rootMargin: "0px 0px -90% 0px",
  }
);

sectionsObserve.forEach((section) => {
  colorObserver.observe(section);
});

///////////////////////////////////////////////////////////
//MOBILE NAVIGATION
///////////////////////////////////////////////////////////
const btnNavEl = document.querySelector(".btn-mobile-nav");
const allLinks = document.querySelectorAll("a:link");
console.log(allLinks);

btnNavEl.addEventListener("click", function () {
  document.body.classList.toggle("nav-open");
});

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    if (href === "#" || href.startsWith("#")) e.preventDefault();

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-link-nav")) {
      if (document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
      }
    }
  });
});

///////////////////////////////////////////////////////////
//WHY SECTION CONTENT ANIMATION
///////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", function () {
//   const tabsContainer = document.querySelector(".content-bar-list");
//   const tabs = document.querySelectorAll(".content-bar-link");
//   const contentBoxes = document.querySelectorAll(".section-why .content-box");
//   const highlighter = document.querySelector(".highlighter");

//   // Funkcja do przesuwania aktywnego okna
//   function moveHighlighter(targetTab) {
//     const tabRect = targetTab.parentElement.getBoundingClientRect();
//     const containerRect = tabsContainer.getBoundingClientRect();

//     const leftPosition = tabRect.left - containerRect.left;
//     const width = tabRect.width;

//     highlighter.style.width = `${width}px`;
//     highlighter.style.transform = `translateX(${leftPosition}px)`;
//   }

//   // Funkcja do aktywacji zakładki i treści
//   function activateTab(tabToActivate) {
//     // 1. Obsługa klas aktywności dla linków
//     tabs.forEach((tab) => tab.classList.remove("active"));
//     tabToActivate.classList.add("active");

//     // 2. Przesunięcie aktywnego okna
//     moveHighlighter(tabToActivate);

//     // 3. Pokazanie odpowiedniej treści
//     const tabIndex = Array.from(tabs).indexOf(tabToActivate);
//     contentBoxes.forEach((box, index) => {
//       if (index === tabIndex) {
//         box.classList.remove("hidden");
//       } else {
//         box.classList.add("hidden");
//       }
//     });
//   }

//   // Ustawienie stanu początkowego
//   const initialActiveTab =
//     document.querySelector(".content-bar-link.active") || tabs[0];
//   if (initialActiveTab) {
//     // Ukrywamy wszystkie boxy na starcie
//     contentBoxes.forEach((box) => box.classList.add("hidden"));
//     // Aktywujemy pierwszą zakładkę
//     activateTab(initialActiveTab);
//   }

//   // Obserwowanie kliknięcia w kontenerze zakładek
//   tabsContainer.addEventListener("click", function (e) {
//     // Sprawdzamy, czy kliknięto
//     const clickedTab = e.target.closest(".content-bar-link");
//     if (!clickedTab) return;

//     // Zapobiegamy domyślnej akcji linku
//     e.preventDefault();

//     // Aktywujemy klikniętą zakładkę
//     activateTab(clickedTab);
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.querySelector(".content-bar-list");
  const tabs = document.querySelectorAll(".content-bar-link");
  const contentBoxes = document.querySelectorAll(".section-why .content-box");
  const highlighter = document.querySelector(".highlighter");

  // === ZMODYFIKOWANA FUNKCJA ===
  function moveHighlighter(targetTab) {
    const tabRect = targetTab.parentElement.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    // Sprawdzamy, jaki jest aktualny kierunek layoutu w CSS
    const layoutDirection = getComputedStyle(tabsContainer).flexDirection;

    if (layoutDirection === "column") {
      // --- LOGIKA DLA UKŁADU PIONOWEGO (MOBILE) ---
      const topPosition = tabRect.top - containerRect.top;
      const height = tabRect.height;

      highlighter.style.height = `${height}px`;
      highlighter.style.width = "100%"; // Upewniamy się, że szerokość jest pełna
      highlighter.style.transform = `translateY(${topPosition}px)`;
    } else {
      // --- LOGIKA DLA UKŁADU POZIOMEGO (DESKTOP) ---
      const leftPosition = tabRect.left - containerRect.left;
      const width = tabRect.width;

      highlighter.style.width = `${width}px`;
      highlighter.style.height = "100%"; // Upewniamy się, że wysokość jest pełna
      highlighter.style.transform = `translateX(${leftPosition}px)`;
    }
  }

  // Funkcja aktywacji (bez zmian)
  function activateTab(tabToActivate) {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabToActivate.classList.add("active");
    moveHighlighter(tabToActivate);
    const tabIndex = Array.from(tabs).indexOf(tabToActivate);
    contentBoxes.forEach((box, index) => {
      box.classList.toggle("hidden", index !== tabIndex);
    });
  }

  // Ustawienie stanu początkowego (bez zmian)
  const initialActiveTab =
    document.querySelector(".content-bar-link.active") || tabs[0];
  if (initialActiveTab) {
    contentBoxes.forEach((box) => box.classList.add("hidden"));
    activateTab(initialActiveTab);
  }

  // Obserwowanie kliknięcia (bez zmian)
  tabsContainer.addEventListener("click", function (e) {
    const clickedTab = e.target.closest(".content-bar-link");
    if (!clickedTab) return;
    e.preventDefault();
    activateTab(clickedTab);
  });
});

///////////////////////////////////////////////////////////
// MODAL
///////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("portfolio-modal");
  const modalImage = modal.querySelector(".modal-image");
  const closeButton = modal.querySelector(".modal-close-btn");
  const overlay = modal.querySelector(".modal-overlay");
  const portfolioTriggers = document.querySelectorAll(".port-trigger");

  // Funkcja otwierania modala
  function openModal(fullImagePath) {
    modalImage.src = fullImagePath;
    modal.classList.add("is-visible");
    document.body.classList.add("body-no-scroll");
  }

  // Funkcja zamykania modala
  function closeModal() {
    modal.classList.remove("is-visible");
    document.body.classList.remove("body-no-scroll");
  }

  portfolioTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const fullImage = this.dataset.fullImage;
      openModal(fullImage);
    });
  });

  // Zamykanie modala po kliknięciu w X, tło lub Esc
  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });
});

///////////////////////////////////////////////////////////
// COLLABORATION CARD ANIMATION
///////////////////////////////////////////////////////////
const cards = document.querySelectorAll(".stage-content");

// Nasłuchiwanie na kliknięcie
cards.forEach((clickedCard) => {
  clickedCard.addEventListener("click", function (event) {
    event.stopPropagation();

    // Pętla zamykająca inne otwarte karty
    cards.forEach((card) => {
      if (card !== clickedCard) {
        card.classList.remove("is-flipped");
      }
    });

    this.classList.toggle("is-flipped");
  });
});

// Nasłuchiwanie na kliknięcie w cały dokument
document.addEventListener("click", function (event) {
  if (!event.target.closest(".stage-content")) {
    cards.forEach((card) => {
      card.classList.remove("is-flipped");
    });
  }
});

///////////////////////////////////////////////////////////
// CURRENT YEAR
///////////////////////////////////////////////////////////
const yearEl = document.querySelector(".year");
const newYear = new Date().getFullYear();
yearEl.textContent = newYear;
