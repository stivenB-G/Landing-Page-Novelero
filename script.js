// --- FUNCIONALIDAD PARA LA MODAL DMCA ---

// Función para abrir la modal
function openDmcaModal() {
    const modal = document.getElementById('dmcaModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Función para cerrar la modal
function closeDmcaModal() {
    const modal = document.getElementById('dmcaModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function openPrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) modal.classList.add('active');
}

function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) modal.classList.remove('active');
}

function openTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) modal.classList.add('active');
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) modal.classList.remove('active');
}

// Cerrar la modal haciendo clic fuera de la caja contenedora
window.onclick = function(event) {
    const modal = document.getElementById('dmcaModal');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    if (event.target === modal) {
        closeDmcaModal();
    }
    if (event.target === privacyModal) {
        closePrivacyModal();
    }
    if (event.target === termsModal) closeTermsModal();
};

// --- CARRUSEL DE CAPTURAS DE PANTALLA ---

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const viewport = document.querySelector('.carousel-viewport');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');

    if (!track || !viewport) return;

    const cards = track.querySelectorAll('.screenshot-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    let autoScrollInterval;
    let isPaused = false;

    function getCardWidth() {
        const card = cards[0];
        const style = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const gap = parseInt(style.gap) || 20;
        return cardWidth + gap;
    }

    function getMaxIndex() {
        const viewportWidth = viewport.offsetWidth;
        const totalWidth = track.scrollWidth;
        const visibleCards = Math.floor(viewportWidth / getCardWidth());
        return Math.max(0, cards.length - visibleCards);
    }

    function updateCarousel() {
        const offset = currentIndex * getCardWidth();
        track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        const maxIndex = getMaxIndex();
        currentIndex++;
        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        const maxIndex = getMaxIndex();
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, 3000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Botones de navegación
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoScroll(); // reiniciar el timer
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoScroll(); // reiniciar el timer
        });
    }

    // Pausar al pasar el mouse
    viewport.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    viewport.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Pausar al hacer touch en móviles
    viewport.addEventListener('touchstart', () => {
        isPaused = true;
    }, { passive: true });
    viewport.addEventListener('touchend', () => {
        setTimeout(() => {
            isPaused = false;
        }, 2000);
    }, { passive: true });

    // Reiniciar al redimensionar la ventana
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    // Iniciar el auto-scroll
    startAutoScroll();
});