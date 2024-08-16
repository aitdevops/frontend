document.addEventListener('DOMContentLoaded', function() {
    // Waits for the document to be fully loaded before executing the script

    const sections = document.querySelectorAll('section');
    // Selects all section elements in the document

    const backToTopButton = document.getElementById('back-to-top');
    // Selects the back-to-top button element by its ID

    document.body.style.backgroundImage = `url('${sections[0].dataset.bg}')`;
    // Sets the initial background image of the body to the first section's data-bg attribute

    window.addEventListener('scroll', function() {
        // Adds an event listener for the scroll event

        const scrollPosition = window.scrollY;
        // Gets the current vertical scroll position

        sections.forEach((section, index) => {
            const offset = section.offsetTop;
            // Gets the top offset position of each section

            if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + section.offsetHeight) {
                document.body.style.backgroundImage = `url('${section.dataset.bg}')`;
                // Changes the background image based on the current scroll position and section in view
            }
        });

        if (scrollPosition > 300) {
            backToTopButton.style.display = 'block';
            // Shows the back-to-top button if scrolled more than 300px
        } else {
            backToTopButton.style.display = 'none';
            // Hides the back-to-top button if scrolled less than 300px
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Scrolls the page smoothly back to the top when the button is clicked
    });

    // Check if there is a token in localStorage on page load
    const token = localStorage.getItem('authToken');
    if (token) {
        // Automatically log in the user if the token exists
        loginWithToken(token);
    }
});

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    // Displays the login form

    document.getElementById('signup-form').style.display = 'none';
    // Hides the signup form
}

function showSignUpForm() {
    document.getElementById('signup-form').style.display = 'block';
    // Displays the signup form

    document.getElementById('login-form').style.display = 'none';
    // Hides the login form
}

function login(event) {
    event.preventDefault();
    // Prevents the default form submission behavior

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    // Retrieves the values from the login form input fields

    fetch('https://auth.aitdevops.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, rememberMe })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            if (rememberMe) {
                localStorage.setItem('authToken', data.token);
            }
            // Stores the authentication token in the browser's local storage if "Remember Me" is checked

            alert('Login successful!');
            // Displays a success alert

            document.getElementById('login-form').style.display = 'none';
            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('signup-btn').style.display = 'none';
            document.getElementById('signout-btn').style.display = 'block';
            // Updates the display of buttons and forms after successful login

            document.getElementById('welcome-section').style.display = 'none';
            document.getElementById('about-section').style.display = 'none';
            document.getElementById('protected-section').style.display = 'block';
            // Displays the protected section after login and hides other sections

            document.body.style.backgroundImage = "url('protected-background.jpg')";
            // Changes the background image to the protected section's image
        } else {
            alert('Login failed: ' + data.message);
            // Displays an alert if login fails
        }
    })
    .catch(error => console.error('Error:', error));
    // Logs any errors that occur during the login process
}

function loginWithToken(token) {
    // Function to handle automatic login with a stored token
    fetch('https://auth.aitdevops.com/validate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            alert('Welcome back!');
            // Displays a welcome back message

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
            signOut();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        signOut();
    });
}

function signup(event) {
    event.preventDefault();
    // Prevents the default form submission behavior

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    // Retrieves the values from the signup form input fields

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
        // Displays a success alert with the server's response message
    })
    .catch(error => console.error('Error:', error));
    // Logs any errors that occur during the signup process
}

function signOut() {
    localStorage.removeItem('authToken');
    // Removes the authentication token from local storage

    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('about-section').style.display = 'block';
    document.getElementById('protected-section').style.display = 'none';
    // Resets the visibility of sections after signing out

    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('signup-btn').style.display = 'block';
    document.getElementById('signout-btn').style.display = 'none';
    // Resets the visibility of buttons after signing out

    document.body.style.backgroundImage = "url('background1.jpg')";
    // Resets the background image to the initial one

    alert('Signed out successfully!');
    // Displays a success alert after signing out
}

function showBlueprints() {
    window.location.href = "/architecture.html";
    // Redirects the user to the architecture.html page to show blueprints
}
