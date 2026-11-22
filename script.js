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

// --- CARRUSEL INFINITO DE CAPTURAS DE PANTALLA ---

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const viewport = document.querySelector('.carousel-viewport');

    if (!track || !viewport) return;

    const originalCards = track.querySelectorAll('.screenshot-card');
    if (originalCards.length === 0) return;

    // Clonar las tarjetas para crear el efecto infinito
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // Variables para la animación
    let position = 0;
    let isPaused = false;
    let animationId = null;
    const speed = 1.0; // píxeles por frame (más rápido y fluido)

    function getHalfWidth() {
        // El ancho del primer set de tarjetas (mitad del track total)
        return track.scrollWidth / 2;
    }

    function animate() {
        if (!isPaused) {
            position += speed;
            const halfWidth = getHalfWidth();
            if (position >= halfWidth) {
                position = 0; // Reiniciar de forma imperceptible
            }
            track.style.transform = `translateX(-${position}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }

    // Iniciar la animación
    animationId = requestAnimationFrame(animate);

    // --- Pausa del carrusel ---

    // Desktop: pausar al pasar el mouse
    viewport.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    viewport.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Móvil: pausar mientras se mantiene presionado
    viewport.addEventListener('touchstart', () => {
        isPaused = true;
    }, { passive: true });
    viewport.addEventListener('touchend', () => {
        isPaused = false;
    }, { passive: true });
    viewport.addEventListener('touchmove', () => {
        isPaused = true;
    }, { passive: true });
    viewport.addEventListener('touchcancel', () => {
        isPaused = false;
    }, { passive: true });

    // --- LIGHTBOX: abrir imágenes al tocar o hacer clic ---

    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
    }

    window.closeLightbox = function () {
        lightbox.classList.remove('active');
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    // Detectar toques cortos (tap) en imágenes para abrir el lightbox
    let touchStartTime = 0;
    let touchStartTarget = null;

    track.addEventListener('touchstart', function (e) {
        const img = e.target.closest('.screenshot-card img');
        if (img) {
            touchStartTime = Date.now();
            touchStartTarget = img;
        }
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
        if (touchStartTarget && Date.now() - touchStartTime < 300) {
            // Toque corto (tap) — abrir lightbox
            openLightbox(touchStartTarget.src);
        }
        touchStartTarget = null;
    }, { passive: true });

    // Clic en desktop como respaldo
    track.addEventListener('click', function (e) {
        const img = e.target.closest('.screenshot-card img');
        if (img) {
            openLightbox(img.src);
        }
    });

    // Cerrar lightbox al tocar o hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    lightbox.addEventListener('touchend', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    }, { passive: true });
});