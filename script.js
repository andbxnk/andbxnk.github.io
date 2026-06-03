document.addEventListener("DOMContentLoaded", () => {
  // ระบบ Scroll Animation (Fade-in เมื่อสกรอลล์หน้าจอ)
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const appearanceOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearanceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, appearanceOptions);

  animatedElements.forEach((element) => {
    appearanceObserver.observe(element);
  });

  // เอฟเฟกต์การหน่วงเวลาการ์ดสกิลให้โหลดทีละอัน (Stagger Effect)
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
  });
});


// เอฟเฟกต์พิมพ์ข้อความ (Typewriter Effect) สำหรับตำแหน่งงานที่แสดงในหน้าแรก
const heroTitle = document.querySelector(".hero-title");
const roles = ["Student Developer", "Mobile App Developer", "IT Technician"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    heroTitle.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    heroTitle.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // หน่วงเวลาก่อนเริ่มลบ
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, typeSpeed);
}

// เริ่มทำงานเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
