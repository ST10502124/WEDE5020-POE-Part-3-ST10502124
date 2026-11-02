document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach((item) => { item.textContent = new Date().getFullYear(); });
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  if (menuButton && navigation) menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });
  document.querySelectorAll(".accordion-trigger").forEach((trigger) => trigger.addEventListener("click", () => {
    const panel = trigger.nextElementSibling;
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!expanded));
    if (panel) panel.hidden = expanded;
    const symbol = trigger.querySelector("span");
    if (symbol) symbol.textContent = expanded ? "＋" : "−";
  }));
  const search = document.querySelector("#product-search");
  const category = document.querySelector("#category-filter");
  const cards = [...document.querySelectorAll(".product-card")];
  const count = document.querySelector("#product-count");
  const sort = document.querySelector("#product-sort");
  const productGrid = document.querySelector("#product-grid");
  const originalOrder = [...cards];
  const empty = document.querySelector("#no-products");
  const filterProducts = () => {
    if (!cards.length) return;
    const term = (search?.value || "").trim().toLowerCase();
    const selected = category?.value || "all";
    let visible = 0;
    cards.forEach((card) => {
      const show = (card.dataset.name || card.textContent).toLowerCase().includes(term) && (selected === "all" || card.dataset.category === selected);
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `Showing ${visible} of ${cards.length} products`;
    if (empty) empty.hidden = visible !== 0;
  };
  search?.addEventListener("input", filterProducts);
  sort?.addEventListener("change", () => {
    if (!productGrid) return;
    const ordered = [...cards];
    if (sort.value === "name-asc") ordered.sort((a, b) => (a.dataset.name || "").localeCompare(b.dataset.name || ""));
    else if (sort.value === "name-desc") ordered.sort((a, b) => (b.dataset.name || "").localeCompare(a.dataset.name || ""));
    else ordered.splice(0, ordered.length, ...originalOrder);
    ordered.forEach(card => productGrid.appendChild(card));
    filterProducts();
  });
  category?.addEventListener("change", filterProducts);
  const requestedItem = new URLSearchParams(window.location.search).get("item");
  const productField = document.querySelector("#enq-product");
  if (requestedItem && productField) productField.value = requestedItem;


  // Lightweight image gallery: open product images in an accessible dialog.
  document.querySelectorAll(".product-photo, .feature-image, .hero-photo img").forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Open larger image: " + (image.alt || "Bakery image"));
    const openImage = () => {
      let dialog = document.querySelector("#image-lightbox");
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "image-lightbox";
        dialog.className = "image-lightbox";
        dialog.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close image">×</button><img alt=""><p class="lightbox-caption"></p>';
        document.body.appendChild(dialog);
        dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
        dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
      }
      const largeImage = dialog.querySelector("img");
      largeImage.src = image.src;
      largeImage.alt = image.alt;
      dialog.querySelector(".lightbox-caption").textContent = image.alt;
      if (!dialog.open) dialog.showModal();
    };
    image.addEventListener("click", openImage);
    image.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openImage(); } });
  });

  // Netlify Forms processes these submissions after the site is deployed and form detection is enabled.
  document.querySelectorAll("form[data-netlify='true']").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (!form.reportValidity()) {
      if (status) status.textContent = "Please check the required fields and try again.";
      return;
    }
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Sending…"; }
    if (status) status.textContent = "Sending your message…";
    try {
      const formData = new FormData(form);
      const encoded = new URLSearchParams();
      for (const [key, value] of formData.entries()) encoded.append(key, value.toString());
      const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encoded.toString() });
      if (!response.ok) throw new Error("Form submission failed.");
      form.reset();
      if (status) status.textContent = "Thank you. Your message has been submitted successfully.";
    } catch (error) {
      if (status) status.textContent = "Sorry, the message could not be submitted. Please try again later or contact the bakery directly.";
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = form.getAttribute("name") === "product-enquiry" ? "Submit enquiry" : "Send message"; }
    }
  }));
});