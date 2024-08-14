document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('back-to-top');
    const welcomeSection = document.getElementById('welcome-section');
    const aboutSection = document.getElementById('about-section');
    const protectedSection = document.getElementById('protected-section');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const signoutBtn = document.getElementById('signout-btn');

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

    function resetLayout() {
        welcomeSection.style.display = 'block';
        aboutSection.style.display = 'block';
        protectedSection.style.display = 'none';
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        signoutBtn.style.display = 'none';
        document.body.style.backgroundImage = "url('background1.jpg')";
    }

    function switchToProtectedView() {
        welcomeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        protectedSection.style.display = 'block';
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        signoutBtn.style.display = 'block';
        document.body.style.backgroundImage = "url('protected-background.jpg')";
    }

    window.showLoginForm = function() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('signup-form').style.display = 'none';
    };

    window.showSignUpForm = function() {
        document.getElementById('signup-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    };

    window.login = function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('https://auth.aitdevops.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                alert('Login successful!');
                switchToProtectedView();
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    window.signup = function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        fetch('https://user.aitdevops.com/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert('Signup successful: ' + data.message);
        })
        .catch(error => console.error('Error:', error));
    };

    window.signOut = function() {
        localStorage.removeItem('authToken');
        resetLayout();
        alert('Signed out successfully!');
    };

    window.showBlueprints = function() {
        alert("Blueprints would be shown here.");
    };

    // Check if user is logged in (token exists)
    if (localStorage.getItem('authToken')) {
        switchToProtectedView();
    } else {
        resetLayout();
    }
});
