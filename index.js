document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration");
    const loginForm = document.getElementById("login");
    const errorDisplay = document.getElementById("errorDisplay");
  
    function showError(message, element) {
      errorDisplay.textContent = message;
      errorDisplay.style.display = "block";
      element.focus();
    }
  
    function hideError() {
      errorDisplay.style.display = "none";
    }
  
    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email) && !email.endsWith("@example.com");
    }
  
    function isValidPassword(password, username) {
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isLongEnough = password.length >= 12;
      const noUsername = !password.toLowerCase().includes(username.toLowerCase());
      const noPasswordWord = !password.toLowerCase().includes("password");
      return hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough && noUsername && noPasswordWord;
    }
  
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      hideError();
      
      const username = registrationForm.username.value.trim();
      const email = registrationForm.email.value.trim().toLowerCase();
      const password = registrationForm.password.value;
      const passwordCheck = registrationForm.passwordCheck.value;
      const termsAccepted = registrationForm.terms.checked;
      
      if (username.length < 4) return showError("Username must be at least 4 characters long.", registrationForm.username);
      if ((new Set(username)).size < 2) return showError("Username must contain at least two unique characters.", registrationForm.username);
      if (/[^a-zA-Z0-9]/.test(username)) return showError("Username cannot contain special characters or spaces.", registrationForm.username);
      if (!isValidEmail(email)) return showError("Invalid email address.", registrationForm.email);
      if (!isValidPassword(password, username)) return showError("Password does not meet security requirements.", registrationForm.password);
      if (password !== passwordCheck) return showError("Passwords do not match.", registrationForm.passwordCheck);
      if (!termsAccepted) return showError("You must accept the terms and conditions.", registrationForm.terms);
      
      let users = JSON.parse(localStorage.getItem("users")) || {};
      if (users[username.toLowerCase()]) return showError("Username is already taken.", registrationForm.username);
      
      users[username.toLowerCase()] = { email, password };
      localStorage.setItem("users", JSON.stringify(users));
      
      registrationForm.reset();
      alert("Registration successful!");
    });
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      hideError();
      
      const username = loginForm.username.value.trim().toLowerCase();
      const password = loginForm.password.value;
      let users = JSON.parse(localStorage.getItem("users")) || {};
      
      if (!username) return showError("Username cannot be blank.", loginForm.username);
      if (!users[username]) return showError("Username not found.", loginForm.username);
      if (!password) return showError("Password cannot be blank.", loginForm.password);
      if (users[username].password !== password) return showError("Incorrect password.", loginForm.password);
      
      loginForm.reset();
      alert("Login successful!" + (loginForm.persist.checked ? " (Remembered)" : ""));
    });
  });
  