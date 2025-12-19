document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = modal.querySelector('.modal-img');
    const modalCaption = modal.querySelector('.modal-caption');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    const galleryItems = document.querySelectorAll('.galeri-item');
    
    let currentIndex = 0;

    
    function showModal(index) {
        const item = galleryItems[index];
        const img = item.querySelector('.galeri-img');
        const caption = item.querySelector('.galeri-caption');

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = caption.textContent;
        modal.classList.add('show');
        currentIndex = index;

        
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === galleryItems.length - 1 ? 'none' : 'block';
    }

   
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showModal(index));
    });

   
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

 
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            showModal(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < galleryItems.length - 1) {
            showModal(currentIndex + 1);
        }
    });

  
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;

        if (e.key === 'Escape') {
            modal.classList.remove('show');
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showModal(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
            showModal(currentIndex + 1);
        }
    });

  
    galleryItems.forEach(item => {
        const img = item.querySelector('.galeri-img');
        img.addEventListener('load', () => {
            item.classList.add('loaded');
        });
    });

  
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.galeri-img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
