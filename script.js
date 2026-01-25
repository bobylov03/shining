// =========================================
// DOM Ready Function
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeRepertoireTabs();
    initializeAudioPlayers();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeHeaderScrollEffect();
    initializeCurrentYear();
    initializeFormSubmission();
    initializeTestimonialSlider();
    initializeFAQAccordion();
    initializeStatsCounter();
    initializeBackToTop();
    initializeWhatsAppButton();
    initializeScrollAnimations();
    initializeVideoLazyLoading();
    initializePrivacyPolicyModal();
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
    mobileMenuBtn.addEventListener('click', function() {
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
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
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
        dots[index].classList.add('active');
        
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
    
    // Initialize first slide
    showSlide(0);
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Event listeners for buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// =========================================
// FAQ Accordion
// =========================================
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const answer = otherItem.querySelector('.faq-answer');
                    answer.style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
}

// =========================================
// Back to Top Button
// =========================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================================
// WhatsApp Button Enhancement
// =========================================
function initializeWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-contact');
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    const phoneNumber = "+14371234567"; // Real phone number
    const defaultMessage = "Hello Anna! I'm interested in booking a violin performance for my event. Could you please provide more information?";
    
    function openWhatsApp(message = defaultMessage) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }
    
    // Regular WhatsApp button
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    }
    
    // Floating WhatsApp button
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
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
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src.includes('autoplay=1')) {
                    // Add autoplay parameter
                    const src = iframe.src;
                    iframe.src = src.includes('?') ? 
                        src + '&autoplay=1&mute=1' : 
                        src + '?autoplay=1&mute=1';
                }
                observer.unobserve(entry.target);
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
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPrivacyPolicyModal();
        });
    });
}

function showPrivacyPolicyModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        ">×</button>
        
        <h2 style="color: #0a1a3a; margin-bottom: 20px;">Privacy Policy</h2>
        
        <div style="color: #444; line-height: 1.6;">
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
            
            <p style="margin-top: 30px; font-style: italic;">
                By submitting the contact form, you agree to the terms of this Privacy Policy.
            </p>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEscape);
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
// Form Validation (Updated for new fields)
// =========================================
function initializeFormValidation() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    
    // New fields validation
    const guestsInput = document.getElementById('guests');
    if (guestsInput) {
        guestsInput.addEventListener('input', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    }
    
    // Privacy checkbox validation
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', function() {
            clearError(this);
        });
    }
    
    // Enhanced email validation
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
}

// =========================================
// Form Submission (Enhanced)
// =========================================
function initializeFormSubmission() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
                // Scroll to first error
                if (isValid === false) {
                    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    field.focus();
                }
            }
        });
        
        // Special validation for privacy checkbox
        const privacyCheckbox = document.getElementById('privacy');
        if (privacyCheckbox && !privacyCheckbox.checked) {
            showError(privacyCheckbox, 'You must agree to the Privacy Policy');
            isValid = false;
            privacyCheckbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        if (!isValid) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // In a real implementation, use fetch() to send data to server
            // For now, simulate API call
            await simulateFormSubmission(formObject);
            
            // Show success message
            showFormMessage('Thank you for your inquiry, ' + formObject.name + '! Anna will contact you within 24 hours with a personalized quote.', 'success');
            
            // Reset form
            form.reset();
            
            // Send data to Google Analytics (if implemented)
            trackFormSubmission(formObject);
            
        } catch (error) {
            showFormMessage('There was an error submitting your request. Please try again or contact us directly via WhatsApp.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// =========================================
// Form Helper Functions
// =========================================
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Specific validation for date fields
    if (field.type === 'date') {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError(field, 'Please select a future date');
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
    errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 8px;
        padding: 5px 10px;
        background-color: #fdf2f2;
        border-radius: 4px;
        border-left: 3px solid #e74c3c;
    `;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#e74c3c';
    field.style.backgroundColor = '#fdf2f2';
}

function clearError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '#ddd';
    field.style.backgroundColor = '#f8f9fa';
}

async function simulateFormSubmission(formData) {
    // Simulate API delay
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
    messageElement.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 20px;
        border-radius: 8px;
        margin: 25px 0;
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 500;
        animation: slideIn 0.5s ease;
    `;
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.border = '1px solid #c3e6cb';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.border = '1px solid #f5c6cb';
    }
    
    // Insert after form
    const form = document.getElementById('quote-form');
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
}

// =========================================
// Analytics Tracking (Optional)
// =========================================
function trackFormSubmission(formData) {
    // Google Analytics event tracking (if GA is installed)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': formData['event-type'],
            'value': 1
        });
    }
    
    // Facebook Pixel (if installed)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: 'Violin Performance',
            content_name: formData['event-type']
        });
    }
}

// =========================================
// Existing Functions (Updated as needed)
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

// ... остальные существующие функции остаются без изменений ...

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
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize YouTube video lazy loading when they enter viewport
function initializeYouTubeLazyLoad() {
    const videos = document.querySelectorAll('.video-container iframe');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                // Add loading parameter for better performance
                iframe.setAttribute('loading', 'lazy');
                observer.unobserve(iframe);
            }
        });
    }, { threshold: 0.1 });
    
    videos.forEach(video => observer.observe(video));
}

// Newsletter Form Handling
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email && email.includes('@')) {
            // In real implementation, send to email service
            this.querySelector('input[type="email"]').value = '';
            alert('Thank you for subscribing!');
        }
    });
}

// Performance optimization: Debounce scroll events
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

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply debounce to scroll-intensive functions
    window.addEventListener('scroll', debounce(initializeHeaderScrollEffect));
    window.addEventListener('scroll', debounce(initializeScrollAnimations));
});