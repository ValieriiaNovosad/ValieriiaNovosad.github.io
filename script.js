(() => {
  const html = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const nav = document.getElementById("nav");
  const navBurger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  const contactForm = document.getElementById("contactForm");

  const saved = localStorage.getItem("vn-lang");
  const initial = saved === "en" || saved === "ua" ? saved : "ua";
  setLang(initial);

  langToggle?.addEventListener("click", () => {
    setLang(html.lang === "ua" ? "en" : "ua");
  });

  function setLang(lang) {
    html.lang = lang;
    localStorage.setItem("vn-lang", lang);
    if (langToggle) {
      langToggle.textContent = lang === "ua" ? "EN" : "UA";
    }
  }

  window.addEventListener(
    "scroll",
    () => {
      nav?.classList.toggle("scrolled", window.scrollY > 24);
    },
    { passive: true }
  );

  navBurger?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = /** @type {HTMLInputElement} */ (document.getElementById("name"))?.value.trim() || "";
    const email = /** @type {HTMLInputElement} */ (document.getElementById("email"))?.value.trim() || "";
    const message = /** @type {HTMLTextAreaElement} */ (document.getElementById("message"))?.value.trim() || "";
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:valerianovosad500@gmail.com?subject=${subject}&body=${body}`;
  });
})();
