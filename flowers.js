document.addEventListener('DOMContentLoaded', function() {
    class Flower {
        constructor(name, price, size, image) {
            this.name = name;
            this.price = price;
            this.size = size;
            this.image = image;
        }
    }

    const flowers = [
        new Flower("Bouquet1", 150, "Small", "bouquet1.png"),
        new Flower("Bouquet2", 200, "Medium", "bouquet2.png"),
        new Flower("Bouquet3", 250, "Medium", "bouquet3.png"),
        new Flower("Bouquet4", 300, "Large", "bouquet4.png"),
        new Flower("Bouquet5", 200, "Medium", "bouquet5.png"),
        new Flower("Bouquet6", 300, "Large", "bouquet6.png")
    ];

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
    }

    function addToCartAndRemoveFromFlowers(name, price) {
        cartItems.push({ name: name, price: price });
        updateCartTotal();

        const cartItemsContainer = document.querySelector('.cart-items');
        console.log(cartItemsContainer);
        if (cartItemsContainer != null) {
            const newCartItem = document.createElement('div');
            newCartItem.classList.add('cart-item');
            
            const itemNameElement = document.createElement('p');
            itemNameElement.textContent = name;
            itemNameElement.classList.add('item-name');
            
            const itemPriceElement = document.createElement('p');
            itemPriceElement.textContent = price + ' kr';
            itemPriceElement.classList.add('item-price');
            
            newCartItem.appendChild(itemNameElement);
            newCartItem.appendChild(itemPriceElement);
            
            cartItemsContainer.appendChild(newCartItem);
        } else {
            console.error('Elementet .cart-items hittades inte');
        }
    }

    function loadCartBox() {
        fetch('cart.html')
            .then(response => response.text())
            .then(data => {
                const cartBoxContainer = document.createElement('div');
                cartBoxContainer.innerHTML = data;
                document.body.appendChild(cartBoxContainer);

                document.addEventListener('click', function(event) {
                    const cartBox = document.querySelector('.cart-box');
                    if (cartBox && !cartBox.contains(event.target) && event.target !== document.querySelector('.cart-btn')) {
                        cartBox.remove();
                    }
                });
            });
    }

    document.querySelector('.cart-btn').addEventListener('click', function(event) {
        event.stopPropagation();
        loadCartBox();
    });

    // Lägg till flowers till DOM
    const flowersContainer = document.getElementById('flowers');
    if (flowersContainer) {
        flowers.forEach(flower => {
            const flowerDiv = document.createElement('div');
            flowerDiv.classList.add('flower');
            flowerDiv.dataset.name = flower.name;
            flowerDiv.dataset.price = flower.price;

            const img = document.createElement('img');
            img.src = "bilder/" + flower.image;
            img.alt = flower.name;

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');

            const overlayContent = document.createElement('div');
            overlayContent.classList.add('overlay-content');

            const priceParagraph = document.createElement('p');
            priceParagraph.textContent = `Price: ${flower.price} kr`;

            const sizeParagraph = document.createElement('p');
            sizeParagraph.textContent = `Size: ${flower.size}`;

            const buyButton = document.createElement('button');
            buyButton.classList.add('buy-btn');
            buyButton.textContent = 'Buy';

            overlayContent.appendChild(priceParagraph);
            overlayContent.appendChild(sizeParagraph);
            overlayContent.appendChild(buyButton);

            overlay.appendChild(overlayContent);

            flowerDiv.appendChild(img);
            flowerDiv.appendChild(overlay);

            flowersContainer.appendChild(flowerDiv);

            buyButton.addEventListener('click', function() {
                const index = flowers.indexOf(flower);
                if (index > -1) {
                    flowers.splice(index, 1);
                }

                img.style.opacity = '0.5';
                const outOfStockText = document.createElement('div');
                outOfStockText.textContent = 'Out of stock';
                outOfStockText.style.position = 'absolute';
                outOfStockText.style.top = '50%';
                outOfStockText.style.left = '50%';
                outOfStockText.style.transform = 'translate(-50%, -50%)';
                outOfStockText.style.color = 'white';
                outOfStockText.style.fontSize = '20px';
                flowerDiv.appendChild(outOfStockText);

                addToCartAndRemoveFromFlowers(flower.name, flower.price);
            });
        });
    }
});
