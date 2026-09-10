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
