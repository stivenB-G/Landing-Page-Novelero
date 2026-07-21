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