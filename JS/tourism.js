document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('destination-card')) {
                    entry.target.style.transitionDelay = '0.2s';
                }
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.destination-card, .activity-card, .package-card, .tip-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            packageCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    
    const calculateButtons = document.querySelectorAll('.btn-book');
    calculateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.package-card');
            const basePrice = parseInt(card.querySelector('.package-price h4').textContent
                .replace('Rp ', '').replace('.', ''));
            showPriceCalculator(basePrice, card.querySelector('h3').textContent);
        });
    });

    function showPriceCalculator(basePrice, packageName) {
        
        const modal = document.createElement('div');
        modal.className = 'price-calculator-modal';
        modal.innerHTML = `
            <div class="calculator-content">
                <h3>${packageName}</h3>
                <div class="calculator-form">
                    <div class="form-group">
                        <label>Jumlah Orang</label>
                        <input type="number" min="1" value="1" id="personCount">
                    </div>
                    <div class="form-group">
                        <label>Tanggal Keberangkatan</label>
                        <input type="date" id="departureDate">
                    </div>
                    <div class="price-summary">
                        <div class="summary-row">
                            <span>Harga Dasar</span>
                            <span>Rp ${basePrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total</span>
                            <span>Rp ${basePrice.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <button class="btn-book-now">Pesan Sekarang</button>
                </div>
                <button class="close-modal">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        
        const personCount = modal.querySelector('#personCount');
        const priceTotal = modal.querySelector('.total span:last-child');
        
        personCount.addEventListener('input', function() {
            const total = basePrice * parseInt(this.value);
            priceTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        });

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

      
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });

     
        const style = document.createElement('style');
        style.textContent = `
            .price-calculator-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 1000;
            }
            
            .price-calculator-modal.show {
                opacity: 1;
            }
            
            .calculator-content {
                background: white;
                padding: 32px;
                border-radius: 16px;
                position: relative;
                width: 90%;
                max-width: 500px;
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .price-calculator-modal.show .calculator-content {
                transform: translateY(0);
            }
            
            .calculator-form {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .form-group input {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .price-summary {
                background: #f5f5f5;
                padding: 16px;
                border-radius: 8px;
                margin-top: 16px;
            }
            
            .summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .summary-row.total {
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid #ddd;
                font-weight: bold;
            }
            
            .close-modal {
                position: absolute;
                top: 16px;
                right: 16px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            }
            
            .btn-book-now {
                background: var(--accent);
                color: #003366;
                padding: 12px;
                border: none;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            
            .btn-book-now:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
});
