// 1. DARK / LIGHT MODE TOGGLE FUNCTION
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Saves choice for next visit
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');  // Saves choice for next visit
    }
}

// 2. RUN ON PAGE LOAD (PERSISTENT THEME + TYPING ANIMATION)
document.addEventListener('DOMContentLoaded', () => {
    
    // Check local storage so the user's theme preference doesn't reset on refresh
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // TYPING ANIMATION ENGINE FOR HERO SECTION
    const typedTextSpan = document.getElementById('typed');
    
    // Add your custom specialization titles here
    const roles = ["Computer Science Student","Learning New Technologies","Creating Real Projects","Ready for My First Job"];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        // Speed settings
        let typeSpeed = isDeleting ? 50 : 100;

        // If word is completely typed out
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at the end of the word
            isDeleting = true;
        } 
        // If word is completely erased
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next title
            typeSpeed = 500; // Pause before starting next word
        }

        setTimeout(type, typeSpeed);
    }

    // Initialize typing effect if element exists
    if (typedTextSpan) {
        type();
    }
});
