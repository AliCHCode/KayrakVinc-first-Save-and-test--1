(function () {
    const API_BASE = (window.KAYRAK_CONFIG && window.KAYRAK_CONFIG.API_BASE) || "./api";

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

    async function loadProducts() {
        try {
            const res = await fetch(`${API_BASE}/get_products.php`);
            const data = await res.json();
            if (!data.success) throw new Error();
            products = data.products || [];
            renderProductOptions();
        } catch (err) {
            feedback(uploadFeedback, "Ürünler yüklenemedi.", true);
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
            } catch (err) {
                feedback(uploadFeedback, err.message || "Yükleme başarısız.", true);
            }
        });
    }

    loadProducts();
})();
