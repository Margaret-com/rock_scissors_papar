const form = document.querySelector('.form')
const loginName = document.getElementById('name')
const loginPass = document.getElementById('password')
const loginUsername = document.getElementById('username')
const loginEmail = document.getElementById('email')
const loginRepeatPass = document.getElementById('repeat-password')
const loginButton = document.querySelector('.submitButton')
const loginRemember = document.getElementById('remember')
const error_message = document.getElementById('error-message')

// Handle Signup
if (window.location.pathname.includes("signUp.html")) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeat-password').value;

        // Validation
        if (password.length < 8) {
            error_message.innerText = "Password must be at least 8 characters long.";
            return;
        }

        if (password !== repeatPassword) {
            error_message.innerText = "Passwords do not match.";
            return;
        }

        // Store user data in localStorage
        const user = {
            name,
            username,
            email,
            password,
        };

        localStorage.setItem('user', JSON.stringify(user));

        alert("Signup successful! Redirecting to login...");
        window.location.href = "login.html";
    });
}

// Handle Login
if (window.location.pathname.includes("login.html")) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            error_message.innerText = "No user found. Please sign up first.";
            return;
        }

        if (user.username !== username || user.password !== password) {
            error_message.innerText = "Invalid username or password.";
            return;
        }

        alert("Login successful! Redirecting...");
        window.location.href = "index.html";
    });
}


