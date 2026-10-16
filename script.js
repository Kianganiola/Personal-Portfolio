/* ==========================================================
   Portfolio interactivity
   Features: 1) Hamburger menu  2) Dark/light mode toggle
   (Smooth scrolling is done in style.css: scroll-behavior)
   ========================================================== */

// Wait until the HTML is fully loaded before running any code
document.addEventListener("DOMContentLoaded", function () {

  // Grab the elements we need
  var menuToggle = document.getElementById("menu-toggle");   // hamburger button
  var siteNav = document.getElementById("site-nav");         // navigation panel
  var themeToggle = document.getElementById("theme-toggle"); // dark/light button
  var themeIcon = document.getElementById("theme-icon");     // icon inside the button
  var root = document.documentElement;                       // the <html> element

  /* ---------- Hamburger menu ---------- */

  // Open or close the mobile menu and update accessibility attributes
  function setMenu(isOpen) {
    siteNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  // Clicking the hamburger flips the menu open/closed
  menuToggle.addEventListener("click", function () {
    setMenu(!siteNav.classList.contains("open"));
  });

  // Close the menu after a nav link is clicked
  siteNav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      setMenu(false);
    }
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  /* ---------- Dark / light mode ---------- */

  // Apply a theme ("light" or "dark"), update the button, and remember it
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    try {
      localStorage.setItem("theme", theme); // save the choice for next visit
    } catch (error) {
      // Storage may be blocked; the toggle still works for this visit
    }
  }

  // Decide the starting theme: saved choice first, then the system setting
  function getStartingTheme() {
    try {
      var saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {
      // Ignore storage errors and use the system preference below
    }
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  // Clicking the toggle switches to the opposite theme
  themeToggle.addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  // Set the theme when the page first loads
  applyTheme(getStartingTheme());

});