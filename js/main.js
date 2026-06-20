const WHATSAPP_NUMBER = "5731136218094";
const MAP_QUERY = "Calle 52 # 11d-38 B/Villacolombia, Cali Colombia";

const faqAnswers = [
  {
    keys: ["plan mensual", "mensualidad", "$120.000", "120 mil"],
    answer: "El plan mensual cuesta $120.000. Incluye acceso al gimnasio, acompanamiento de rutina y una clase de cortesia. Puedes inscribirte cuando quieras."
  },
  {
    keys: ["plan trimestral", "trimestre", "$320.000", "320 mil"],
    answer: "El plan trimestral cuesta $320.000 (3 meses). Mejor precio por mes y seguimiento de progreso incluido."
  },
  {
    keys: ["plan semestral", "semestre", "$600.000", "600 mil"],
    answer: "El plan semestral cuesta $600.000 (6 meses). Es el mas elegido porque tiene el mejor valor por mes, prioridad en clases grupales y beneficios en suplementos."
  },
  {
    keys: ["plan anual", "año", "anual", "$850.000", "850 mil"],
    answer: "El plan anual cuesta $850.000 (12 meses). Es el de mayor ahorro, incluye comunidad, retos internos y beneficios en suplementos."
  },
  {
    keys: ["plan pareja", "pareja", "dos personas", "$200.000", "200 mil"],
    answer: "El plan pareja cuesta $200.000 para 2 personas. Incluye acceso al gimnasio, acompanamiento de rutina y clase de cortesia para ambos."
  },
  {
    keys: ["plan referido", "referido", "$108.000", "108 mil", "descuento"],
    answer: "El plan referido cuesta $108.000 (10% de descuento sobre la mensualidad). Aplica por persona referida y no es acumulable."
  },
  {
    keys: ["plan estudiantil", "estudiante", "estudiantil", "$80.000", "80 mil"],
    answer: "El plan estudiantil cuesta $80.000. Es desde los 13 anos con horarios de 3:00 PM a 4:00 PM y de 4:00 PM a 5:00 PM."
  },
  {
    keys: ["clase individual", "clase suelta", "$18.000", "18 mil"],
    answer: "La clase individual cuesta $18.000. Perfecta para probar el gimnasio sin compromiso."
  },
  {
    keys: ["valera", "$90.000", "90 mil", "12 clases"],
    answer: "El plan Valera cuesta $90.000 e incluye 12 clases durante 30 dias. Ideal para comenzar y probar tu constancia."
  },
  {
    keys: ["plan", "precio", "membresia", "planes"],
    answer: "Tenemos 9 planes disponibles: Mensual ($120.000), Trimestral ($320.000), Semestral ($600.000), Anual ($850.000), Pareja ($200.000), Referido ($108.000), Estudiantil ($80.000), Clase Individual ($18.000) y Valera ($90.000). Cual te llama la atencion?"
  },
  {
    keys: ["horario", "hora", "abren", "cierran", "am", "pm"],
    answer: "De lunes a viernes manejamos bloque AM de 5:00 AM a 10:00 AM y bloque PM de 5:30 PM a 9:30 PM. Los sabados hay clases especiales como CrossKids. Confirmamos disponibilidad por WhatsApp."
  },
  {
    keys: ["clase gratis", "cortesia", "prueba", "primera clase", "gratis"],
    answer: "Puedes agendar una clase de cortesia para conocer el ambiente, los entrenadores y la metodologia antes de decidirte. Sin compromiso."
  },
  {
    keys: ["suplemento", "creatina", "proteina", "pre entreno", "batido", "cr7", "atomic", "whey"],
    answer: "Manejamos suplementos: pre-entrenos (CR7, Atomic 05), creatinas (Creatina 100, Monohydrate), proteinas (Best Protein) y batidos listos. Lo mejor es consultar disponibilidad por WhatsApp porque el inventario cambia."
  },
  {
    keys: ["pqrs", "queja", "reclamo", "sugerencia", "solicitud", "peticion"],
    answer: "Para PQRS puedes escribir tu caso aqui y lo enviamos directo al WhatsApp del gimnasio para que quede registrado con el equipo encargado."
  },
  {
    keys: ["ubicacion", "direccion", "llegar", "maps", "mapa", "donde"],
    answer: "Estamos en la Calle 52 # 11d-38, B/Villacolombia, Cali. Puedes abrir la ubicacion desde el boton de Como llegar o pedir indicaciones por WhatsApp."
  },
  {
    keys: ["entrena", "entrenamiento", "clases", "gimnasia", "crosskids"],
    answer: "Ofrecemos clases de gimnasia los martes y CrossKids los sabados. Tambien entrenamiento libre con acompanamiento de rutina. Todo depende de tu horario y objetivo."
  },
  {
    keys: ["comunidad", "ambiente", "gym", "box"],
    answer: "Huracan Box es mas que un gimnasio: es una comunidad que entrena con tecnica, progresion y acompanamiento real. Aqui no improvisamos tu cuerpo."
  },
  {
    keys: ["inscribir", "inscripcion", "registro", "matricular"],
    answer: "Inscribirte es facil. Escribenos por WhatsApp, te contamos los planes disponibles, agendas tu clase de cortesia y empezamos. Sin largos procesos ni contratos complicados."
  }
];

const byData = (name) => document.querySelector(`[data-${name}]`);
const all = (selector) => [...document.querySelectorAll(selector)];

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

function showToast(message) {
  const toast = byData("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3000);
}

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
let lenis = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!isTouchDevice) {
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");
    lenis = new Lenis({
      wrapper: wrapper,
      content: content,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  const header = byData("header");
  const menuToggle = byData("menu-toggle");
  const mainNav = byData("main-nav");
  const heroMedia = document.querySelector(".hero-media");
  const smoothWrapper = document.getElementById("smooth-wrapper");

  function getScrollY() {
    if (lenis) return lenis.scroll;
    if (smoothWrapper) return smoothWrapper.scrollTop;
    return window.scrollY;
  }

  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const y = getScrollY();
        header?.classList.toggle("is-scrolled", y > 30);
        if (heroMedia) {
          heroMedia.style.transform = `translateY(${y * 0.25}px)`;
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  if (lenis) {
    lenis.on("scroll", onScroll);
  }
  if (smoothWrapper) {
    smoothWrapper.addEventListener("scroll", onScroll, { passive: true });
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    const wrapper = document.getElementById("smooth-wrapper");
    if (wrapper) wrapper.style.overflow = isOpen ? "hidden" : "auto";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
    if (lenis) { if (isOpen) { lenis.stop(); } else { lenis.start(); } }
  });

  all('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = href ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else if (smoothWrapper) {
          const top = target.getBoundingClientRect().top + smoothWrapper.scrollTop - 80;
          smoothWrapper.scrollTo({ top, behavior: "smooth" });
        }
      }
      mainNav?.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      const icon = menuToggle?.querySelector(".material-symbols-outlined");
      if (icon) icon.textContent = "menu";
      if (lenis) lenis.start();
    });
  });

  all("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => openWhatsApp(button.dataset.whatsapp));
  });

  all(".product-card").forEach((card) => {
    const product = card.dataset.product || card.querySelector("h3")?.textContent || "un suplemento";
    card.querySelector("button")?.addEventListener("click", () => {
      openWhatsApp(`Hola, quiero consultar disponibilidad y precio de ${product} en Huracan Box.`);
    });
  });

  const carousel = byData("products-carousel");
  const carouselTrack = byData("carousel-track");

  function slideCarousel(dir) {
    if (!carousel) return;
    const card = carousel.querySelector(".product-card");
    const amount = card ? card.getBoundingClientRect().width + 18 : 320;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (dir === 1 && carousel.scrollLeft >= maxScroll - 16) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === -1 && carousel.scrollLeft <= 16) {
      carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: amount * dir, behavior: "smooth" });
    }
  }

  byData("carousel-next")?.addEventListener("click", () => slideCarousel(1));
  byData("carousel-prev")?.addEventListener("click", () => slideCarousel(-1));

  const plansCarousel = byData("plans-carousel");
  const slidePlans = (direction) => {
    if (!plansCarousel) return;
    const card = plansCarousel.querySelector(".plan-card");
    const amount = card ? card.getBoundingClientRect().width + 18 : 320;
    plansCarousel.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  byData("plans-next")?.addEventListener("click", () => slidePlans(1));
  byData("plans-prev")?.addEventListener("click", () => slidePlans(-1));

  byData("map")?.addEventListener("click", () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(MAP_QUERY)}`, "_blank", "noopener,noreferrer");
  });

  byData("contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const goal = formData.get("goal");
    const message = formData.get("message") || "Quiero recibir asesoria.";
    openWhatsApp(`Hola, soy ${name}. Mi objetivo es ${goal}. ${message}`);
    form.reset();
  });

  byData("newsletter-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Listo. Dejamos la suscripcion preparada para conectar con correo real.");
  });

  const chatWindow = byData("chat-window");
  const chatForm = byData("chat-form");

  function addChatMessage(text, type = "bot") {
    if (!chatWindow) return;
    const bubble = document.createElement("div");
    bubble.className = type === "user" ? "user-message" : "bot-message";
    bubble.textContent = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function answerQuestion(rawQuestion) {
    const question = rawQuestion.trim();
    if (!question) return;
    addChatMessage(question, "user");
    const normalized = question.toLowerCase();
    const match = faqAnswers.find((item) => item.keys.some((key) => normalized.includes(key)));
    if (match) {
      addChatMessage(match.answer);
      return;
    }
    addChatMessage("Esa pregunta necesita respuesta personalizada. Te puedo abrir WhatsApp con tu mensaje para que el gimnasio te responda directo.");
    window.setTimeout(() => {
      openWhatsApp(`Hola, tengo esta consulta para Huracan Box: ${question}`);
    }, 700);
  }

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.currentTarget.elements.question;
    answerQuestion(input.value);
    input.value = "";
  });

  byData("quick-questions")?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    answerQuestion(button.textContent);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  all(".reveal").forEach((el) => observer.observe(el));

  all(".product-card").forEach((card) => {
    card.classList.add("reveal");
    const delay = card.dataset.delay || "0";
    card.style.setProperty("--reveal-delay", delay);
    card.style.animationDelay = `${delay}s`;
    observer.observe(card);
  });

  all("button, .button").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const existing = this.querySelector(".ripple");
      if (existing) existing.remove();
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
});
