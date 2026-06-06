document.addEventListener("DOMContentLoaded", () => {
  // 1. ระบบ Scroll Animation
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

  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
  });

  // 2. เอฟเฟกต์พิมพ์ข้อความ
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
      typeSpeed = 2000; 
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // 3. ระบบ Dark/Light Mode
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.documentElement;
  
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    body.setAttribute("data-theme", "light");
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    let theme = body.getAttribute("data-theme");
    if (theme === "dark") {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    }
  });

  // 4. ระบบส่ง Form & Validation & Toast
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");

  function showToast(message, isError = false) {
    toast.textContent = message;
    if (isError) {
      toast.classList.add("error");
    } else {
      toast.classList.remove("error");
    }
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  // ฟังก์ชันเช็ครูปแบบอีเมลเบื้องต้น
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    // --- ส่วน Validation ตรวจสอบข้อมูลก่อนส่ง ---
    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();
    const messageValue = document.getElementById("message").value.trim();

    if (!nameValue || !emailValue || !messageValue) {
      showToast("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง", true);
      return;
    }

    if (!validateEmail(emailValue)) {
      showToast("❌ รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง", true);
      return;
    }
    // ----------------------------------------

    submitBtn.textContent = "กำลังส่งข้อความ...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast("✅ ส่งข้อความสำเร็จ! จะรีบติดต่อกลับไปครับ");
        contactForm.reset(); 
      } else {
        // ดักจับ Error 404 กรณีใส่ URL Formspree ผิด
        if (response.status === 404) {
          showToast("❌ Error 404: ไม่พบปลายทาง Formspree กรุณาเช็ค URL ใน HTML", true);
        } else {
          // แจ้ง Error อื่นๆ จาก Formspree ถ้ามี
          const data = await response.json().catch(() => ({}));
          if (data.errors) {
            showToast(`❌ ${data.errors.map(error => error.message).join(", ")}`, true);
          } else {
            showToast("❌ เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่", true);
          }
        }
      }
    } catch (error) {
      showToast("❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ตรวจสอบอินเทอร์เน็ตของคุณ", true);
    } finally {
      submitBtn.textContent = "ส่งข้อความ";
      submitBtn.disabled = false;
    }
  });

  // 5. ระบบ Scrollspy
  const sections = document.querySelectorAll("section.section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop - 160) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});