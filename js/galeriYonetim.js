(function () {
    const API_BASE = (window.KAYRAK_CONFIG && window.KAYRAK_CONFIG.API_BASE) || "./api";
    const DELETE_ADMIN_TOKEN_KEY = "kayrak_admin_delete_token";
    const DELETE_ADMIN_TOKEN_TTL_MS = 60 * 60 * 1000;

    const adminKeyInput = document.getElementById("adminKey");

    // Ürün ekleme
    const addProductForm = document.getElementById("addProductForm");
    const productNameInput = document.getElementById("productName");
    const addProductFeedback = document.getElementById("addProductFeedback");

    // Resim yükleme
    const uploadForm = document.getElementById("uploadForm");
    const productSelect = document.getElementById("productSelect");
    const imageInput = document.getElementById("imageInput");
    const uploadFeedback = document.getElementById("uploadFeedback");
    const previewEl = document.getElementById("imagePreview");

    const selectedImagesGrid = document.getElementById("selectedImagesGrid");
    const selectedImagesFeedback = document.getElementById("selectedImagesFeedback");

    let products = [];

    function feedback(el, text, isError) {
        if (!el) return;
        el.textContent = text;
        el.classList.toggle("error", !!isError);
        el.classList.toggle("success", !isError);
    }

    function getAdminKey() {
        return adminKeyInput ? adminKeyInput.value.trim() : "";
    }

    function imageUrl(filePath) {
        return `${API_BASE}/${filePath}`;
    }

    function saveDeleteToken(adminKey) {
        const token = {
            key: adminKey,
            expiresAt: Date.now() + DELETE_ADMIN_TOKEN_TTL_MS,
        };
        localStorage.setItem(DELETE_ADMIN_TOKEN_KEY, JSON.stringify(token));
    }

    function getStoredDeleteToken() {
        const raw = localStorage.getItem(DELETE_ADMIN_TOKEN_KEY);
        if (!raw) return null;

        try {
            const token = JSON.parse(raw);
            if (!token || typeof token.key !== "string" || typeof token.expiresAt !== "number") {
                localStorage.removeItem(DELETE_ADMIN_TOKEN_KEY);
                return null;
            }
            if (token.expiresAt <= Date.now()) {
                localStorage.removeItem(DELETE_ADMIN_TOKEN_KEY);
                return null;
            }
            return token;
        } catch (err) {
            localStorage.removeItem(DELETE_ADMIN_TOKEN_KEY);
            return null;
        }
    }

    function clearDeleteToken() {
        localStorage.removeItem(DELETE_ADMIN_TOKEN_KEY);
    }

    async function verifyAdminKey(adminKey) {
        const fd = new FormData();
        fd.append("admin_key", adminKey);

        const res = await fetch(`${API_BASE}/verify_admin.php`, {
            method: "POST",
            body: fd,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
            throw new Error(data.message || "Yönetim anahtarı doğrulanamadı.");
        }
    }

    async function ensureDeleteAdminKey() {
        const token = getStoredDeleteToken();
        if (token) return token.key;

        const promptValue = window.prompt("Silme işlemi için yönetim anahtarını girin:");
        const enteredKey = (promptValue || "").trim();

        if (!enteredKey) {
            throw new Error("Silme işlemi iptal edildi.");
        }

        await verifyAdminKey(enteredKey);
        saveDeleteToken(enteredKey);
        return enteredKey;
    }

    async function loadProducts() {
        try {
            const res = await fetch(`${API_BASE}/get_products.php`);
            const data = await res.json();
            if (!data.success) throw new Error();
            products = data.products || [];
            renderProductOptions();

            if (productSelect && productSelect.value) {
                loadSelectedImages(productSelect.value);
            }
        } catch (err) {
            feedback(uploadFeedback, "Ürünler yüklenemedi.", true);
            feedback(selectedImagesFeedback, "Resimler yüklenemedi.", true);
        }
    }

    function renderProductOptions() {
        if (!productSelect) return;
        const current = productSelect.value;
        productSelect.innerHTML = '<option value="">Ürün seçin...</option>';
        products.forEach((p) => {
            const opt = document.createElement("option");
            opt.value = String(p.id);
            opt.textContent = `${p.name} (${p.image_count})`;
            productSelect.appendChild(opt);
        });
        if (current) productSelect.value = current;
    }

    function renderSelectedImages(images) {
        if (!selectedImagesGrid) return;
        selectedImagesGrid.innerHTML = "";

        images.forEach((img) => {
            const item = document.createElement("article");
            item.className = "selectedImageItem";

            const image = document.createElement("img");
            image.loading = "lazy";
            image.src = imageUrl(img.file_path);
            image.alt = img.original_name || "Ürün görseli";

            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "deleteImageBtn";
            delBtn.setAttribute("aria-label", "Resmi sil");
            delBtn.innerHTML =
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 7h2v8h-2v-8zm4 0h2v8h-2v-8zM7 10h2v8H7v-8z"/></svg>';

            delBtn.addEventListener("click", () => {
                deleteImage(img.id, img.product_id);
            });

            const meta = document.createElement("div");
            meta.className = "selectedImageMeta";
            meta.textContent = img.original_name || `Gorsel #${img.id}`;

            item.appendChild(image);
            item.appendChild(delBtn);
            item.appendChild(meta);
            selectedImagesGrid.appendChild(item);
        });
    }

    async function loadSelectedImages(productId) {
        if (!selectedImagesGrid) return;

        selectedImagesGrid.innerHTML = "";
        if (!productId) {
            feedback(selectedImagesFeedback, "Lütfen bir ürün seçin.", true);
            return;
        }

        feedback(selectedImagesFeedback, "Resimler yükleniyor...", false);

        try {
            const res = await fetch(`${API_BASE}/get_images.php?product_id=${encodeURIComponent(productId)}`);
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || "Resimler yüklenemedi.");
            }

            const images = data.images || [];
            if (images.length === 0) {
                feedback(selectedImagesFeedback, "Bu ürüne ait henüz resim yok.", false);
                return;
            }

            feedback(selectedImagesFeedback, `${images.length} resim listelendi.`, false);
            renderSelectedImages(images);
        } catch (err) {
            feedback(selectedImagesFeedback, err.message || "Resimler yüklenemedi.", true);
        }
    }

    async function deleteImage(imageId, productId) {
        const confirmed = window.confirm("Bu resmi silmek istediğinize emin misiniz?");
        if (!confirmed) return;

        try {
            const adminKey = await ensureDeleteAdminKey();

            const fd = new FormData();
            fd.append("id", String(imageId));
            fd.append("admin_key", adminKey);

            const res = await fetch(`${API_BASE}/delete_image.php`, {
                method: "POST",
                body: fd,
            });
            const data = await res.json();

            if (res.status === 401) {
                clearDeleteToken();
                throw new Error("Yönetim anahtarı geçersiz veya süresi dolmuş. Lütfen tekrar deneyin.");
            }

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Resim silinemedi.");
            }

            feedback(selectedImagesFeedback, "Resim silindi.", false);

            const prod = products.find((p) => String(p.id) === String(productId));
            if (prod && prod.image_count > 0) {
                prod.image_count -= 1;
                renderProductOptions();
                productSelect.value = String(productId);
            }

            loadSelectedImages(productId);
        } catch (err) {
            feedback(selectedImagesFeedback, err.message || "Resim silinemedi.", true);
        }
    }

    // --- Yeni ürün ekle ---
    if (addProductForm) {
        addProductForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = productNameInput.value.trim();
            const adminKey = getAdminKey();

            if (!adminKey) {
                feedback(addProductFeedback, "Lütfen önce yönetim anahtarını girin.", true);
                return;
            }
            if (!name) {
                feedback(addProductFeedback, "Ürün adı zorunlu.", true);
                return;
            }

            const fd = new FormData();
            fd.append("name", name);
            fd.append("admin_key", adminKey);

            try {
                const res = await fetch(`${API_BASE}/add_product.php`, {
                    method: "POST",
                    body: fd,
                });
                const data = await res.json();
                if (!data.success) throw new Error(data.message || "Ürün eklenemedi.");

                products.push(data.product);
                products.sort((a, b) => a.name.localeCompare(b.name, "tr"));
                renderProductOptions();
                productSelect.value = String(data.product.id);
                productNameInput.value = "";
                feedback(addProductFeedback, `"${data.product.name}" eklendi.`, false);
            } catch (err) {
                feedback(addProductFeedback, err.message || "Ürün eklenemedi.", true);
            }
        });
    }

    // --- Resim önizleme ---
    if (imageInput) {
        imageInput.addEventListener("change", () => {
            previewEl.innerHTML = "";
            const file = imageInput.files && imageInput.files[0];
            if (!file) return;
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src);
            previewEl.appendChild(img);
        });
    }

    // --- Resim yükle ---
    if (uploadForm) {
        uploadForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const adminKey = getAdminKey();
            const productId = productSelect.value;
            const file = imageInput.files && imageInput.files[0];

            if (!adminKey) {
                feedback(uploadFeedback, "Lütfen önce yönetim anahtarını girin.", true);
                return;
            }
            if (!productId) {
                feedback(uploadFeedback, "Lütfen bir ürün seçin.", true);
                return;
            }
            if (!file) {
                feedback(uploadFeedback, "Lütfen bir resim seçin.", true);
                return;
            }

            const fd = new FormData();
            fd.append("product_id", productId);
            fd.append("image", file);
            fd.append("admin_key", adminKey);

            feedback(uploadFeedback, "Yükleniyor...", false);

            try {
                const res = await fetch(`${API_BASE}/upload_image.php`, {
                    method: "POST",
                    body: fd,
                });
                const data = await res.json();
                if (!data.success) throw new Error(data.message || "Yükleme başarısız.");

                feedback(uploadFeedback, "Resim başarıyla yüklendi.", false);
                uploadForm.reset();
                previewEl.innerHTML = "";
                // Resim sayısını güncelle
                const prod = products.find((p) => String(p.id) === String(productId));
                if (prod) {
                    prod.image_count += 1;
                    renderProductOptions();
                    productSelect.value = String(productId);
                }

                loadSelectedImages(productId);
            } catch (err) {
                feedback(uploadFeedback, err.message || "Yükleme başarısız.", true);
            }
        });
    }

    if (productSelect) {
        productSelect.addEventListener("change", () => {
            loadSelectedImages(productSelect.value);
        });
    }

    loadProducts();
})();
