document.addEventListener('DOMContentLoaded', () => {
    
    // ระบบ Scroll Animation (Fade-in เมื่อสกรอลล์หน้าจอ)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const appearanceOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearanceOptions);

    animatedElements.forEach(element => {
        appearanceObserver.observe(element);
    });

    // เอฟเฟกต์การหน่วงเวลาการ์ดสกิลให้โหลดทีละอัน (Stagger Effect)
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
    });
});