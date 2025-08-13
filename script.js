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
