(function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const RECIPIENT = "bedirhank.bk41@gmail.com";
    const feedback = document.getElementById("formFeedback");

    const fields = {
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        message: document.getElementById("message"),
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showFeedback(text, isError) {
        if (!feedback) return;
        feedback.textContent = text;
        feedback.classList.toggle("error", !!isError);
        feedback.classList.toggle("success", !isError);
    }

    function validate(values) {
        if (!values.firstName || !values.lastName) {
            return "Lütfen adınızı ve soyadınızı giriniz.";
        }
        if (!emailPattern.test(values.email)) {
            return "Lütfen geçerli bir e-posta adresi giriniz.";
        }
        if (!values.phone) {
            return "Lütfen telefon numaranızı giriniz.";
        }
        if (!values.message) {
            return "Lütfen mesajınızı giriniz.";
        }
        return null;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const values = {
            firstName: fields.firstName.value.trim(),
            lastName: fields.lastName.value.trim(),
            email: fields.email.value.trim(),
            phone: fields.phone.value.trim(),
            message: fields.message.value.trim(),
        };

        const error = validate(values);
        if (error) {
            showFeedback(error, true);
            return;
        }

        const subject = `İletişim Formu - ${values.firstName} ${values.lastName}`;

        const bodyLines = [
            "Kayrak Vinç web sitesi iletişim formundan yeni bir mesaj:",
            "",
            `Ad Soyad : ${values.firstName} ${values.lastName}`,
            `E-posta  : ${values.email}`,
            `Telefon  : ${values.phone}`,
            "",
            "Mesaj:",
            values.message,
        ];
        const body = bodyLines.join("\r\n");

        const mailtoUrl =
            `mailto:${RECIPIENT}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;

        showFeedback(
            "E-posta uygulamanız açılıyor. Göndermek için 'Gönder' butonuna basınız.",
            false
        );
        form.reset();
    });
})();
