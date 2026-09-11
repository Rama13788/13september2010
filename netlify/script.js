let currentSection = 0;

const sections = document.querySelectorAll(".birthday-section");


function showSection(index) {

    if (index < 0 || index >= sections.length) {
        return;
    }

    sections.forEach((section, i) => {

        section.classList.remove("active");
        section.classList.remove("previous");

        if (i < index) {
            section.classList.add("previous");
        }

    });

    sections[index].classList.add("active");

    currentSection = index;
}


/* =========================
   PIN
========================= */

function checkPin() {

    const pin = document.getElementById("pin").value;
    const error = document.getElementById("error");

    const correctPin = "2009";

    if (pin === correctPin) {

        document.getElementById("loginPage").style.display = "none";

        document.getElementById("birthdayPage").style.display = "block";

        showSection(0);

        window.scrollTo(0, 0);

    } else {

        error.textContent = "PIN salah ❤️ Coba lagi.";

    }
}


/* =========================
   NEXT SLIDE
========================= */

function nextSection(sectionId) {

    const target = document.getElementById(sectionId);

    if (!target) {
        return;
    }

    const index = Array.from(sections).indexOf(target);

    if (index !== -1) {
        showSection(index);
    }
}


/* =========================
   TIUP LILIN
========================= */

function blowCandle() {

    const cake = document.querySelector(".big-cake");

    cake.innerHTML = "🎂";

    document.getElementById("wishText").innerHTML =
        "✨ Semoga semua harapanmu menjadi kenyataan ❤️ ✨";
}


/* =========================
   MUSIK
========================= */

function toggleMusic() {

    const music = document.getElementById("bgMusic");

    const button = document.getElementById("musicButton");

    if (!music) {
        return;
    }

    if (music.paused) {

        music.play();

        button.innerHTML = "⏸️ Pause Musik";

    } else {

        music.pause();

        button.innerHTML = "🎵 Musik";

    }
}


/* =========================
   PIN ENTER
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const pin = document.getElementById("pin");

    if (pin) {

        pin.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                checkPin();
            }

        });

    }

});

/* =====================================
   POP UP FOTO
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Buat popup foto
    const photoModal = document.createElement("div");
    photoModal.className = "photo-modal";

    photoModal.innerHTML = `
        <button class="photo-modal-close">✕</button>
        <img src="" alt="Foto diperbesar">
    `;

    document.body.appendChild(photoModal);

    const modalImage = photoModal.querySelector("img");
    const closeButton = photoModal.querySelector(".photo-modal-close");

    // Klik foto
    document.querySelectorAll(".photo-card img").forEach(function (img) {

        img.addEventListener("click", function (event) {
            event.stopPropagation();

            modalImage.src = img.src;
            modalImage.alt = img.alt;

            photoModal.classList.add("show");
        });

    });

    // Tombol X
    closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        photoModal.classList.remove("show");
    });

    // Klik area hitam
    photoModal.addEventListener("click", function (event) {
        if (event.target === photoModal) {
            photoModal.classList.remove("show");
        }
    });

    // Tombol ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            photoModal.classList.remove("show");
        }
    });


    /* =====================================
       PARTIKEL MELEDAK SAAT KLIK
    ===================================== */

    document.addEventListener("click", function (event) {

        // Jangan membuat partikel saat klik foto
        // karena foto mempunyai efek popup sendiri
        if (
            event.target.closest(".photo-card") ||
            event.target.closest(".photo-modal")
        ) {
            return;
        }

        createParticleExplosion(event.clientX, event.clientY);

    });

});


function createParticleExplosion(x, y) {

    const particles = [
        "✨",
        "⭐",
        "💖",
        "❤️",
        "💕",
        "🌸",
        "🎉",
        "💫"
    ];

    // Jumlah partikel
    for (let i = 0; i < 12; i++) {

        const particle = document.createElement("span");

        particle.className = "click-particle";

        particle.textContent =
            particles[Math.floor(Math.random() * particles.length)];

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        // Arah ledakan
        const angle = Math.random() * Math.PI * 2;

        const distance = 40 + Math.random() * 90;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");

        // Ukuran random
        particle.style.fontSize =
            (12 + Math.random() * 14) + "px";

        document.body.appendChild(particle);

        // Hapus setelah animasi
        setTimeout(function () {
            particle.remove();
        }, 850);
    }
}