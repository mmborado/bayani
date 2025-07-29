document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-btn");
  const nav = document.getElementById("mobile-menu");
  if (!btn || !nav) return;

  // grab the sr-only span and the svg so we can update them
  const srText = btn.querySelector(".sr-only");
  const icon = btn.querySelector("svg");

  let isOpen = false;

  // central function to sync everything
  function updateButtonState(open) {
    // aria-expanded on the button
    btn.setAttribute("aria-expanded", String(open));

    // new label
    const label = open ? "Close navigation menu" : "Open navigation menu";
    btn.setAttribute("aria-label", label);
    srText.textContent = label;

    // swap icon paths
    icon.innerHTML = open
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               d="M6 18L18 6M6 6l12 12"/>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               d="M4 6h16M4 12h16M4 18h16"/>`;
  }

  // toggle handler
  btn.addEventListener("click", () => {
    isOpen = !isOpen;

    // toggle the scale classes
    if (isOpen) {
      nav.classList.replace("scale-y-0", "scale-y-100");
    } else {
      nav.classList.replace("scale-y-100", "scale-y-0");
    }

    updateButtonState(isOpen);
  });

  // utility to close the menu (and sync button)
  const closeNav = () => {
    if (!isOpen) return;
    isOpen = false;
    nav.classList.replace("scale-y-100", "scale-y-0");
    updateButtonState(false);
  };

  // debounce helper
  function debounce(fn, wait = 100) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  const onDesktop = () => {
    if (window.innerWidth >= 768) closeNav();
  };
  window.addEventListener("resize", debounce(onDesktop));

  const form = document.querySelector('form[name="contact"]');
  if (!form) return;

  const select = form.querySelector('select[name="service"]');
  if (!select) return;

  const params = new URLSearchParams(window.location.search);
  const preset = params.get("service");
  if (!preset) return;

  if (
    Array.from(select.options).some(
      (o) => o.value === preset.replaceAll("-", " ")
    )
  ) {
    select.value = preset.replaceAll("-", " ");
  }
});
