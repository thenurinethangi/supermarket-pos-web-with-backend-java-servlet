AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('fade-in');
            setTimeout(() => {
                this.classList.remove('fade-in');
            }, 500);

            
            console.log('View order details');
        });
    });

    
    const orderRows = document.querySelectorAll('.order-row');
    orderRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(5px)';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(.disabled)');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('fade-in');
            setTimeout(() => {
                this.classList.remove('fade-in');
            }, 500);
            
            console.log('Navigate to next/prev page');
        });
    });

    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(139, 195, 74, 0.25)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    }
});