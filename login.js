// Funktion för att kontrollera inloggningsuppgifter och spara användarinformation i localStorage
function login(username, password) {
    const user = users.find(user => user.name === username && user.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        // Anropa displayWelcomeMessage för att visa välkomstmeddelandet
        displayWelcomeMessage();
        return true;
    }
    return false;
}

// Funktion för att logga ut användaren
function logout() {
    localStorage.removeItem('loggedInUser');
    // Uppdatera knappens text till "Logga in"
    document.querySelectorAll('.login-btn').forEach(button => {
        button.textContent = 'Log in';
    });
    // Ta bort välkomstmeddelandet från DOM:en
    document.querySelectorAll('.welcome-message').forEach(message => {
        message.remove();
    });
}

// Lyssna på klickhändelser för att visa login-boxen och hantera inloggning/utloggning
document.querySelectorAll('.login-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
        // Om ingen användare är inloggad, visa inloggningsrutan och hantera inloggning
        if (!loggedInUser) {
            loadLoginBox();
        } else {
            // Om användaren är inloggad, logga ut användaren
            logout();
        }
    });
});

// Ladda in login-boxen dynamiskt
function loadLoginBox() {
    fetch('login.html')
    .then(response => response.text())
    .then(data => {
        const loginBoxContainer = document.createElement('div');
        loginBoxContainer.innerHTML = data;
        document.body.appendChild(loginBoxContainer);

        // Lägg till händelselyssnare för att dölja login-boxen när användaren klickar utanför den
        document.addEventListener('click', function(event) {
            const loginBox = document.querySelector('.login-box');
            if (loginBox && !loginBox.contains(event.target) && event.target !== document.querySelector('.login-btn')) {
                loginBox.remove();
            }
        });

        // Lägg till händelselyssnare för att skicka inloggningsuppgifterna
        const loginForm = document.querySelector('.login-form');
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const isLoggedIn = login(username, password);
            if (isLoggedIn) {
                displayWelcomeMessage();
                document.querySelectorAll('.login-btn').forEach(button => {
                    button.textContent = 'Log out';
                });
            } else {
                console.log('Fel användarnamn eller lösenord. Försök igen.');
            }
        });
    });
}