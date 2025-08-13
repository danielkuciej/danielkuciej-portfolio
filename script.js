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

  // Funkcja do przesuwania "bąbelka"
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

    // 2. Przesunięcie "bąbelka"
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

  // Ustawienie stanu początkowego na podstawie domyślnie aktywnej zakładki
  const initialActiveTab =
    document.querySelector(".content-bar-link.active") || tabs[0];
  if (initialActiveTab) {
    // Ukrywamy wszystkie boxy na starcie
    contentBoxes.forEach((box) => box.classList.add("hidden"));
    // Aktywujemy pierwszą zakładkę
    activateTab(initialActiveTab);
  }

  // Nasłuchiwanie na kliknięcia w kontenerze zakładek (delegacja zdarzeń)
  tabsContainer.addEventListener("click", function (e) {
    // Sprawdzamy, czy kliknięto na link
    const clickedTab = e.target.closest(".content-bar-link");
    if (!clickedTab) return;

    // Zapobiegamy domyślnej akcji linku
    e.preventDefault();

    // Aktywujemy klikniętą zakładkę
    activateTab(clickedTab);
  });
});

///////////////////////////////////////////////////////////
// CURRENT YEAR
///////////////////////////////////////////////////////////
const yearEl = document.querySelector(".year");
const newYear = new Date().getFullYear();
yearEl.textContent = newYear;
