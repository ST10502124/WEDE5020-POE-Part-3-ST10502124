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
  const count = document.querySelector("#product-count");
  const sort = document.querySelector("#product-sort");
  const productGrid = document.querySelector("#product-grid");
  const empty = document.querySelector("#no-products");
  let products = [];

  const bindLightbox = (image) => {
    if (image.dataset.lightboxReady) return;
    image.dataset.lightboxReady = "true";
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
  };

  const renderProducts = () => {
    if (!productGrid) return;
    const term = (search?.value || "").trim().toLowerCase();
    const selected = category?.value || "all";
    const order = sort?.value || "default";
    let visibleProducts = products.filter(product =>
      (product.name + " " + product.description + " " + product.category).toLowerCase().includes(term) &&
      (selected === "all" || product.category === selected)
    );
    if (order === "name-asc") visibleProducts.sort((a,b) => a.name.localeCompare(b.name));
    if (order === "name-desc") visibleProducts.sort((a,b) => b.name.localeCompare(a.name));
    productGrid.replaceChildren();
    visibleProducts.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.dataset.category = product.category;
      card.dataset.name = product.name.toLowerCase();
      const image = document.createElement("img");
      image.className = "product-photo";
      image.src = product.image;
      image.alt = product.alt;
      image.loading = "lazy";
      const info = document.createElement("div");
      info.className = "product-info";
      const tag = document.createElement("span");
      tag.className = "product-tag";
      tag.textContent = product.tag;
      const heading = document.createElement("h2");
      heading.textContent = product.name;
      const description = document.createElement("p");
      description.textContent = product.description;
      const link = document.createElement("a");
      link.href = "enquiry.html?item=" + encodeURIComponent(product.name);
      link.textContent = "Enquire about this →";
      info.append(tag, heading, description, link);
      card.append(image, info);
      productGrid.appendChild(card);
      bindLightbox(image);
    });
    if (count) count.textContent = "Showing " + visibleProducts.length + " of " + products.length + " products";
    if (empty) empty.hidden = visibleProducts.length !== 0;
    if (!visibleProducts.length) {
      const message = document.createElement("p");
      message.className = "empty-state";
      message.textContent = "No products match your search. Try another word or category.";
      productGrid.appendChild(message);
    }
  };

  if (productGrid) {
    fetch("js/products.json")
      .then(response => { if (!response.ok) throw new Error("Could not load product data"); return response.json(); })
      .then(data => { products = data; renderProducts(); })
      .catch(() => {
        productGrid.textContent = "Products could not be loaded. Please refresh the page or try again later.";
        if (count) count.textContent = "Product catalogue unavailable";
      });
  }
  search?.addEventListener("input", renderProducts);
  category?.addEventListener("change", renderProducts);
  sort?.addEventListener("change", renderProducts);

  document.querySelectorAll(".feature-image, .hero-photo img").forEach(bindLightbox);
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