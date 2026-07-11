(function () {
    const API_BASE = (window.KAYRAK_CONFIG && window.KAYRAK_CONFIG.API_BASE) || "./api";

    const tabsEl = document.getElementById("galleryTabs");
    const gridEl = document.getElementById("galleryGrid");
    const statusEl = document.getElementById("galleryStatus");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!tabsEl || !gridEl) return;

    let products = [];
    let activeProductId = 0; // 0 = Tümü

    function setStatus(text) {
        if (statusEl) statusEl.textContent = text || "";
    }

    function imageUrl(filePath) {
        return `${API_BASE}/${filePath}`;
    }

    async function loadProducts() {
        try {
            const res = await fetch(`${API_BASE}/get_products.php`);
            const data = await res.json();
            if (!data.success) throw new Error(data.message || "Ürünler yüklenemedi.");
            products = data.products || [];
            renderTabs();
            loadImages(0);
        } catch (err) {
            setStatus("Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.");
        }
    }

    function renderTabs() {
        tabsEl.innerHTML = "";

        const allBtn = createTab("Tümü", 0);
        tabsEl.appendChild(allBtn);

        products.forEach((p) => {
            tabsEl.appendChild(createTab(p.name, p.id));
        });

        updateActiveTab();
    }

    function createTab(label, productId) {
        const btn = document.createElement("button");
        btn.className = "galleryTab";
        btn.textContent = label;
        btn.dataset.productId = String(productId);
        btn.addEventListener("click", () => loadImages(productId));
        return btn;
    }

    function updateActiveTab() {
        tabsEl.querySelectorAll(".galleryTab").forEach((btn) => {
            btn.classList.toggle(
                "active",
                Number(btn.dataset.productId) === activeProductId
            );
        });
    }

    async function loadImages(productId) {
        activeProductId = productId;
        updateActiveTab();
        setStatus("Yükleniyor...");
        gridEl.innerHTML = "";

        try {
            const url =
                productId > 0
                    ? `${API_BASE}/get_images.php?product_id=${productId}`
                    : `${API_BASE}/get_images.php`;
            const res = await fetch(url);
            const data = await res.json();
            if (!data.success) throw new Error(data.message || "Resimler yüklenemedi.");

            const images = data.images || [];
            if (images.length === 0) {
                setStatus("Bu kategoride henüz resim bulunmuyor.");
                return;
            }
            setStatus("");
            renderGrid(images);
        } catch (err) {
            setStatus("Resimler yüklenemedi. Lütfen daha sonra tekrar deneyin.");
        }
    }

    function renderGrid(images) {
        gridEl.innerHTML = "";
        images.forEach((img) => {
            const card = document.createElement("figure");
            card.className = "galleryItem";

            const image = document.createElement("img");
            image.loading = "lazy";
            image.src = imageUrl(img.file_path);
            image.alt = img.product_name || "Galeri görseli";

            const caption = document.createElement("figcaption");
            caption.textContent = img.product_name || "";

            card.appendChild(image);
            card.appendChild(caption);
            card.addEventListener("click", () => openLightbox(image.src, image.alt));
            gridEl.appendChild(card);
        });
    }

    function openLightbox(src, alt) {
        if (!lightbox) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || "";
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        lightboxImg.src = "";
        document.body.style.overflow = "";
    }

    if (lightbox) {
        lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }

    loadProducts();
})();
