document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    fadeInOnScroll();

    window.addEventListener('scroll', fadeInOnScroll);

    const statValues = document.querySelectorAll('.stat-value');

    statValues.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50);
        const duration = 1500; // ms
        const interval = duration / (finalValue / increment);

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue > finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            stat.textContent = currentValue;
        }, interval);
    });
});