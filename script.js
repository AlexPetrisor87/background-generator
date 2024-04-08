document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    // Toggle the navigation menu and burger animation
    function toggleNav() {
        nav.classList.toggle("nav-active");
        burger.classList.toggle("toggle");

        // Animate links if navigation is active
        navLinks.forEach((link, index) => {
            if (nav.classList.contains("nav-active")) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            } else {
                link.style.animation = '';
            }
        });
    }

    // Close the navigation menu on link click
    function closeNavOnClick() {
        if (nav.classList.contains("nav-active")) {
            toggleNav();
        }
    }

    // Smooth scrolling to sections
    function smoothScrollToSection(e) {
        e.preventDefault();
    
        // Use currentTarget instead of target to ensure we're working with the element the event listener was attached to
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
    
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
                                                                      
    // Event listeners
    burger.addEventListener("click", toggleNav);
    navLinks.forEach(link => link.addEventListener("click", closeNavOnClick)); // Updated to ensure it works for <li> elements with <a> inside
    document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener("click", smoothScrollToSection));

    // Carousel Functionality
    const carouselInner = document.getElementById('carouselInner');
    const items = Array.from(carouselInner.children);
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);
    let currentPosition = 0;

    // Clone items for seamless looping
    items.forEach(item => carouselInner.appendChild(item.cloneNode(true)));

    function moveCarousel() {
        currentPosition -= 1; // Adjust this value to control the speed
        if (Math.abs(currentPosition) >= totalWidth) currentPosition = 0; // Reset position after completing one loop
        carouselInner.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(moveCarousel);
    }

    moveCarousel(); // Start the carousel movement
});
function initMap() {
    var location = {lat: 51.41233, lng: -0.300689}; // Latitude and Longitude for 54 Lower Marsh Lane
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}