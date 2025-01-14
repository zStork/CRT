// Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    validateField.call(input);
                }
            });
        });
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    const isValid = validateForm(form);
    if (!isValid) return;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Send notification emails
        await Promise.all([
            // Send admin notification
            fetch('/api/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'admin@getcrtdigital.com',
                    subject: 'New Contact Form Submission',
                    template: 'admin-notification',
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone || 'Not provided',
                        message: data.message,
                        submittedAt: new Date().toISOString()
                    }
                })
            }),
            // Send user confirmation
            fetch('/api/send-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: data.email,
                    name: data.name,
                    subject: 'Thank you for contacting CRT Digital',
                    template: 'contact-confirmation'
                })
            })
        ]);
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again later.', 'error');
        
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField.call(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField() {
    const field = this;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Required field validation
    if (field.required && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation (optional field)
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field styling
    field.classList.toggle('invalid', !isValid);
    
    // Show error message if invalid
    if (!isValid) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    }
    
    return isValid;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
