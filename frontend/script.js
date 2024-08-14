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
    event.preventDefault();

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
            localStorage.setItem('authToken', data.token);
            alert('Login successful!');
            document.getElementById('welcome-section').style.display = 'none';
            document.getElementById('protected-section').style.display = 'block';
            document.body.style.backgroundImage = "url('protected-background.jpg')";
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function signup(event) {
    event.preventDefault();

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

function signOut() {
    localStorage.removeItem('authToken');
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('protected-section').style.display = 'none';
    document.body.style.backgroundImage = "url('background1.jpg')";
    alert('Signed out successfully!');
}

function showBlueprints() {
    // Logic to display blueprints goes here
}
