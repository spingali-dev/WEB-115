// JavaScript code for form validation

// Retrieve the input field element
var inputField = document.getElementById("inputField");

// Add an event listener to the form that listens for the submit event
document.getElementById("myForm").addEventListener("submit", function(event) {

  // Prevent form from submitting by default until validation passes
  event.preventDefault();

  // Retrieve the input field value
  var inputValue = inputField.value;

  // Regular expression pattern for alphanumeric input (letters and numbers only)
  var alphanumericPattern = /^[a-zA-Z0-9]+$/;

  // Check if the input value matches the pattern
  if (alphanumericPattern.test(inputValue)) {

    // Valid input: hide error, display confirmation message
    document.getElementById("error-message").style.display = "none";
    document.getElementById("success-message").style.display = "block";

  } else {

    // Invalid input: hide success, display error message and prevent submission
    document.getElementById("success-message").style.display = "none";
    document.getElementById("error-message").style.display = "block";

  }
});
