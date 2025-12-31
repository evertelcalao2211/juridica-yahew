

// ============================================
// JAVASCRIPT PRINCIPAL - SITIO WEB ABOGADA
// ============================================

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sitio web de la Dra. Claudia Quevedo - JavaScript cargado');
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initScrollAnimations();
    initVideoFallback();
    initSmoothTransitions();
    
    // Verificar si estamos en la página de contacto para inicializar formulario
    if (document.querySelector('.contact-form')) {
        initContactForm();
    }
});

// ===== FUNCIÓN PARA MENÚ MÓVIL ELEGANTE =====
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;
    
    if (!hamburgerBtn || !mobileNav) return;
    
    // Función para abrir/cerrar menú
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Prevenir scroll cuando el menú está abierto
        if (mobileNav.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    // Evento para el botón hamburguesa
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileNav.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// ===== FUNCIÓN PARA ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    // Elementos que se animarán al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    // Crear Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Opcional: dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar cada elemento
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Efecto de header al hacer scroll
    const header = document.querySelector('.main-header');
    
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Efecto de reducir tamaño del header al hacer scroll
            if (scrollTop > 100) {
                header.style.padding = '10px 0';
                header.querySelector('.logo img').style.height = '50px';
            } else {
                header.style.padding = '15px 0';
                header.querySelector('.logo img').style.height = '60px';
            }
            
            // Efecto de mostrar/ocultar header al hacer scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scroll hacia abajo
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll hacia arriba
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// ===== FUNCIÓN PARA FALLBACK DE VIDEO =====
function initVideoFallback() {
    const heroVideo = document.getElementById('heroVideo');
    
    if (!heroVideo) return;
    
    // Verificar si el video se puede reproducir
    heroVideo.addEventListener('error', function() {
        console.log('Error cargando video, usando fallback de imagen');
        
        // Crear elemento de fallback
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.innerHTML = `
                <div class="video-fallback" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
                "></div>
            `;
        }
    });
    
    // Intentar reproducir el video (para algunos navegadores que bloquean autoplay)
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay bloqueado, reproduciendo manualmente al interactuar');
            
            // Reproducir al hacer clic en cualquier parte
            document.addEventListener('click', function playVideoOnInteraction() {
                heroVideo.play();
                document.removeEventListener('click', playVideoOnInteraction);
            });
        });
    }
}

// ===== FUNCIÓN PARA TRANSICIONES SUAVES ENTRE PÁGINAS =====
function initSmoothTransitions() {
    // Agregar clase de transición a todos los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^=""]:not([href^="#"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo aplicar a enlaces internos (no a enlaces externos o con target="_blank")
            if (this.target === '_blank' || this.hostname !== window.location.hostname) {
                return;
            }
            
            // Evitar comportamiento por defecto solo si es un enlace interno
            e.preventDefault();
            
            // Agregar efecto de transición de salida
            document.body.classList.add('page-transition-out');
            
            // Esperar a que termine la animación antes de navegar
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
    
    // Agregar clase de entrada al cargar la página
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
}

// ===== FUNCIÓN PARA FORMULARIO DE CONTACTO =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    // Configurar Formsubmit.co
    const formAction = 'https://formsubmit.co/juridicaintegralcolombia1@gmail.com';
    contactForm.setAttribute('action', formAction);
    contactForm.setAttribute('method', 'POST');
    
    // Agregar campos hidden para Formsubmit.co
    const hiddenFields = `
        <input type="hidden" name="_subject" value="Nueva Consulta Legal - Sitio Web">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_next" value="https://tudominio.com/gracias.html">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_autoresponse" value="Gracias por su consulta. La Dra. Claudia Quevedo se comunicará con usted pronto.">
        <!-- Campo honeypot para spam -->
        <input type="text" name="_honey" style="display:none">
    `;
    
    contactForm.insertAdjacentHTML('beforeend', hiddenFields);
    
    // Validación en tiempo real
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Validación al perder el foco
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Limpiar error al empezar a escribir
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // Validación antes de enviar
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showFormMessage('Por favor, complete todos los campos correctamente.', 'error');
        } else {
            // Mostrar mensaje de envío
            showFormMessage('Enviando su consulta...', 'sending');
            
            // Aquí se enviaría el formulario normalmente
            // Formsubmit.co maneja el envío real
        }
    });
    
    // Funciones de validación
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Limpiar errores anteriores
        clearError(field);
        
        // Validaciones específicas por tipo de campo
        if (field.hasAttribute('required') && value === '') {
            showError(field, 'Este campo es obligatorio');
            isValid = false;
        } else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Ingrese un email válido');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
        field.classList.add('has-error');
    }
    
    function clearError(field) {
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.classList.remove('has-error');
    }
    
    function showFormMessage(message, type) {
        // Eliminar mensaje anterior si existe
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Estilos según tipo
        if (type === 'error') {
            messageDiv.style.backgroundColor = '#ffebee';
            messageDiv.style.color = '#c62828';
            messageDiv.style.border = '1px solid #ef9a9a';
        } else if (type === 'sending') {
            messageDiv.style.backgroundColor = '#e3f2fd';
            messageDiv.style.color = '#1565c0';
            messageDiv.style.border = '1px solid #90caf9';
        }
        
        messageDiv.style.padding = '15px';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.margin = '20px 0';
        messageDiv.style.textAlign = 'center';
        
        // Insertar antes del formulario
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
    }
}

// ===== FUNCIÓN PARA EFECTO DE ESCRITURA (TYPEWRITER) =====
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (!typewriterElement) return;
    
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    const speed = 50; // Velocidad en milisegundos
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Iniciar efecto cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.unobserve(typewriterElement);
        }
    });
    
    observer.observe(typewriterElement);
}

// ===== INICIALIZAR EFECTO TYPEWRITER SI EXISTE =====
if (document.querySelector('.typewriter-text')) {
    initTypewriterEffect();
}

// ===== MANEJAR ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== POLYFILL PARA INTERSECTION OBSERVER (para navegadores viejos) =====
if (!window.IntersectionObserver) {
    // Cargar polyfill dinámicamente
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
    
    // Una vez cargado el polyfill, reinicializar animaciones
    script.onload = function() {
        initScrollAnimations();
    };
}