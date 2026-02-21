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
    initializeFAQAccordion(); // Убедимся, что это вызывается
    initializeScrollAnimations();
    initializeVideoLazyLoading();
    
    // Формы и контакты
    initializeFormValidation();
    initializeFormSubmission();
    initializeWhatsAppButton();
    initializePrivacyPolicyModal();
    initializeNewsletterForm();
    
    // Устаревшие функции (если есть)
    initializeRepertoireTabs();
    initializeAudioPlayers();
    
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
// Testimonial Slider
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
    
    function showSlide(index) {
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
            stopAutoSlide();
            prevSlide();
            setTimeout(startAutoSlide, 5000);
        }
        if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            setTimeout(startAutoSlide, 5000);
        }
    });
}

// =========================================
// FAQ Accordion - ИСПРАВЛЕННАЯ ФУНКЦИЯ
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
    
    const phoneNumber = "+14371234567";
    const defaultMessage = "Hello Anna! I'm interested in booking a violin performance for my event. Could you please provide more information?";
    
    function openWhatsApp(message = defaultMessage) {
        const encodedMessage = encodeURIComponent(message);
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }
    
    // Regular WhatsApp button
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
        
        // Добавляем поддержку клавиатуры
        whatsappBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWhatsApp();
            }
        });
    }
    
    // Floating WhatsApp button
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
        
        // Добавляем поддержку клавиатуры
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
                    // Добавляем атрибут loading="lazy" если еще нет
                    if (!iframe.hasAttribute('loading')) {
                        iframe.setAttribute('loading', 'lazy');
                    }
                    
                    // Можно добавить предзагрузку
                    const src = iframe.getAttribute('src');
                    if (src && !src.includes('autoplay')) {
                        // Не автозапускаем, чтобы сохранить трафик пользователя
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
        // Удаляем старые обработчики
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPrivacyPolicyModal();
        });
    });
}

function showPrivacyPolicyModal() {
    // Проверяем, не открыт ли уже модальный
    if (document.querySelector('.privacy-modal')) {
        return;
    }
    
    // Создаем модальный контейнер
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'privacy-modal-title');
    modal.setAttribute('aria-modal', 'true');
    
    // Создаем содержимое модального окна
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
    
    // Сохраняем текущий активный элемент для возврата фокуса
    const previousActiveElement = document.activeElement;
    
    // Фокусируемся на модальном окне
    setTimeout(() => {
        modal.querySelector('.modal-close').focus();
    }, 10);
    
    // Добавляем функциональность закрытия
    function closeModal() {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Возвращаем фокус на предыдущий элемент
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
    }
    
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Закрытие при клике вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие с помощью клавиши Escape
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    document.addEventListener('keydown', handleEscapeKey);
    
    // Ловим фокус внутри модального окна
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                // Tab
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
// Form Validation
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
        // Set min date to today
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
// Form Submission
// =========================================
function initializeFormSubmission() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        let firstErrorField = null;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });
        
        // Special validation for privacy checkbox
        const privacyCheckbox = document.getElementById('privacy');
        if (privacyCheckbox && !privacyCheckbox.checked) {
            showError(privacyCheckbox, 'You must agree to the Privacy Policy');
            isValid = false;
            if (!firstErrorField) {
                firstErrorField = privacyCheckbox;
            }
        }
        
        if (!isValid && firstErrorField) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const originalDisabled = submitBtn.disabled;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await simulateFormSubmission(formObject);
            
            // Show success message
            showFormMessage(`Thank you for your inquiry, ${formObject.name || ''}! Anna will contact you within 24 hours with a personalized quote.`, 'success');
            
            // Reset form
            form.reset();
            
            // Track submission (if analytics are set up)
            trackFormSubmission(formObject);
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('There was an error submitting your request. Please try again or contact us directly via WhatsApp.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = originalDisabled;
        }
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

async function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted with data:', formData);
            resolve();
        }, 1500);
    });
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.setAttribute('role', 'alert');
    
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    messageElement.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
    `;
    
    // Insert after form
    const form = document.getElementById('quote-form');
    if (form && form.parentNode) {
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Auto-remove message after 10 seconds
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
        }, 10000);
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function trackFormSubmission(formData) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': formData['event-type'] || 'Unknown',
            'value': 1
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: 'Violin Performance',
            content_name: formData['event-type'] || 'Unknown'
        });
    }
}

// =========================================
// Repertoire Tabs (если еще используется)
// =========================================
function initializeRepertoireTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Add active class to clicked button and corresponding content
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
// Audio Players (если еще используется)
// =========================================
function initializeAudioPlayers() {
    const audioSamples = document.querySelectorAll('.audio-sample');
    
    if (audioSamples.length === 0) return;
    
    // Эта функция может быть устаревшей, так как мы заменили аудио на видео
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
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// =========================================
// Header Scroll Effect - ИСПРАВЛЕННАЯ ВЕРСИЯ
// =========================================
function initializeHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    // Убираем transform из начальных стилей
    header.style.transform = 'none';
    header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Только меняем фон, без скрытия хэдера
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Используем throttle для оптимизации
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
    
    // Initial check
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
            // Show success state
            const button = this.querySelector('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.backgroundColor = '#25D366';
            
            // Reset after 2 seconds
            setTimeout(() => {
                emailInput.value = '';
                button.innerHTML = originalHTML;
                button.style.backgroundColor = '';
            }, 2000);
        } else {
            // Show error state briefly
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

// Initialize some functions with debounce
window.addEventListener('resize', debounce(() => {
    // Recalculate FAQ heights on resize
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
    
    // Ensure FAQ is properly initialized after all content is loaded
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