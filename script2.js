// ========================================
// SHOPA Landing Page - Interactive Script
// With Parallax & Animations
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Cursor Follower
    // ========================================
    const cursor = document.querySelector('.cursor-follower');

    if (cursor && window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 15 + 'px';
            cursor.style.top = e.clientY - 15 + 'px';
        });

        // Add hover effect to magnetic elements
        document.querySelectorAll('.magnetic, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Parallax Effect
    // ========================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax);

    // ========================================
    // Scroll Animations
    // ========================================
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // ========================================
    // Counter Animation
    // ========================================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                const suffix = counter.dataset.suffix || '';
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = target * easeOutQuart;

                    // Format number
                    if (target >= 1000000) {
                        counter.textContent = (current / 1000000).toFixed(1) + 'M+' + suffix;
                    } else if (target >= 1000) {
                        counter.textContent = Math.floor(current).toLocaleString() + '+' + suffix;
                    } else if (target < 100) {
                        counter.textContent = current.toFixed(1) + suffix;
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========================================
    // Timeline Progress Animation
    // ========================================
    const timelineProgress = document.querySelector('.timeline-progress');

    if (timelineProgress) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        timelineProgress.classList.add('active');
                    }, 500);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineObserver.observe(timelineProgress.parentElement);
    }

    // ========================================
    // Pricing Toggle
    // ========================================
    const billingToggle = document.getElementById('billing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');

    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isYearly = this.checked;

            priceAmounts.forEach(price => {
                const monthly = price.dataset.monthly;
                const yearly = price.dataset.yearly;

                price.style.transform = 'scale(0.8)';
                price.style.opacity = '0';

                setTimeout(() => {
                    price.textContent = isYearly ? yearly : monthly;
                    price.style.transform = 'scale(1)';
                    price.style.opacity = '1';
                }, 200);
            });
        });
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Testimonials Slider (Simple)
    // ========================================
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    function updateSliderDots() {
        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSliderDots();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + sliderDots.length) % sliderDots.length;
            updateSliderDots();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % sliderDots.length;
            updateSliderDots();
        });
    }

    // ========================================
    // Magnetic Button Effect
    // ========================================
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // Phone Screen Animation
    // ========================================
    const phoneScreen = document.querySelector('.phone-screen');

    if (phoneScreen) {
        // Simulate new comments appearing
        setInterval(() => {
            const comments = phoneScreen.querySelectorAll('.comment-item');
            comments.forEach((comment, index) => {
                comment.style.animation = 'none';
                comment.offsetHeight; // Trigger reflow
                comment.style.animation = `slideIn 0.5s ease ${index * 0.1}s forwards`;
            });
        }, 5000);
    }

    // ========================================
    // Number Animation in Hero
    // ========================================
    const heroCounter = document.querySelector('.counter-number');

    if (heroCounter) {
        let count = 0;
        const target = parseInt(heroCounter.dataset.count) || 47;

        function animateHeroCounter() {
            if (count < target) {
                count++;
                heroCounter.textContent = count;
                setTimeout(animateHeroCounter, 50);
            }
        }

        // Start after a delay
        setTimeout(animateHeroCounter, 1000);
    }

    // ========================================
    // Feature Screen Numbers Animation
    // ========================================
    const numberRows = document.querySelectorAll('.numbers-animation .number-row');

    if (numberRows.length > 0) {
        setInterval(() => {
            numberRows.forEach((row, index) => {
                row.style.animation = 'none';
                row.offsetHeight;
                row.style.animation = `slideInNumber 0.5s ease ${index * 0.15}s forwards`;
            });
        }, 4000);
    }

    // ========================================
    // Video Play Button (Placeholder)
    // ========================================
    const playBtn = document.querySelector('.play-btn');

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            // Here you would open a video modal or start video playback
            alert('سيتم إضافة الفيديو قريباً');
        });
    }

    // ========================================
    // Add scroll-triggered animations
    // ========================================
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');

    if (heroScrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                heroScrollIndicator.style.opacity = '0';
            } else {
                heroScrollIndicator.style.opacity = '1';
            }
        });
    }

    // ========================================
    // Floating Cards Mouse Follow
    // ========================================
    const floatingCards = document.querySelectorAll('.floating-card');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingCards.forEach(card => {
            const speed = parseFloat(card.dataset.parallax) || 0.05;
            const x = (mouseX - 0.5) * 30 * speed;
            const y = (mouseY - 0.5) * 30 * speed;

            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

});
