// ========================================
// SHOPA Landing Page - JavaScript
// Conversion-Focused with RTL Support
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initPhoneAnimation();
    initCounterAnimation();
    initFAQ();
    initPricingToggle();
    initFloatingCTA();
    initCountdown();
    initResultsCounter();
    initCaptureCounter();
});

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const announcementBar = document.querySelector('.announcement-bar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide announcement bar on scroll
        if (announcementBar) {
            if (currentScroll > 100) {
                announcementBar.style.transform = 'translateY(-100%)';
                navbar.style.top = '0';
            } else {
                announcementBar.style.transform = 'translateY(0)';
                navbar.style.top = '44px';
            }
        }
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = [
        '.section-header',
        '.feature-card',
        '.pricing-card',
        '.game-card',
        '.testimonial-card',
        '.problem-card',
        '.step-item',
        '.comparison-column',
        '.faq-item'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            el.classList.add('aos-init');
            observer.observe(el);
        });
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .aos-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .aos-init.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ========================================
// Phone Animation (Comment Flow)
// ========================================
function initPhoneAnimation() {
    const commentFlow = document.querySelector('.comment-flow');
    if (!commentFlow) return;

    const comments = [
        { user: '@سارة_شوب', text: '0612345678' },
        { user: '@أحمد_لايف', text: 'أريد الطلب!' },
        { user: '@منى_تسوق', text: '0698765432' },
        { user: '', text: 'تم التقاط الرقم!', captured: true },
        { user: '@كريم_شوب', text: 'بكم السعر؟' },
        { user: '@فاطمة_لايف', text: '0755443322' },
        { user: '', text: 'تم التقاط الرقم!', captured: true },
        { user: '@ياسين_تسوق', text: 'أريد 2!' },
        { user: '@ليلى_شوب', text: '0611223344' },
        { user: '', text: 'تم التقاط الرقم!', captured: true }
    ];

    let index = 0;

    function addComment() {
        const comment = comments[index % comments.length];
        const div = document.createElement('div');
        div.className = comment.captured ? 'comment captured' : 'comment';

        if (comment.captured) {
            div.innerHTML = `<i class="fas fa-check-circle"></i> ${comment.text}`;
        } else {
            div.innerHTML = `<span class="user">${comment.user}</span> ${comment.text}`;
        }

        if (commentFlow.children.length >= 4) {
            const oldComment = commentFlow.firstElementChild;
            oldComment.style.opacity = '0';
            oldComment.style.transform = 'translateX(20px)';
            setTimeout(() => {
                if (oldComment.parentNode) {
                    oldComment.remove();
                }
            }, 300);
        }

        commentFlow.appendChild(div);
        index++;
    }

    setInterval(addComment, 2500);
}

// ========================================
// Capture Counter Animation
// ========================================
function initCaptureCounter() {
    const counterNumber = document.querySelector('.counter-number');
    if (!counterNumber) return;

    let count = 0;
    const target = parseInt(counterNumber.dataset.target) || 47;

    function incrementCounter() {
        if (count < target) {
            count++;
            counterNumber.textContent = count;
        }
    }

    // Increment every time a "captured" comment appears
    setInterval(() => {
        if (count < target) {
            incrementCounter();
        }
    }, 3000);

    // Initial animation
    const animateCounter = () => {
        const duration = 2000;
        const steps = 30;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counterNumber.textContent = target;
                clearInterval(timer);
            } else {
                counterNumber.textContent = Math.floor(current);
            }
        }, duration / steps);
    };

    // Animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterNumber);
}

// ========================================
// Counter Animation for Stats
// ========================================
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function animateCounters() {
        stats.forEach(stat => {
            const text = stat.textContent;
            if (!isNaN(parseInt(text))) {
                const target = parseInt(text);
                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = text;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, stepTime);
            }
        });
    }
}

// ========================================
// Results Counter Animation
// ========================================
function initResultsCounter() {
    const resultNumbers = document.querySelectorAll('.result-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateNumber(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    resultNumbers.forEach(num => observer.observe(num));

    function animateNumber(el, target) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                el.textContent = formatNumber(Math.floor(current));
            }
        }, duration / steps);
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
}

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// Pricing Toggle (Monthly/Yearly)
// ========================================
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const amounts = document.querySelectorAll('.pricing-price .amount');

    if (toggle) {
        toggle.addEventListener('change', () => {
            const isYearly = toggle.checked;

            // Update labels
            toggleLabels.forEach((label, index) => {
                label.classList.toggle('active', index === (isYearly ? 1 : 0));
            });

            // Update prices
            amounts.forEach(amount => {
                const monthly = amount.dataset.monthly;
                const yearly = amount.dataset.yearly;
                amount.textContent = isYearly ? yearly : monthly;
            });
        });
    }
}

// ========================================
// Floating CTA
// ========================================
function initFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.querySelector('.hero');

    if (floatingCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY > heroBottom - 200) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }
}

// ========================================
// Countdown Timer
// ========================================
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Set countdown to end of day
    let hours = 23;
    let minutes = 59;
    let seconds = 59;

    function updateCountdown() {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }

        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');

        countdownEl.textContent = `${h}:${m}:${s}`;
    }

    setInterval(updateCountdown, 1000);
}

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const announcementHeight = document.querySelector('.announcement-bar')?.offsetHeight || 0;
            const offset = navHeight + (window.scrollY < 100 ? announcementHeight : 0);
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Racing Bar Animation
// ========================================
function initRacingBar() {
    const raceBars = document.querySelectorAll('.race-bar');

    setInterval(() => {
        raceBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            const change = Math.random() * 10 - 3;
            let newWidth = currentWidth + change;
            newWidth = Math.max(30, Math.min(100, newWidth));
            bar.style.width = newWidth + '%';
        });
    }, 2000);
}

initRacingBar();

// ========================================
// Jackpot Slot Animation
// ========================================
function initJackpotSlots() {
    const slots = document.querySelectorAll('.jackpot-slot span');
    const chars = ['@', '؟', '!', '*', '#', '★', '♦', '♠'];
    const userChars = ['م', 'ح', 'ظ', 'و', 'ظ'];

    let isSpinning = false;

    function spin() {
        if (isSpinning) return;
        isSpinning = true;

        let spins = 0;
        const maxSpins = 20;

        const interval = setInterval(() => {
            slots.forEach((slot, i) => {
                if (i === 0) {
                    slot.textContent = '@';
                } else {
                    slot.textContent = chars[Math.floor(Math.random() * chars.length)];
                }
            });

            spins++;
            if (spins >= maxSpins) {
                clearInterval(interval);
                slots.forEach((slot, i) => {
                    if (i === 0) {
                        slot.textContent = '@';
                    } else {
                        slot.textContent = userChars[i] || '؟';
                    }
                });
                isSpinning = false;
            }
        }, 100);
    }

    setInterval(spin, 5000);
    setTimeout(spin, 2000);
}

initJackpotSlots();

// ========================================
// Parallax Blobs
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Pricing Card Hover Effect
// ========================================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        pricingCards.forEach(c => {
            if (c !== this && !c.classList.contains('featured')) {
                c.style.opacity = '0.6';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ========================================
// Console Message
// ========================================
console.log('%c🛍️ SHOPA - منصة التجارة المباشرة', 'font-size: 24px; font-weight: bold; color: #ec4899;');
console.log('%cزوروا shopa.ovh لمعرفة المزيد!', 'font-size: 14px; color: #06b6d4;');
console.log('%c⚡ Built for conversions', 'font-size: 12px; color: #10b981;');
