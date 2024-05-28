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



