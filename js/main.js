// Enhanced Navigation and Animations
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    mobileMenuToggle?.addEventListener('click', () => {
        body.classList.toggle('mobile-menu-open');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    let ticking = false;

    const updateParallax = () => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const rect = el.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
            });
            ticking = true;
        }
    });

    // Enhanced Hover Effects
    const enhanceHoverElements = document.querySelectorAll('[data-hover]');
    
    enhanceHoverElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Cursor Effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let cursorVisible = true;
    let cursorEnlarged = false;

    const toggleCursorVisibility = () => {
        if (cursorVisible) {
            cursor.style.opacity = 1;
            cursorDot.style.opacity = 1;
        } else {
            cursor.style.opacity = 0;
            cursorDot.style.opacity = 0;
        }
    };

    const toggleCursorSize = () => {
        if (cursorEnlarged) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursorVisible = true;
        toggleCursorVisibility();
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        toggleCursorVisibility();
    });

    document.addEventListener('mousedown', () => {
        cursorEnlarged = true;
        toggleCursorSize();
    });

    document.addEventListener('mouseup', () => {
        cursorEnlarged = false;
        toggleCursorSize();
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorEnlarged = true;
            toggleCursorSize();
        });
        
        el.addEventListener('mouseleave', () => {
            cursorEnlarged = false;
            toggleCursorSize();
        });
    });

    // Magnetic Effect for CTAs
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // Smooth Page Transitions
    const transitionLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    
    transitionLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            document.body.classList.add('page-transition');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});

// Dynamic Background Effect
const createDynamicBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'dynamic-background';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const properties = {
        bgColor: 'rgba(17, 17, 19, 1)',
        particleColor: 'rgba(255, 255, 255, 0.5)',
        particleRadius: 3,
        particleCount: 60,
        particleMaxVelocity: 0.5,
        lineLength: 150,
        particleLife: 6
    };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }

        position() {
            this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }

        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }
            this.life--;
        }
    }

    const reDrawBackground = () => {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, width, height);
    };

    const drawLines = () => {
        let x1, y1, x2, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    };

    const reDrawParticles = () => {
        for (let i in particles) {
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    };

    const loop = () => {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    };

    const init = () => {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop();
    };

    init();
};

// Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    mobileMenuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Portfolio Carousel
class PortfolioCarousel {
    constructor() {
        this.carousel = document.querySelector('.portfolio-carousel');
        this.items = [
            {
                title: 'Premium Party Distribution',
                image: 'assets/images/portfolio/ppd.jpg',
                description: 'E-commerce website with custom inventory management',
                link: 'https://premiumpartydistribution.com'
            },
            {
                title: 'Brands N People',
                image: 'assets/images/portfolio/bnp.jpg',
                description: 'Brand management platform with social integration',
                link: 'https://brandsnpeople.com'
            },
            {
                title: 'Fly Barber Shop',
                image: 'assets/images/portfolio/fly.jpg',
                description: 'Modern booking system with real-time availability',
                link: 'https://flybarbershop.com'
            },
            {
                title: 'FM Junk-It',
                image: 'assets/images/portfolio/fmjunkit.jpg',
                description: 'Service booking platform with location-based pricing',
                link: 'https://fmjunk-it.com'
            }
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.carousel) return;
        
        this.render();
        this.startAutoPlay();
        this.addControls();
    }

    render() {
        this.carousel.innerHTML = this.items.map((item, index) => `
            <div class="portfolio-item ${index === this.currentIndex ? 'active' : ''}"
                 style="background-image: url(${item.image})">
                <div class="portfolio-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" target="_blank" class="portfolio-link">View Project</a>
                </div>
            </div>
        `).join('');
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.render();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.render();
    }

    startAutoPlay() {
        setInterval(() => this.next(), 5000);
    }

    addControls() {
        const controls = document.createElement('div');
        controls.className = 'portfolio-controls';
        controls.innerHTML = `
            <button class="prev">←</button>
            <button class="next">→</button>
        `;
        
        this.carousel.appendChild(controls);
        
        controls.querySelector('.prev').addEventListener('click', () => this.prev());
        controls.querySelector('.next').addEventListener('click', () => this.next());
    }
}

// Initialize Portfolio Carousel
new PortfolioCarousel();

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

createDynamicBackground();
