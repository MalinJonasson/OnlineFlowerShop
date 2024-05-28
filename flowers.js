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
        new Flower("Orange and Pink", 150, "Small", "bouquet1.png"),
        new Flower("Light Pink", 200, "Medium", "bouquet2.png"),
        new Flower("Purple", 250, "Medium", "bouquet3.png"),
        new Flower("Pink", 300, "Large", "bouquet4.png"),
        new Flower("Pink and White", 200, "Medium", "bouquet5.png"),
        new Flower("Multi", 300, "Large", "bouquet6.png")
    ];
    
    window.flowers = flowers;

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
            
                // Dölja overlay när "Buy" klickas
                overlay.style.display = 'none';
            
                addToCartAndRemoveFromFlowers(flower.name, flower.price);
            });
        });
    }
});
