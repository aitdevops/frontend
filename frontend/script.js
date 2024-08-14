document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('back-to-top');

    // Apply initial background image
    document.body.style.backgroundImage = `url('${sections[0].dataset.bg}')`;

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const offset = section.offsetTop;
            if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + section.offsetHeight) {
                document.body.style.backgroundImage = `url('${section.dataset.bg}')`;
            }
        });

        // Show/hide back-to-top button
        if (scrollPosition > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Check if the user is already logged in
    if (localStorage.getItem('authToken')) {
        showBlueprintsPage();
    }
});

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignUpForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function login(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('https://auth.aitdevops.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Store the token for subsequent requests
            localStorage.setItem('authToken', data.token);
            alert('Login successful!');
            showBlueprintsPage();
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function signup(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch('https://user.aitdevops.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        alert('Signup successful: ' + data.message);
    })
    .catch(error => console.error('Error:', error));
}

function showBlueprintsPage() {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('blueprints-section').style.display = 'block';

    // Update background image to blueprint background
    document.body.style.backgroundImage = "url('images/blueprints-background.jpg')";

    // Show logout button
    document.getElementById('logout-button').style.display = 'block';

    // Hide login and sign-up buttons
    document.querySelector('.auth-buttons button[onclick="showLoginForm()"]').style.display = 'none';
    document.querySelector('.auth-buttons button[onclick="showSignUpForm()"]').style.display = 'none';
}

function logout() {
    localStorage.removeItem('authToken');
    alert('Logged out successfully!');
    location.reload(); // Reload the page to reset the view
}
