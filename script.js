//your JS code here. If required.
// Get all the image elements
const images = Array.from(document.querySelectorAll('.image-container img'));

// Initialize the clicked images array
let clickedImages = [];

// Add click event listeners to the images
images.forEach((image, index) => {
  image.addEventListener('click', () => {
    // Add the clicked image to the clickedImages array
    clickedImages.push(index);

    // Change the border color of the clicked image
    image.classList.add('selected');

    // Check if two images are clicked
    if (clickedImages.length === 2) {
      // Disable click events on the images
      images.forEach((img) => img.removeEventListener('click', imageClickHandler));

      // Show the Verify button
      verifyButton.style.display = 'block';
    }
  });
});

// Get the Reset button and add click event listener
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetHandler);

// Get the Verify button and add click event listener
const verifyButton = document.getElementById('verify');
verifyButton.addEventListener('click', verifyHandler);

// Get the paragraph element for the result message
const para = document.getElementById('para');

// Function to handle the click event on the images
function imageClickHandler() {
  // Check if two images are already clicked
  if (clickedImages.length === 2) {
    return;
  }

  // Add the clicked image to the clickedImages array
  clickedImages.push(this.dataset.index);

  // Change the border color of the clicked image
  this.classList.add('selected');

  // Check if two images are clicked
  if (clickedImages.length === 2) {
    // Disable click events on the images
    images.forEach((image) => image.removeEventListener('click', imageClickHandler));

    // Show the Verify button
    verifyButton.style.display = 'block';
  }
}

// Function to handle the click event on the Reset button
function resetHandler() {
  // Clear the clickedImages array
  clickedImages = [];

  // Remove the border color from the selected images
  images.forEach((image) => image.classList.remove('selected'));

  // Hide the Reset button
  resetButton.style.display = 'none';

  // Hide the Verify button
  verifyButton.style.display = 'none';

  // Clear the result message
  para.textContent = '';

  // Enable click events on the images
  images.forEach((image) => image.addEventListener('click', imageClickHandler));
}

// Function to handle the click event on the Verify button
function verifyHandler() {
  // Disable the Verify button
  verifyButton.style.display = 'none';

  // Check if the clicked images are identical
  const isIdentical = clickedImages[0] === clickedImages[1];

  // Display the result message
  if (isIdentical) {
    para.textContent = 'You are a human. Congratulations!';
  } else {
    para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
  }
}

// Shuffle the images and set their src attribute
function shuffleImages() {
  const imageUrls = ['url1.jpg', 'url2.jpg', 'url3.jpg', 'url4.jpg', 'url5.jpg', 'url6.jpg'];

  // Shuffle the imageUrls array
  for (let i = imageUrls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
  }

  // Set the src attribute for each image
  images.forEach((image, index) => {
    image.src = imageUrls[index];
    image.dataset.index = index;
  });
}

// Shuffle the images on page load
shuffleImages();
