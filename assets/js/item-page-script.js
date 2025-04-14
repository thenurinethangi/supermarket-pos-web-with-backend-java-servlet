AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});


document.querySelectorAll('.table-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transition = 'all 0.3s ease';
        row.style.backgroundColor = 'rgba(255, 204, 0, 0.1)';
        row.style.transform = 'translateY(-2px)';
        row.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
    });

    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = '';
        row.style.transform = 'translateY(0)';
        row.style.boxShadow = 'none';
    });
});


window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        document.querySelector('.navbar').classList.add('scroll-shadow');
    } else {
        document.querySelector('.navbar').classList.remove('scroll-shadow');
    }
});


document.querySelector('#addItemBtn').addEventListener('mouseenter', function() {
    this.classList.add('pulse');
});

document.querySelector('#addItemBtn').addEventListener('mouseleave', function() {
    this.classList.remove('pulse');
});


document.querySelector('.prev-page').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 300);
});

document.querySelector('.next-page').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 300);
});


const searchInput = document.querySelector('.search-container input');

searchInput.addEventListener('focus', function() {
    this.parentElement.style.transition = 'all 0.3s ease';
    this.parentElement.style.transform = 'scale(1.03)';
    this.parentElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
});

searchInput.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
    this.parentElement.style.boxShadow = 'none';
});


document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'scale(1.2)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});


document.querySelectorAll('.price-cell').forEach(cell => {
    
    cell.addEventListener('mouseenter', () => {
        cell.style.transition = 'all 0.3s ease';
        cell.style.color = '#ff9800';
        cell.style.fontWeight = '600';
    });

    cell.addEventListener('mouseleave', () => {
        cell.style.color = '';
        cell.style.fontWeight = '500';
    });
});

document.querySelectorAll('.qty-cell').forEach(cell => {
    
    cell.addEventListener('mouseenter', () => {
        cell.style.transition = 'all 0.3s ease';
        cell.style.color = '#4caf50';
        cell.style.fontWeight = '600';
    });

    cell.addEventListener('mouseleave', () => {
        cell.style.color = '';
        cell.style.fontWeight = '500';
    });
});