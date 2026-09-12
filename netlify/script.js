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
    const pinInput = document.getElementById("pin");
    const loginPage = document.getElementById("loginPage");
    const birthdayPage = document.getElementById("birthdayPage");
    const error = document.getElementById("error");

    if (!pinInput || !loginPage || !birthdayPage) {
        console.error("Elemen PIN tidak ditemukan.");
        return;
    }

    const pin = pinInput.value.trim();

    if (pin === "2010") {

    loginPage.style.display = "none";
    birthdayPage.style.display = "block";

    showSection(0);

    const music = document.getElementById("bgMusic");

    if (music) {

        music.volume = 0.7;

        music.play().then(() => {

            const button =
                document.getElementById("musicButton");

            if (button) {
                button.innerHTML = "⏸️ Pause Musik";
            }

        }).catch(() => {

            console.log(
                "Browser memblokir autoplay musik."
            );

        });
    }

    if (error) {
        error.textContent = "";
    }

    window.scrollTo(0, 0);

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

/* =========================================
   POPUP FOTO PREMIUM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const photos =
        document.querySelectorAll(".photo-card img");

    if (!photos.length) return;


    /* ==============================
       BUAT POPUP
    ============================== */

    const modal =
        document.createElement("div");

    modal.className = "photo-modal";

    modal.innerHTML = `
        <button class="photo-modal-close">
            ✕
        </button>

        <img src="" alt="Foto Adik">

        <div class="photo-nav">
            <button class="photo-prev">‹</button>
            <button class="photo-next">›</button>
        </div>
    `;

    document.body.appendChild(modal);


    const modalImage =
        modal.querySelector("img");

    const closeButton =
        modal.querySelector(".photo-modal-close");

    const prevButton =
        modal.querySelector(".photo-prev");

    const nextButton =
        modal.querySelector(".photo-next");


    let currentPhoto = 0;


    /* ==============================
       BUKA FOTO
    ============================== */

    function openPhoto(index) {

        currentPhoto = index;

        const photo = photos[currentPhoto];

        modalImage.src = photo.src;

        modalImage.alt = photo.alt;

        modal.classList.add("show");

        createPopupSparkles();
    }


    /* ==============================
       TUTUP
    ============================== */

    function closePhoto() {

        modal.classList.remove("show");

    }


    /* ==============================
       FOTO BERIKUTNYA
    ============================== */

    function nextPhoto() {

        currentPhoto++;

        if (currentPhoto >= photos.length) {
            currentPhoto = 0;
        }

        openPhoto(currentPhoto);
    }


    /* ==============================
       FOTO SEBELUMNYA
    ============================== */

    function previousPhoto() {

        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto = photos.length - 1;
        }

        openPhoto(currentPhoto);
    }


    /* ==============================
       KLIK FOTO
    ============================== */

    photos.forEach(function (photo, index) {

        photo.addEventListener("click", function (event) {

            event.stopPropagation();

            openPhoto(index);

        });

    });


    /* ==============================
       TOMBOL
    ============================== */

    closeButton.addEventListener(
        "click",
        closePhoto
    );

    nextButton.addEventListener(
        "click",
        nextPhoto
    );

    prevButton.addEventListener(
        "click",
        previousPhoto
    );


    /* ==============================
       KLIK BACKGROUND
    ============================== */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                closePhoto();
            }

        }
    );


    /* ==============================
       KEYBOARD
    ============================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (!modal.classList.contains("show")) {
                return;
            }

            if (event.key === "Escape") {
                closePhoto();
            }

            if (event.key === "ArrowRight") {
                nextPhoto();
            }

            if (event.key === "ArrowLeft") {
                previousPhoto();
            }

        }
    );


    /* ==============================
       SPARKLE
    ============================== */

    function createPopupSparkles() {

        const symbols = [
            "✨",
            "⭐",
            "💖",
            "💫",
            "💕",
            "🌸"
        ];

        for (let i = 0; i < 18; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.className =
                "popup-sparkle";

            sparkle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            const x =
                (Math.random() - 0.5) * 420;

            const y =
                (Math.random() - 0.5) * 420;


            sparkle.style.left = "50%";
            sparkle.style.top = "50%";

            sparkle.style.setProperty(
                "--x",
                x + "px"
            );

            sparkle.style.setProperty(
                "--y",
                y + "px"
            );


            document.body.appendChild(
                sparkle
            );


            setTimeout(function () {
                sparkle.remove();
            }, 950);

        }
    }

});


/* =====================================
   PARTIKEL MELEDAK SAAT KLIK
===================================== */

document.addEventListener("click", function (event) {

    // Jangan membuat partikel saat klik foto
    if (
        event.target.closest(".photo-card") ||
        event.target.closest(".photo-modal")
    ) {
        return;
    }

    createParticleExplosion(event.clientX, event.clientY);
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

    for (let i = 0; i < 12; i++) {

        const particle = document.createElement("span");

        particle.className = "click-particle";

        particle.textContent =
            particles[
                Math.floor(Math.random() * particles.length)
            ];

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle = Math.random() * Math.PI * 2;

        const distance = 40 + Math.random() * 90;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");

        particle.style.fontSize =
            (12 + Math.random() * 14) + "px";

        document.body.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, 850);
    }
}


/* =========================================
   SALJU ESTETIK
========================================= */

function createSnow() {

    // Cegah salju dibuat dua kali
    if (document.querySelector(".snow-container")) {
        return;
    }

    const container = document.createElement("div");

    container.className = "snow-container";

    document.body.appendChild(container);


    /* ==============================
       KEPINGAN SALJU
    ============================== */

    const snowSymbols = [
        "❄",
        "❅",
        "❆",
        "✦"
    ];

    const snowCount =
        window.innerWidth <= 600 ? 28 : 45;


    for (let i = 0; i < snowCount; i++) {

        const snow =
            document.createElement("span");

        snow.className = "snowflake";

        snow.textContent =
            snowSymbols[
                Math.floor(
                    Math.random() *
                    snowSymbols.length
                )
            ];


        /* Posisi horizontal */

        snow.style.left =
            Math.random() * 100 + "%";


        /* Ukuran */

        const size =
            7 + Math.random() * 13;

        snow.style.fontSize =
            size + "px";


        /* Transparansi */

        snow.style.opacity =
            0.25 + Math.random() * 0.65;


        /* Kecepatan */

        const duration =
            8 + Math.random() * 10;

        snow.style.animationDuration =
            duration + "s";


        /* Supaya salju tidak jatuh bersamaan */

        snow.style.animationDelay =
            "-" +
            Math.random() * duration +
            "s";


        /* Sedikit variasi */

        snow.style.filter =
            `blur(${Math.random() * 0.4}px)`;


        container.appendChild(snow);
    }


    /* ==============================
       BOKEH / SALJU KECIL
    ============================== */

    const glowCount =
        window.innerWidth <= 600 ? 12 : 20;


    for (let i = 0; i < glowCount; i++) {

        const glow =
            document.createElement("span");

        glow.className = "snow-glow";


        glow.style.left =
            Math.random() * 100 + "%";


        glow.style.top =
            Math.random() * 100 + "%";


        const duration =
            7 + Math.random() * 8;

        glow.style.animationDuration =
            duration + "s";


        glow.style.animationDelay =
            "-" +
            Math.random() * duration +
            "s";


        container.appendChild(glow);
    }
}


/* Jalankan setelah halaman siap */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createSnow();

    }
);