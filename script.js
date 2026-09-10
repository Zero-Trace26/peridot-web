// ========================================
// PERIDOT HEALTH DIAGNOSTICS - SCRIPT.JS
// ========================================


// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
    ".service-panel, .process-step, .visit-row, .booking-panel, .booking-copy"
);

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}


// ========================================
// BOOKING FORM
// ========================================

const bookingForm = document.querySelector(".booking-form");
const bookingSuccess = document.querySelector(".booking-success");
const bookingSubmit = document.querySelector(".booking-submit");

if (bookingForm) {

    // Prevent selecting a date in the past
    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }


    // ========================================
    // WHATSAPP BOOKING
    // ========================================

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form values
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const dateInput = document.getElementById("date");
        const timeInput = document.getElementById("time");
        const notesInput = document.getElementById("notes");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const date = dateInput ? dateInput.value : "";
        const time = timeInput ? timeInput.value : "";
        const notes = notesInput ? notesInput.value.trim() : "";

        const service = document.querySelector(
            'input[name="service"]:checked'
        );


        // Check required fields
        if (!name || !phone || !date || !time || !service) {
            alert("Please complete all required fields before booking.");
            return;
        }


        // Format date
        let formattedDate = date;

        try {
            formattedDate = new Date(date).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        } catch (error) {
            console.error("Date formatting error:", error);
        }


        // Create WhatsApp message
        const message = `
Hello Peridot Health Diagnostics,

I would like to book a test.

*BOOKING DETAILS*

Name: ${name}
Phone: ${phone}
Service: ${service.value}
Date: ${formattedDate}
Time: ${time}
Notes: ${notes || "None"}

Thank you.
        `.trim();


        // ========================================
        // WHATSAPP NUMBER
        // 08084744177 → 2348084744177
        // ========================================

        const whatsappNumber = "2348084744177";


        // Create WhatsApp URL
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        // Change button text temporarily
        if (bookingSubmit) {
            bookingSubmit.disabled = true;
            bookingSubmit.textContent = "Opening WhatsApp...";
        }


        // Open WhatsApp
        window.open(whatsappURL, "_blank");


        // Show success message
        if (bookingSuccess) {
            bookingSuccess.hidden = false;
        }


        // Reset button
        setTimeout(() => {
            if (bookingSubmit) {
                bookingSubmit.disabled = false;
                bookingSubmit.textContent = "Book a test";
            }
        }, 1500);
    });
}


// ========================================
// PHONE NUMBER INPUT
// ========================================

const phoneField = document.getElementById("phone");

if (phoneField) {
    phoneField.addEventListener("input", () => {
        phoneField.value = phoneField.value.replace(/[^\d+]/g, "");
    });
}


// ========================================
// BUTTON FEEDBACK
// ========================================

document.querySelectorAll(".booking-submit").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("clicked");

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 300);
    });
});


// ========================================
// LUCIDE ICONS
// ========================================

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


// ========================================
// FOOTER YEAR
// ========================================

const yearElement = document.querySelector("[data-year]");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ========================================
// CONSOLE MESSAGE
// ========================================

console.log("Peridot Health Diagnostics website loaded successfully.");
