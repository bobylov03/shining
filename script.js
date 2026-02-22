// =========================================
// DOM Ready Function
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shining Strings - Initializing...');
    
    // Основные функции
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeHeaderScrollEffect();
    initializeBackToTop();
    initializeCurrentYear();
    
    // Контент и анимации
    initializeStatsCounter();
    initializeTestimonialSlider();
    initializeFAQAccordion();
    initializeScrollAnimations();
    initializeVideoLazyLoading();
    
    // Формы и контакты - ОБНОВЛЕНО для FormSubmit
    initializeFormValidation();
    initializeFormSubmission();
    initializeWhatsAppButton();
    initializePrivacyPolicyModal();
    initializeNewsletterForm();
    
    // Устаревшие функции (если есть)
    initializeRepertoireTabs();
    initializeAudioPlayers();
    
    // ===== НОВЫЕ SEO-ФУНКЦИИ =====
    initializeStructuredDataValidation();
    initializeMetaTagsEnhancement();
    initializeBreadcrumbTracking();
    initializePerformanceMonitoring();
    initializeSocialMediaTracking();
    initializeCanonicalUrlHandling();
    initializeLanguageRedirect();
    initialize404Tracking();
    initializeSearchConsoleIntegration();
    initializeSchemaMarkupValidation();
    initializeCoreWebVitals();
    initializeSitemapUpdater();
    initializeRobotsTxtChecker();
    
    console.log('Shining Strings - Initialization complete');
});

// =========================================
// Mobile Menu Functionality
// =========================================
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        
        // Change icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// =========================================
// Animated Stats Counter
// =========================================
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

// =========================================
// Testimonial Slider - ИСПРАВЛЕННАЯ ВЕРСИЯ
// =========================================
function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    let isTransitioning = false;
    
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Сохраняем позицию скролла
        const scrollPosition = window.pageYOffset;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        slides[index].style.display = 'block';
        
        // Activate current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
        
        // Восстанавливаем позицию скролла
        window.scrollTo({
            top: scrollPosition,
            behavior: 'auto'
        });
        
        // Сбрасываем флаг через небольшую задержку
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Initialize first slide
    showSlide(0);
    startAutoSlide();
    
    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // For touch devices
        sliderContainer.addEventListener('touchstart', stopAutoSlide);
        sliderContainer.addEventListener('touchend', () => {
            setTimeout(startAutoSlide, 3000);
        });
    }
    
    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            setTimeout(startAutoSlide, 5000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            setTimeout(startAutoSlide, 5000);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            setTimeout(startAutoSlide, 5000);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            stopAutoSlide();
            prevSlide();
            setTimeout(startAutoSlide, 5000);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            stopAutoSlide();
            nextSlide();
            setTimeout(startAutoSlide, 5000);
        }
    });
}

// =========================================
// FAQ Accordion - ИСПРАВЛЕННАЯ ВЕРСИЯ
// =========================================
function initializeFAQAccordion() {
    console.log('Initializing FAQ Accordion...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) {
        console.log('No FAQ items found');
        return;
    }
    
    console.log(`Found ${faqItems.length} FAQ items`);
    
    // Сначала закроем все FAQ, кроме первого
    faqItems.forEach((item, index) => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            if (index === 0) {
                // Первый FAQ открыт по умолчанию
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            }
        }
    });
    
    // Добавляем обработчики событий
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) {
            console.warn('FAQ item missing question element');
            return;
        }
        
        // Удаляем старые обработчики (если есть)
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);
        
        // Добавляем новый обработчик
        newQuestion.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Сохраняем позицию скролла
            const scrollPosition = window.pageYOffset;
            
            console.log('FAQ clicked:', item);
            
            // Закрываем все другие FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Переключаем текущий FAQ
            const wasActive = item.classList.contains('active');
            item.classList.toggle('active');
            
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                if (wasActive) {
                    // Закрываем
                    answer.style.maxHeight = '0';
                } else {
                    // Открываем
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
            
            // Анимация иконки
            const icon = newQuestion.querySelector('i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
            
            // Восстанавливаем позицию скролла после изменения высоты
            setTimeout(() => {
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'auto'
                });
            }, 10);
        });
        
        // Добавляем обработчик для клавиатуры
        newQuestion.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                newQuestion.click();
            }
        });
        
        // Устанавливаем атрибуты доступности
        newQuestion.setAttribute('role', 'button');
        newQuestion.setAttribute('tabindex', '0');
        newQuestion.setAttribute('aria-expanded', item.classList.contains('active'));
    });
    
    // Обновляем атрибуты доступности при изменении
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                const question = mutation.target.querySelector('.faq-question');
                if (question) {
                    question.setAttribute('aria-expanded', mutation.target.classList.contains('active'));
                }
            }
        });
    });
    
    faqItems.forEach(item => {
        observer.observe(item, { attributes: true });
    });
    
    console.log('FAQ Accordion initialized successfully');
}

// =========================================
// Back to Top Button
// =========================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleBackToTop();
}

// =========================================
// WhatsApp Button Enhancement
// =========================================
function initializeWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-contact');
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    const phoneNumber = "+14379873848";
    const defaultMessage = "Hello Anna! I'm interested in booking a violin performance for my event. Could you please provide more information?";
    
    function openWhatsApp(message = defaultMessage) {
        const encodedMessage = encodeURIComponent(message);
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
        
        whatsappBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWhatsApp();
            }
        });
    }
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
        
        whatsappFloat.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWhatsApp();
            }
        });
    }
}

// =========================================
// Video Lazy Loading
// =========================================
function initializeVideoLazyLoading() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    if (!videoContainers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const iframe = container.querySelector('iframe');
                
                if (iframe) {
                    if (!iframe.hasAttribute('loading')) {
                        iframe.setAttribute('loading', 'lazy');
                    }
                    
                    const src = iframe.getAttribute('src');
                    if (src && !src.includes('autoplay')) {
                        iframe.setAttribute('title', iframe.getAttribute('title') || 'YouTube video player');
                    }
                }
                
                observer.unobserve(container);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });
    
    videoContainers.forEach(container => observer.observe(container));
}

// =========================================
// Privacy Policy Modal
// =========================================
function initializePrivacyPolicyModal() {
    const privacyLinks = document.querySelectorAll('.privacy-link');
    
    if (!privacyLinks.length) return;
    
    privacyLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPrivacyPolicyModal();
        });
    });
}

function showPrivacyPolicyModal() {
    if (document.querySelector('.privacy-modal')) {
        return;
    }
    
    const scrollPosition = window.pageYOffset;
    
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'privacy-modal-title');
    modal.setAttribute('aria-modal', 'true');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'privacy-modal-content';
    
    modalContent.innerHTML = `
        <button class="modal-close" aria-label="Close privacy policy">
            <i class="fas fa-times"></i>
        </button>
        
        <h2 id="privacy-modal-title">Privacy Policy</h2>
        
        <div class="modal-body">
            <p><strong>Last Updated: ${new Date().toLocaleDateString()}</strong></p>
            
            <h3>Information We Collect</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
                <li>Name and contact information (email, phone number)</li>
                <li>Event details (date, location, type of event)</li>
                <li>Musical preferences and special requests</li>
                <li>Communication history</li>
            </ul>
            
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Respond to your inquiries and provide quotes</li>
                <li>Plan and prepare for your event</li>
                <li>Communicate with you about your booking</li>
                <li>Send updates and promotional materials (only with your consent)</li>
            </ul>
            
            <h3>Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            
            <h3>Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
            </ul>
            
            <p class="modal-footer">
                By submitting the contact form, you agree to the terms of this Privacy Policy.
            </p>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
    });
    
    const previousActiveElement = document.activeElement;
    
    setTimeout(() => {
        modal.querySelector('.modal-close').focus();
    }, 10);
    
    function closeModal() {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', handleEscapeKey);
        
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
    }
    
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    document.addEventListener('keydown', handleEscapeKey);
    
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
}

// =========================================
// Scroll Animations
// =========================================
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature, .service-card, .category-card, .step, .video-card');
    
    if (!animateElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// =========================================
// Form Validation - ОБНОВЛЕНО для FormSubmit
// =========================================
function initializeFormValidation() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    
    // Validation for number of guests
    const guestsInput = document.getElementById('guests');
    if (guestsInput) {
        guestsInput.addEventListener('input', function() {
            if (this.value < 1) {
                this.value = 1;
            }
            clearError(this);
        });
    }
    
    // Privacy checkbox validation
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', function() {
            clearError(this);
        });
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() && !emailRegex.test(this.value.trim())) {
                showError(this, 'Please enter a valid email address (e.g., name@example.com)');
            } else {
                clearError(this);
            }
        });
    }
    
    // Date validation
    const dateInput = document.getElementById('event-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showError(this, 'Please select a future date');
            } else {
                clearError(this);
            }
        });
    }
}

// =========================================
// Form Submission - ОБНОВЛЕНО для FormSubmit
// =========================================
function initializeFormSubmission() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    
    // Перехватываем отправку формы для валидации
    form.addEventListener('submit', function(e) {
        // Валидация перед отправкой
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        let firstErrorField = null;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            } else {
                field.classList.remove('error');
            }
        });
        
        // Проверка email
        const emailInput = document.getElementById('email');
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.classList.add('error');
                if (!firstErrorField) {
                    firstErrorField = emailInput;
                }
            }
        }
        
        // Проверка privacy checkbox
        const privacyCheckbox = document.getElementById('privacy');
        if (privacyCheckbox && !privacyCheckbox.checked) {
            isValid = false;
            privacyCheckbox.classList.add('error');
            if (!firstErrorField) {
                firstErrorField = privacyCheckbox;
            }
        }
        
        if (!isValid) {
            e.preventDefault();
            
            let errorMessage = 'Please fill in all required fields correctly.';
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
            
            // Показываем сообщение об ошибке
            const existingMessage = document.querySelector('.form-message');
            if (existingMessage) existingMessage.remove();
            
            const messageElement = document.createElement('div');
            messageElement.className = 'form-message form-message-error';
            messageElement.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>${errorMessage}</span>
            `;
            form.parentNode.insertBefore(messageElement, form.nextSibling);
            
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
            
            return false;
        }
        
        // Если валидация прошла, показываем сообщение об отправке
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // FormSubmit отправит форму, мы показываем сообщение
        const messageElement = document.createElement('div');
        messageElement.className = 'form-message form-message-info';
        messageElement.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>Sending your request...</span>
        `;
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Разрешаем отправку формы
        return true;
    });
}

// Form helper functions
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    clearError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    field.parentNode.appendChild(errorElement);
    field.classList.add('error');
}

function clearError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.setAttribute('role', 'alert');
    
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    messageElement.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
    `;
    
    const form = document.getElementById('quote-form');
    if (form && form.parentNode) {
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.opacity = '0';
                messageElement.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.remove();
                    }
                }, 500);
            }
        }, 5000);
        
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function trackFormSubmission(formData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': formData['event-type'] || 'Unknown',
            'value': 1
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: 'Violin Performance',
            content_name: formData['event-type'] || 'Unknown'
        });
    }
}

// =========================================
// Repertoire Tabs
// =========================================
function initializeRepertoireTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            this.classList.add('active');
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.style.display = 'block';
            }
        });
    });
}

// =========================================
// Audio Players
// =========================================
function initializeAudioPlayers() {
    const audioSamples = document.querySelectorAll('.audio-sample');
    
    if (audioSamples.length === 0) return;
    
    console.log('Audio players found, but video section is now used instead.');
}

// =========================================
// Current Year in Footer
// =========================================
function initializeCurrentYear() {
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// =========================================
// Smooth Scrolling
// =========================================
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, href);
            }
        });
    });
}

// =========================================
// Header Scroll Effect
// =========================================
function initializeHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    header.style.transform = 'none';
    header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateHeader();
}

// =========================================
// Newsletter Form Handling
// =========================================
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && email.includes('@')) {
            const button = this.querySelector('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.backgroundColor = '#25D366';
            
            setTimeout(() => {
                emailInput.value = '';
                button.innerHTML = originalHTML;
                button.style.backgroundColor = '';
            }, 2000);
        } else {
            emailInput.style.borderColor = '#ff4444';
            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 2000);
        }
    });
}

// =========================================
// Performance Optimization
// =========================================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

window.addEventListener('resize', debounce(() => {
    document.querySelectorAll('.faq-item.active .faq-answer').forEach(answer => {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    });
}, 250));

// =========================================
// Error Handling
// =========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
});

// =========================================
// Initialize when page is fully loaded
// =========================================
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    setTimeout(() => {
        const faqItems = document.querySelectorAll('.faq-item.active');
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }, 100);
});

// =========================================
// НОВЫЕ SEO-ФУНКЦИИ
// =========================================

function initializeStructuredDataValidation() {
    console.log('Validating structured data...');
    
    const requiredSchemas = [
        'MusicGroup',
        'LocalBusiness',
        'ProfessionalService',
        'FAQPage',
        'BreadcrumbList'
    ];
    
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const foundSchemas = [];
    
    scripts.forEach(script => {
        try {
            const data = JSON.parse(script.textContent);
            if (data['@type']) {
                foundSchemas.push(data['@type']);
            }
        } catch (e) {
            console.error('Invalid JSON-LD:', e);
        }
    });
    
    requiredSchemas.forEach(schema => {
        if (!foundSchemas.includes(schema)) {
            console.warn(`Missing schema: ${schema}`);
        }
    });
    
    console.log('Found schemas:', foundSchemas);
}

function initializeMetaTagsEnhancement() {
    const path = window.location.pathname;
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    
    if (window.location.hash) {
        const section = window.location.hash.replace('#', '');
        switch(section) {
            case 'services':
                if (metaDescription) {
                    metaDescription.setAttribute('content', 
                        'Professional violin services for weddings, corporate events, and private celebrations in Muskoka and Toronto GTA. Book Anna Bobylyova for your special event.'
                    );
                }
                break;
            case 'repertoire':
                if (metaDescription) {
                    metaDescription.setAttribute('content', 
                        'Extensive violin repertoire from classical masterpieces to modern hits. Custom arrangements available for your special event.'
                    );
                }
                break;
        }
    }
}

function initializeBreadcrumbTracking() {
    const breadcrumbs = document.querySelectorAll('.breadcrumb a, .footer-links a, .nav-links a');
    
    breadcrumbs.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkHref = this.getAttribute('href');
            
            console.log('Navigation tracked:', { text: linkText, href: linkHref });
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation', {
                    'event_category': 'Breadcrumb',
                    'event_label': linkText,
                    'value': 1
                });
            }
        });
    });
}

function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Performance Metrics:', {
                        'DOM Load Time': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        'Page Load Time': perfData.loadEventEnd - perfData.loadEventStart,
                        'Time to First Byte': perfData.responseStart - perfData.requestStart,
                        'DOM Interactive': perfData.domInteractive
                    });
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'performance', {
                            'event_category': 'Core Web Vitals',
                            'event_label': 'page_load',
                            'value': Math.round(perfData.loadEventEnd)
                        });
                    }
                }
            }, 0);
        });
    }
}

function initializeSocialMediaTracking() {
    const socialLinks = document.querySelectorAll('.social-icons a, .platform-icons a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label') || this.textContent.trim();
            const url = this.getAttribute('href');
            
            console.log('Social media click:', { platform, url });
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'Social Media',
                    'event_label': platform,
                    'value': 1
                });
            }
        });
    });
}

function initializeCanonicalUrlHandling() {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', window.location.href.split('#')[0].split('?')[0]);
        document.head.appendChild(canonicalLink);
        console.log('Canonical URL added:', canonicalLink.getAttribute('href'));
    }
}

function initializeLanguageRedirect() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const supportedLanguages = ['en', 'uk', 'ru'];
    const currentLang = document.documentElement.lang || 'en';
    
    if (userLanguage && supportedLanguages.includes(userLanguage.split('-')[0])) {
        const preferredLang = userLanguage.split('-')[0];
        
        if (preferredLang !== currentLang && !window.location.pathname.includes('/' + preferredLang)) {
            console.log(`User prefers ${preferredLang} language`);
            showLanguageSuggestion(preferredLang);
        }
    }
}

function showLanguageSuggestion(lang) {
    const langNames = {
        'en': 'English',
        'uk': 'Українська',
        'ru': 'Русский'
    };
    
    if (localStorage.getItem('lang_suggestion_shown')) return;
    
    const notification = document.createElement('div');
    notification.className = 'lang-suggestion';
    notification.innerHTML = `
        <div class="lang-suggestion-content">
            <p>🌐 Would you prefer ${langNames[lang]}?</p>
            <div class="lang-suggestion-buttons">
                <button class="lang-yes" data-lang="${lang}">Yes</button>
                <button class="lang-no">No</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    const style = document.createElement('style');
    style.textContent = `
        .lang-suggestion {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideUp 0.3s ease;
        }
        .lang-suggestion-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .lang-suggestion-buttons {
            display: flex;
            gap: 10px;
        }
        .lang-suggestion button {
            padding: 5px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .lang-yes {
            background: #25D366;
            color: white;
        }
        .lang-no {
            background: #f0f0f0;
        }
        @keyframes slideUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    const yesBtn = notification.querySelector('.lang-yes');
    const noBtn = notification.querySelector('.lang-no');
    
    yesBtn.addEventListener('click', () => {
        window.location.href = `/${lang}/`;
        localStorage.setItem('lang_suggestion_shown', 'true');
    });
    
    noBtn.addEventListener('click', () => {
        notification.remove();
        localStorage.setItem('lang_suggestion_shown', 'true');
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

function initialize404Tracking() {
    const is404 = document.querySelector('.error-404, .not-found') || 
                  document.title.includes('404') || 
                  document.body.innerHTML.includes('404');
    
    if (is404) {
        console.warn('404 Page Not Found:', window.location.href);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', '404_error', {
                'event_category': 'Error',
                'event_label': window.location.href,
                'value': 1
            });
        }
        
        setTimeout(() => {
            if (confirm('Page not found. Go to homepage?')) {
                window.location.href = '/';
            }
        }, 1000);
    }
}

function initializeSearchConsoleIntegration() {
    if (!document.querySelector('meta[name="google-site-verification"]')) {
        console.warn('Google Site Verification meta tag not found');
    }
    
    fetch('/sitemap.xml')
        .then(response => {
            if (response.ok) {
                console.log('✅ Sitemap.xml found and accessible');
            } else {
                console.warn('❌ Sitemap.xml not found or inaccessible');
            }
        })
        .catch(() => {
            console.warn('❌ Sitemap.xml check failed');
        });
    
    fetch('/robots.txt')
        .then(response => {
            if (response.ok) {
                console.log('✅ Robots.txt found and accessible');
            } else {
                console.warn('❌ Robots.txt not found or inaccessible');
            }
        })
        .catch(() => {
            console.warn('❌ Robots.txt check failed');
        });
}

function initializeSchemaMarkupValidation() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    scripts.forEach((script, index) => {
        try {
            const data = JSON.parse(script.textContent);
            
            if (!data['@context']) {
                console.warn(`Schema #${index + 1}: Missing @context`);
            }
            if (!data['@type']) {
                console.warn(`Schema #${index + 1}: Missing @type`);
            }
            
            switch(data['@type']) {
                case 'MusicGroup':
                    if (!data.name) console.warn('MusicGroup: Missing name');
                    if (!data.description) console.warn('MusicGroup: Missing description');
                    break;
                case 'LocalBusiness':
                    if (!data.address) console.warn('LocalBusiness: Missing address');
                    if (!data.telephone) console.warn('LocalBusiness: Missing telephone');
                    break;
                case 'FAQPage':
                    if (!data.mainEntity || !Array.isArray(data.mainEntity)) {
                        console.warn('FAQPage: Missing or invalid mainEntity');
                    }
                    break;
            }
        } catch (e) {
            console.error(`Schema #${index + 1} is invalid JSON:`, e);
        }
    });
}

function initializeCoreWebVitals() {
    if ('PerformanceObserver' in window) {
        try {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime / 1000, 'seconds');
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'core_web_vital', {
                        'event_category': 'LCP',
                        'event_label': 'Largest Contentful Paint',
                        'value': Math.round(lastEntry.startTime)
                    });
                }
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
            console.log('LCP monitoring not supported');
        }
        
        try {
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.duration, 'ms');
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'core_web_vital', {
                            'event_category': 'FID',
                            'event_label': 'First Input Delay',
                            'value': Math.round(entry.duration)
                        });
                    }
                });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
            console.log('FID monitoring not supported');
        }
        
        try {
            const clsObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                let clsValue = 0;
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'core_web_vital', {
                        'event_category': 'CLS',
                        'event_label': 'Cumulative Layout Shift',
                        'value': clsValue
                    });
                }
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            console.log('CLS monitoring not supported');
        }
    }
}

function initializeSitemapUpdater() {
    const lastUpdate = localStorage.getItem('sitemap_last_update');
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    if (!lastUpdate || (Date.now() - parseInt(lastUpdate)) > oneWeek) {
        console.log('Sitemap should be updated');
        
        fetch('/api/generate-sitemap', { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    localStorage.setItem('sitemap_last_update', Date.now().toString());
                    console.log('Sitemap updated successfully');
                }
            })
            .catch(() => {
                console.log('Sitemap auto-update failed - manual update required');
            });
    }
}

function initializeRobotsTxtChecker() {
    fetch('/robots.txt')
        .then(response => response.text())
        .then(content => {
            const requiredDirectives = [
                'User-agent: *',
                'Allow: /',
                'Sitemap:'
            ];
            
            requiredDirectives.forEach(directive => {
                if (!content.includes(directive)) {
                    console.warn(`robots.txt missing directive: ${directive}`);
                }
            });
            
            const sitemapMatch = content.match(/Sitemap:\s*(.+)/);
            if (sitemapMatch) {
                const sitemapUrl = sitemapMatch[1].trim();
                if (!sitemapUrl.startsWith('https://www.shiningstrings.com')) {
                    console.warn('Sitemap URL in robots.txt might be incorrect:', sitemapUrl);
                }
            }
        })
        .catch(() => {
            console.warn('Could not verify robots.txt');
        });
}