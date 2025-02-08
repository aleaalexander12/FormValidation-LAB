document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration");
  const loginForm = document.getElementById("login");
  const errorDisplay = document.getElementById("errorDisplay");

  // Helper function to display errors
  function showError(message) {
    errorDisplay.style.display = "block";
    errorDisplay.textContent = message;
  }

  // Registration Form Validation
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    errorDisplay.style.display = "none"; // Hide previous errors

    const username = this.username.value.trim().toLowerCase();
    const email = this.email.value.trim().toLowerCase();
    const password = this.password.value;
    const passwordCheck = this.passwordCheck.value;
    const termsAccepted = this.terms.checked;

    // Username Validation
    if (username.length < 4) {
      return showError("Username must be at least 4 characters long.");
    }
    if (!/^(?!.*[^\w]).{4,}$/.test(username)) {
      return showError("Username cannot contain special characters or spaces.");
    }
    if (new Set(username).size < 2) {
      return showError("Username must contain at least two unique characters.");
    }
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      return showError("That username is already taken.");
    }

    // Email Validation
    if (!email.includes("@") || email.endsWith("@example.com")) {
      return showError("Invalid email or email from 'example.com' is not allowed.");
    }

    // Password Validation
    if (password.length < 12 || 
        !/[A-Z]/.test(password) || 
        !/[a-z]/.test(password) || 
        !/[0-9]/.test(password) || 
        !/[!@#$%^&*]/.test(password) || 
        password.toLowerCase().includes("password") || 
        password.toLowerCase().includes(username)) {
      return showError("Password must meet all security requirements.");
    }

    if (password !== passwordCheck) {
      return showError("Passwords do not match.");
    }

    // Terms and Conditions
    if (!termsAccepted) {
      return showError("You must accept the Terms of Use.");
    }

    // Store user in localStorage
    users[username] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));

    registrationForm.reset();
    alert("Registration successful!");
  });

  // Login Form Validation
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    errorDisplay.style.display = "none";

    const username = this.username.value.trim().toLowerCase();
    const password = this.password.value;

    if (!username) {
      return showError("Username cannot be blank.");
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
      return showError("Username does not exist.");
    }

    if (users[username].password !== password) {
      return showError("Incorrect password.");
    }

    alert("Login successful!");
    loginForm.reset();
  });
});

  