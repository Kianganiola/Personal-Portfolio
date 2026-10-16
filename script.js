
document.addEventListener("DOMContentLoaded", function () {

  var menuToggle = document.getElementById("menu-toggle");   
  var siteNav = document.getElementById("site-nav");         
  var themeToggle = document.getElementById("theme-toggle"); 
  var themeIcon = document.getElementById("theme-icon");     
  var root = document.documentElement;                      

  
  function setMenu(isOpen) {
    siteNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  menuToggle.addEventListener("click", function () {
    setMenu(!siteNav.classList.contains("open"));
  });

  siteNav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
    }
  }


  function getStartingTheme() {
    try {
      var saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {
    }
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  themeToggle.addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  applyTheme(getStartingTheme());

});