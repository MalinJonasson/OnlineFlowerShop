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
// Lyssna på ändringar i localStorage för att synkronisera inloggningsstatus mellan flikar
window.addEventListener('storage', (e) => {
    if (e.key === 'loggedInUser') {
        updateLoginButtonText();
        displayWelcomeMessage(); // Uppdatera välkomstmeddelandet
    }
});

// Funktion för att uppdatera knapptexten baserat på inloggningsstatus
function updateLoginButtonText() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    document.querySelectorAll('.login-btn').forEach(button => {
        button.textContent = loggedInUser ? 'Log out' : 'Log in';
    });
}

// Uppdatera knapptexten när sidan laddas
document.addEventListener('DOMContentLoaded', updateLoginButtonText);
// Funktion för att visa välkomstmeddelandet om en användare är inloggad

// Funktion för att visa välkomstmeddelandet om en användare är inloggad
function displayWelcomeMessage() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const welcomeMessageContainer = document.querySelectorAll('#welcome-message-container');
    
    document.querySelectorAll('.welcome-message').forEach(message => {
        message.remove();
    });
    // Kontrollera om det finns en inloggad användare
    if (loggedInUser) {
        welcomeMessageContainer.forEach(container => {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.textContent = `Hej, ${loggedInUser.name}!`;
            welcomeMessage.classList.add('welcome-message');
            container.appendChild(welcomeMessage);
        });
    }
}

// Uppdatera välkomstmeddelandet när sidan laddas
document.addEventListener('DOMContentLoaded', displayWelcomeMessage);

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

// Ladda in välkomstmeddelandet när sidan laddas
displayWelcomeMessage();

 
function toggleMenu() {
    var menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('show');
  }
//    // Hantera klickhändelser för köp-knappar
//    document.querySelectorAll('.buy-btn').forEach(button => {
//     button.addEventListener('click', function() {
//         const flowerDiv = this.parentElement;
//         const flowerName = flowerDiv.dataset.name;
//         const flower = flowers.find(f => f.name === flowerName);
//         if (flower) {
//             addToCart(flower);
//         }
//     });
// });

// // Funktion för att lägga till blomma i varukorgen
// function addToCart(flower) {
//     const cart = document.getElementById('cart');
//     const li = document.createElement('li');
//     li.textContent = `${flower.name} - ${flower.price} kr`;
//     cart.appendChild(li);
// }