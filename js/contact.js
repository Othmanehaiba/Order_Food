const qst = document.querySelectorAll(".qst-js");

qst.forEach((f) => {
  f.addEventListener('click', () => {
    const ans = f.nextElementSibling;
    ans.style.display = 'block';
  });
  f.addEventListener('mouseout', () => {
    const ans = f.nextElementSibling;
    ans.style.display = 'none';
  });

});




const contactForm = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder="Your Name"]');
    const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
    const emailInput = document.querySelector('input[placeholder="Your email"]');
    const messageInput = document.querySelector('textarea[placeholder="Write a message ...."]');

      const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    
    const phoneRegex = /^\+?[0-9\s-()]{7,20}$/;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      let errors = []; 

      if (!nameRegex.test(name)) {
        errors.push("Please enter a valid name (at least 2 letters).");
      }

      if (!phoneRegex.test(phone)) {
        errors.push("Please enter a valid phone number.");
      }

      if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
      }
      if (message === '') {
        errors.push("Please write a message.");
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
      } else {
        alert("Message sent successfully!");
        
        contactForm.reset();
      }
    });
