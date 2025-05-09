document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle logic
  const toggleBtn = document.querySelector('.theme-toggle');
  const icon = toggleBtn?.querySelector('i'); // optional chaining in case button is missing
  const body = document.body;

  if (toggleBtn && icon) {
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      icon.classList.remove('bi-sun');
      icon.classList.add('bi-moon');
    }

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-theme');

      const isDark = body.classList.contains('dark-theme');
      icon.classList.toggle('bi-sun', !isDark);
      icon.classList.toggle('bi-moon', isDark);

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Contact form logic (only if on contact page)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs
        .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
        .then(
          function () {
            alert("Message sent successfully!");
            form.reset();
          },
          function (error) {
            console.error("FAILED...", error);
            alert("Oops! Something went wrong.");
          }
        );
    });
  }

  // Skills section animation logic
  const cells = document.querySelectorAll(".cell");
  if (cells.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    cells.forEach((cell) => observer.observe(cell));
  }
});
