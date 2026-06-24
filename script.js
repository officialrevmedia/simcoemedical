/* ============================================================
   Simcoe Medical Clinic - interactions
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var body = document.body;
  var burger = document.getElementById("burger");
  function closeMenu() {
    body.classList.remove("menu-open", "no-scroll");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  function toggleMenu() {
    var open = body.classList.toggle("menu-open");
    body.classList.toggle("no-scroll", open);
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (burger) burger.addEventListener("click", toggleMenu);
  document.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && body.classList.contains("menu-open")) closeMenu();
  });

  /* ---------- Header scrolled + scroll progress + back to top ---------- */
  var header = document.getElementById("header");
  var prog = document.getElementById("scrollProg");
  var toTop = document.getElementById("toTop");
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    if (toTop) toTop.classList.toggle("show", y > 600);
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }
  window.addEventListener("scroll", requestScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-s, .img-reveal, .step");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ accordion (single open) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          var oa = other.querySelector(".faq-a");
          var oq = other.querySelector(".faq-q");
          if (oa) oa.style.maxHeight = null;
          if (oq) oq.setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
        q.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq-item.open .faq-a").forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + "px";
    });
  });

  /* ---------- Smooth scroll with header offset ---------- */
  function headerOffset() {
    var h = header ? header.offsetHeight : 78;
    return h + 14;
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------- Active nav highlight ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sectionMap = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#" && id.length > 1) {
      var sec = document.querySelector(id);
      if (sec) sectionMap[id] = { link: link, sec: sec };
    }
  });
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = "#" + en.target.id;
        if (sectionMap[id] && en.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          sectionMap[id].link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(sectionMap).forEach(function (id) { navIO.observe(sectionMap[id].sec); });
  }

  /* ---------- Subtle parallax on hero media ---------- */
  if (!reduce) {
    var hm = document.querySelector(".hero-media img");
    if (hm) {
      window.addEventListener("scroll", function () {
        var y = window.pageYOffset;
        if (y < window.innerHeight) {
          hm.style.transform = "translateY(" + (y * 0.06) + "px) scale(1.05)";
        }
      }, { passive: true });
    }
  }

  /* ---------- Placeholder actions ---------- */
  document.querySelectorAll("[data-form-download]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      alert("New patient registration form: link the clinic's registration PDF here.");
    });
  });
  document.querySelectorAll("[data-booking]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var who = el.getAttribute("data-booking");
      alert("Online booking (" + who + " doctor): connect your booking system link here.");
    });
  });
})();
