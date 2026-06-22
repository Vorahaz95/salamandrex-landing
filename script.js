document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scroll to form
    const scrollLinks = document.querySelectorAll('.scroll-to-form');
    const formSection = document.getElementById('order-form');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            formSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Sticky button logic
    const stickyBtnWrapper = document.querySelector('.sticky-btn-wrapper');
    const firstScreen = document.querySelector('.first-screen-end');
    
    if (stickyBtnWrapper && firstScreen && formSection) {
        window.addEventListener('scroll', () => {
            // Show only if not desktop
            if (window.innerWidth >= 1025) {
                stickyBtnWrapper.classList.remove('visible');
                return;
            }

            const scrollY = window.scrollY;
            const firstScreenEnd = firstScreen.offsetTop;
            const formTop = formSection.offsetTop;
            const windowHeight = window.innerHeight;

            // Show after passing first screen, hide when reaching form
            if (scrollY > firstScreenEnd && (scrollY + windowHeight) < formTop + 100) {
                stickyBtnWrapper.classList.add('visible');
            } else {
                stickyBtnWrapper.classList.remove('visible');
            }
        });
    }

    // Form Validation and Submission
    const orderFormElement = document.querySelector('#main-form');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');

    if (orderFormElement) {
        orderFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const phoneVal = phoneInput.value.replace(/\D/g, '');

            if (phoneVal.length < 10) {
                isValid = false;
                phoneInput.classList.add('error');
                phoneError.style.display = 'block';
            } else {
                phoneInput.classList.remove('error');
                phoneError.style.display = 'none';
            }

            if (isValid) {
                // In a real scenario, we would send data via fetch/ajax here.
                // For now, redirect to thanks page.
                window.location.href = 'thanks.html';
            }
        });

        // Simple input mask for phone
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[2]) {
                e.target.value = x[1] === '7' || x[1] === '8' ? '+7' : (x[1] ? '+7 (' + x[1] : '');
                return;
            }
            e.target.value = !x[3] ? '+7 (' + x[2] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }
});
