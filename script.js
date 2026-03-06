// Image array (paths to images)
const images = [
    "images/img1.webp",
    "images/img2.webp",
    "images/img3.webp",
    "images/img4.webp",
    "images/img5.webp"
    
];

// DOM elements
const sliderImage = document.getElementById("sliderImage");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.getElementById("dotsContainer");

// Current image index
let currentIndex = 0;
let autoSlideInterval;

/*
 Initialize Slider
*/
function initSlider() {
    sliderImage.src = images[currentIndex];
    createDots();
    activateDot();
    startAutoSlide();
}

/*
Show Image
*/
function showImage(index) {
    sliderImage.style.opacity = 0;

    setTimeout(() => {
        sliderImage.src = images[index];
        sliderImage.style.opacity = 1;
        activateDot();
    }, 200);
}

/*
 Next Image
*/
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

/*
 Previous Image
*/
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

/*
Auto Slideshow
*/
function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 3000);
}

/*
Restart Auto Slide on Manual Action
*/
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

/*
 Create Navigation Dots

*/
function createDots() {
    dotsContainer.innerHTML = "";

    images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => {
            currentIndex = index;
            showImage(currentIndex);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
}

/*
 Activate Current Dot
*/
function activateDot() {
    const dots = dotsContainer.children;
    Array.from(dots).forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

/*
Button Events
*/
nextBtn.addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
});

// Initialize on load
initSlider();
