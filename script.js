// Smooth scroll feature
const links = document.querySelectorAll("nav a"); //Selects all <a> links inside the <nav> tag.
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); //Prevents the default jump-scroll.
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});


// Navbar 
const nav = document.querySelector(".navbar"); //Saves navbar in a variable for later use.

// Back-to-top button
const backTop = document.createElement("button");
backTop.textContent = "↑ Top";
backTop.classList.add("back-to-top");
document.body.appendChild(backTop);

window.addEventListener("scroll", () => {
    // Navbar color change
    nav.classList.toggle("scrolled", window.scrollY > 50); //navbar gets a darker background.

    // Show/hide back-to-top button
    backTop.style.display = window.scrollY > 300 ? "block" : "none"; //back-to-top button appears.
});

backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// Fade-in/out on scroll
const fadeItems = document.querySelectorAll(".fade"); //Looks for all elements with class .fade

function handleFade() {
    fadeItems.forEach(el => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight - 50 && rect.bottom > 50;

        if (inView) {
            el.classList.add("show");
            el.classList.remove("hide");
        } else {
            el.classList.add("hide");
            el.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", handleFade);
window.addEventListener("load", handleFade);


// Get modal elements
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentGallery = [];  
let currentIndex = 0;

// Attach click event for each project card
document.querySelectorAll(".project-card").forEach(card => {
    const images = Array.from(card.querySelectorAll(".open_modal")); //Opens modal

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentGallery = images;        
            currentIndex = index;
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });
});

// Close model
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => { if(e.target === modal) modal.style.display = "none"; }; //closes the modal.

// Prev/Next image within current project
prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; //Loops through images inside the same project.
    modalImg.src = currentGallery[currentIndex].src;
};

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    modalImg.src = currentGallery[currentIndex].src;
};

//keyboard navigation
document.addEventListener("keydown", e => {
    if(modal.style.display === "flex") {
        if(e.key === "ArrowLeft") prevBtn.click();
        if(e.key === "ArrowRight") nextBtn.click();
        if(e.key === "Escape") closeBtn.click();
    }
});

// Apply a linear gradient to About me
const aboutContainer = document.querySelector(".container_about");
aboutContainer.style.background = "linear-gradient(135deg, #96c9ffff, #117ec7ff)";


// Form submission alert
const form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent!");
    form.reset();
});