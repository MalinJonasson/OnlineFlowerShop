document.addEventListener("DOMContentLoaded", function() {
  // Function to insert information into the "About Us" section
  function insertAboutUsInfo() {
      var aboutUsSection = document.querySelector('#AboutUs');
      
      // Create and append the h2 element
      var heading = document.createElement('h2');
      heading.textContent = "About Us";
      aboutUsSection.appendChild(heading);
      
      // Create and append the paragraph element with the description
      var description = document.createElement('p');
      description.innerHTML = "FlowerShop thrives on a passion for nature and a commitment to enhancing lives with beauty. <br>" +
          "Inspired by the elegance of flowers and the artistry of gardens, we create sanctuaries of tranquility. <br>" +
          "Our team crafts exquisite arrangements, fostering sustainability and inviting all to experience <br>" +
          "the harmony of nature's embrace.";
      aboutUsSection.appendChild(description);
      
  }

  insertAboutUsInfo();
  // Function to insert information into the "aside" section
  function insertAsideInfo() {
      var asideSection = document.querySelector('.aside');
      
      // Clear any existing content
      asideSection.innerHTML = '';

      // Create and append a heading
      var asideHeading = document.createElement('h2');
      asideHeading.textContent = "Interesting Facts";
      asideSection.appendChild(asideHeading);

      // Create and append a list of facts
      var factList = document.createElement('ul');

      var facts = [
          "Flowers have been used for thousands of years for medicinal purposes.",
          "There are over 400,000 species of flowering plants in the world.",
          "Some flowers can change their color to attract different pollinators.",
          "The largest flower in the world is the Rafflesia arnoldii, which can grow up to 3 feet in diameter."
      ];

      facts.forEach(function(fact) {
          var listItem = document.createElement('li');
          listItem.textContent = fact;
          factList.appendChild(listItem);
      });

      asideSection.appendChild(factList);
  }

  insertAsideInfo();
});