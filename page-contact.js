
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
 
    if (!nom || !email || !message) {
        alert('Veuillez remplir tous les champs !');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer un email valide !');
        return;
    }

    const btnEnvoyer = this.querySelector('.btn-envoyer');
    const originalText = btnEnvoyer.textContent;
    
    btnEnvoyer.textContent = 'Envoi en cours...';
    btnEnvoyer.disabled = true;
    btnEnvoyer.style.opacity = '0.7';
    
    setTimeout(() => {
        alert('Message envoyé avec succès !\n\nNom: ' + nom + '\nEmail: ' + email);
        btnEnvoyer.textContent = originalText;
        btnEnvoyer.disabled = false;
        btnEnvoyer.style.opacity = '1';
        this.reset();
    }, 1500);
});

document.querySelector('.btn-reset').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
});