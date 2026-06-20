const WHATSAPP_NUMBER = "5731136218094";
const MAP_QUERY = "Huracan Box gimnasio";
const faqAnswers = [
  {
    keys: ["plan", "precio", "mensual", "semestral", "anual", "membresia"],
    answer: "Tenemos plan mensual, semestral y anual. La mejor opcion depende de tu constancia y horario. Si quieres, te mando la recomendacion por WhatsApp segun tu objetivo."
  },
  {
    keys: ["horario", "hora", "abren", "cierran", "am", "pm"],
    answer: "De lunes a viernes manejamos bloque AM de 5:00 AM a 10:00 AM y bloque PM de 5:30 PM a 9:30 PM. Conviene confirmar disponibilidad antes de ir."
  },
  {
    keys: ["clase gratis", "cortesia", "prueba", "primera clase"],
    answer: "Puedes reservar una clase de cortesia para conocer el ambiente, entrenadores y metodologia antes de elegir plan."
  },
  {
    keys: ["suplemento", "creatina", "proteina", "pre entreno", "batido", "cr7", "atomic"],
    answer: "Tenemos suplementos y batidos. Lo ideal es consultar disponibilidad por WhatsApp porque el inventario puede cambiar."
  },
  {
    keys: ["pqrs", "queja", "reclamo", "sugerencia", "solicitud"],
    answer: "Para PQRS puedes escribir tu caso y lo enviamos directo al WhatsApp del gimnasio para que quede registrado con el equipo encargado."
  },
  {
    keys: ["ubicacion", "direccion", "llegar", "maps", "mapa"],
    answer: "Puedes abrir la ubicacion desde el boton de Como llegar. Si quieres, tambien puedes escribir por WhatsApp para pedir indicaciones."
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

document.addEventListener("DOMContentLoaded", () => {
  const header = byData("header");
  const menuToggle = byData("menu-toggle");
  const mainNav = byData("main-nav");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 30);
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
  });

  all('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      mainNav?.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      const icon = menuToggle?.querySelector(".material-symbols-outlined");
      if (icon) icon.textContent = "menu";
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
  const slideProducts = (direction = 1) => {
    if (!carousel) return;
    const card = carousel.querySelector(".product-card");
    const amount = card ? card.getBoundingClientRect().width + 18 : 320;
    carousel.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  byData("carousel-next")?.addEventListener("click", () => slideProducts(1));
  byData("carousel-prev")?.addEventListener("click", () => slideProducts(-1));

  if (carousel) {
    window.setInterval(() => {
      const nearEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8;
      if (nearEnd) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slideProducts(1);
      }
    }, 4200);
  }

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
});
