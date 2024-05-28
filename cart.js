document.addEventListener('DOMContentLoaded', function() {
    let cartItems = [];

    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });
    
        const cartTotalElement = document.querySelector('.total-amount');
        if (cartTotalElement) {
            cartTotalElement.textContent = `${total} kr`;
        }
        
        let itemName = "";
        let itemPrice = 0;

        cartItems.forEach(item => {
            itemName = item.name;
            itemPrice = item.price;
        });

        const cartName = document.querySelector('.item-name');
        const cartPrice = document.querySelector('.item-price');

        if (cartName && cartPrice) {
            cartPrice.textContent = `${itemName} - ${itemPrice} kr`;
        }
    }

    window.addToCartAndRemoveFromFlowers = function(name, price) {
        cartItems.push({ name: name, price: price });
        updateCartTotal();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function loadCartBox() {
        fetch('cart.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nätverksfel vid inläsning av cart.html');
            }
            return response.text();
        })
        .then(data => {
            const cartBoxContainer = document.createElement('div');
            cartBoxContainer.classList.add('cart-box-container'); // Lägg till en klass för identifiering
            cartBoxContainer.innerHTML = data;
            document.body.appendChild(cartBoxContainer);
            updateCartTotal();

            // Lägg till händelselyssnare för att gömma cartboxen när användaren klickar utanför den
            document.addEventListener('click', function(event) {
                const cartBox = document.querySelector('.cart-box-container');
                const cartButton = document.querySelector('.cart-btn');
                if (cartBox && !cartBox.contains(event.target) && event.target !== cartButton) {
                    cartBox.style.display = 'none';
                }
            });

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 100);
            });
        })
        .catch(error => {
            console.error('Ett fel uppstod:', error);
        });
    }

    function toggleCartBox() {
        let cartBoxContainer = document.querySelector('.cart-box-container');
        if (!cartBoxContainer) {
            loadCartBox();
        } else {
            cartBoxContainer.style.display = cartBoxContainer.style.display === 'none' ? 'block' : 'none';
        }
    }

    document.querySelector('.cart-btn').addEventListener('click', function(event) {
        event.stopPropagation();
        toggleCartBox();
    });

    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('pay-btn')) {
            const flowersContainer = document.getElementById('flowers');
            if (flowersContainer) {
                window.flowers.forEach(flower => {
                    const flowerDiv = flowersContainer.querySelector(`[data-name="${flower.name}"]`);
                    if (flowerDiv) {
                        flowerDiv.querySelector('img').style.opacity = '1';
                        const outOfStockText = flowerDiv.querySelector('.out-of-stock-text');
                        if (outOfStockText) {
                            flowerDiv.removeChild(outOfStockText);
                        }
                    }
                });
            }
            cartItems = [];
            updateCartTotal();
            localStorage.removeItem('cartItems');
        }
    });

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        updateCartTotal();
    }
});
