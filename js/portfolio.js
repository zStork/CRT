// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init();

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    // Re-trigger AOS animation
                    item.setAttribute('data-aos-delay', '0');
                    item.classList.remove('aos-animate');
                    setTimeout(() => {
                        item.classList.add('aos-animate');
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
