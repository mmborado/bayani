document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-btn");
  const nav = document.getElementById("mobile-menu");
  if (!btn || !nav) return; // 1) guard against missing elements

  // 2) toggle open/closed state
  btn.addEventListener("click", () => {
    // you could replace both toggles with a single class swap:
    if (nav.classList.contains("scale-y-0")) {
      nav.classList.replace("scale-y-0", "scale-y-100");
    } else {
      nav.classList.replace("scale-y-100", "scale-y-0");
    }
  });

  // 3) utility to close the menu
  const closeNav = () => {
    nav.classList.replace("scale-y-100", "scale-y-0");
  };

  // 4) debounce helper so resize handler isn’t called nonstop
  function debounce(fn, wait = 100) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  // 5) use matchMedia or a debounced resize to auto-close on desktop
  const onDesktop = () => {
    if (window.innerWidth >= 768) closeNav();
  };
  window.addEventListener("resize", debounce(onDesktop));
});
