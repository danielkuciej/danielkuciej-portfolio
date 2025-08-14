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
//WHY SECTION CONTENT ANIMATION
///////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.querySelector(".content-bar-list");
  const tabs = document.querySelectorAll(".content-bar-link");
  const contentBoxes = document.querySelectorAll(".section-why .content-box");
  const highlighter = document.querySelector(".highlighter");

  // Funkcja do przesuwania aktywnego okna
  function moveHighlighter(targetTab) {
    const tabRect = targetTab.parentElement.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    const leftPosition = tabRect.left - containerRect.left;
    const width = tabRect.width;

    highlighter.style.width = `${width}px`;
    highlighter.style.transform = `translateX(${leftPosition}px)`;
  }

  // Funkcja do aktywacji zakładki i treści
  function activateTab(tabToActivate) {
    // 1. Obsługa klas aktywności dla linków
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabToActivate.classList.add("active");

    // 2. Przesunięcie aktywnego okna
    moveHighlighter(tabToActivate);

    // 3. Pokazanie odpowiedniej treści
    const tabIndex = Array.from(tabs).indexOf(tabToActivate);
    contentBoxes.forEach((box, index) => {
      if (index === tabIndex) {
        box.classList.remove("hidden");
      } else {
        box.classList.add("hidden");
      }
    });
  }

  // Ustawienie stanu początkowego
  const initialActiveTab =
    document.querySelector(".content-bar-link.active") || tabs[0];
  if (initialActiveTab) {
    // Ukrywamy wszystkie boxy na starcie
    contentBoxes.forEach((box) => box.classList.add("hidden"));
    // Aktywujemy pierwszą zakładkę
    activateTab(initialActiveTab);
  }

  // Obserwowanie kliknięcia w kontenerze zakładek
  tabsContainer.addEventListener("click", function (e) {
    // Sprawdzamy, czy kliknięto
    const clickedTab = e.target.closest(".content-bar-link");
    if (!clickedTab) return;

    // Zapobiegamy domyślnej akcji linku
    e.preventDefault();

    // Aktywujemy klikniętą zakładkę
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
