document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    const factNumbers = document.querySelectorAll('.fact-number');
    factNumbers.forEach(number => {
        observer.observe(number);
    });

    function animateCounter(element) {
        const target = parseFloat(element.textContent);
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;
        
        const increment = target / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, stepTime);
    }

    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImg.style.transform = `translateY(${scrolled * 0.2}px)`;
        });
    }

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fact-number {
            transition: color 0.3s ease;
        }
        
        .fact-number.animate {
            color: var(--accent);
        }
        
        .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card.hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 32px rgba(31, 38, 135, 0.25);
        }
        
        .hero-img {
            transition: transform 0.1s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(-100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.fact-number').forEach(number => {
        if (number.classList.contains('animate')) {
            animateCounter(number);
        }
    });
});
