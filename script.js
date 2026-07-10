(() => {
  const html = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const nav = document.getElementById("nav");
  const navBurger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  const contactForm = document.getElementById("contactForm");
  const progress = document.getElementById("scrollProgress");

  const saved = localStorage.getItem("vn-lang");
  setLang(saved === "en" || saved === "ua" ? saved : "ua");

  langToggle?.addEventListener("click", () => {
    setLang(html.lang === "ua" ? "en" : "ua");
  });

  function setLang(lang) {
    html.lang = lang;
    localStorage.setItem("vn-lang", lang);
    if (langToggle) langToggle.textContent = lang === "ua" ? "EN" : "UA";
    document.querySelectorAll(".lang-ua").forEach((el) => {
      el.hidden = lang !== "ua";
    });
    document.querySelectorAll(".lang-en").forEach((el) => {
      el.hidden = lang !== "en";
    });
  }

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 16);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = `${pct}%`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navBurger?.addEventListener("click", () => navLinks?.classList.toggle("open"));
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 0.06}s`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:valerianovosad500@gmail.com?subject=${subject}&body=${body}`;
  });
})();
