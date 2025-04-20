document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const techniqueCards = document.querySelectorAll('.technique-card');

    // Filter techniques based on category
    function filterTechniques(category) {
        techniqueCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter techniques
            filterTechniques(this.dataset.category);
        });
    });

    // Initialize with all techniques shown
    filterTechniques('all');

    // Video sizing adjustment
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        // Set aspect ratio to 4:3 (less tall than default 16:9)
        container.style.paddingBottom = '75%'; // 3/4 = 75%
    });

    // Rating system interaction
    const ratings = document.querySelectorAll('.rating');
    ratings.forEach(rating => {
        const stars = rating.querySelectorAll('.fas.fa-star, .far.fa-star, .fas.fa-star-half-alt');
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', function() {
                // Highlight stars on hover
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add('fas', 'fa-star');
                    stars[i].classList.remove('far', 'fa-star-half-alt');
                }
            });

            star.addEventListener('mouseout', function() {
                // Reset to original rating
                const ratingValue = parseFloat(rating.querySelector('span').textContent.split(' ')[0]);
                highlightStars(rating, ratingValue);
            });
        });
    });

    // Helper function to highlight stars based on rating
    function highlightStars(ratingElement, rating) {
        const stars = ratingElement.querySelectorAll('.fas.fa-star, .far.fa-star, .fas.fa-star-half-alt');
        stars.forEach((star, index) => {
            star.classList.remove('fas', 'far', 'fa-star-half-alt');
            
            if (index < Math.floor(rating)) {
                star.classList.add('fas', 'fa-star');
            } else if (index === Math.floor(rating) && rating % 1 >= 0.5) {
                star.classList.add('fas', 'fa-star-half-alt');
            } else {
                star.classList.add('far', 'fa-star');
            }
        });
    }
});