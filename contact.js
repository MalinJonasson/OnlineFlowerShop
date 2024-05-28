document.addEventListener("DOMContentLoaded", function() {
    // Function to insert information into the footer columns
    function insertFooterInfo() {
        var column1 = document.querySelector('#column1');
        var column2 = document.querySelector('#column2');
        
        // Clear any existing content
        column1.innerHTML = '';
        column2.innerHTML = '';

        // Insert content into the first column
        var column1Content = document.createElement('div');
        column1Content.innerHTML = `
            <h2>Contact Information</h2>
            <p>Address: 123 Flower Street</p>
            <p>Phone: 555-1234</p>
            <p>Email: info@flowershop.com</p>
        `;
        column1.appendChild(column1Content);

        // Insert content into the second column
        var column2Content = document.createElement('div');
        column2Content.innerHTML = `
            <h2>Opening Hours</h2>
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
        `;
        column2.appendChild(column2Content);
    }

    // Call the function to insert footer information
    insertFooterInfo();
});