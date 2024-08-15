document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('back-to-top');

    document.body.style.backgroundImage = `url('${sections[0].dataset.bg}')`;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const offset = section.offsetTop;
            if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + section.offsetHeight) {
                document.body.style.backgroundImage = `url('${section.dataset.bg}')`;
            }
        });

        if (scrollPosition > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

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

            document.getElementById('login-form').style.display = 'none';
            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('signup-btn').style.display = 'none';
            document.getElementById('signout-btn').style.display = 'block';

            document.getElementById('welcome-section').style.display = 'none';
            document.getElementById('about-section').style.display = 'none';
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
    document.getElementById('about-section').style.display = 'block';
    document.getElementById('protected-section').style.display = 'none';

    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('signup-btn').style.display = 'block';
    document.getElementById('signout-btn').style.display = 'none';

    document.body.style.backgroundImage = "url('background1.jpg')";
    alert('Signed out successfully!');
}

function showBlueprints() {
    // Redirect to the local aitdevops.html file
    window.location.href = "/aitdevops.html";  // Ensure this path is correct based on your server setup
}
