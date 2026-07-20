// script.js

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");

    // Attach event listener (NOT an onclick attribute) to call submitForm()
    submitBtn.addEventListener("click", submitForm);
});

function submitForm() {
    // Grab the values entered by the user in each text box
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const course = document.getElementById("course").value;
    const section = document.getElementById("section").value;
    const role = document.getElementById("role").value;

    // Create a custom "person" object using the values from the form
    const person = {
        firstName: firstName,
        lastName: lastName,
        course: course,
        section: section,
        role: role
    };

    // Print the person object to the console as a JavaScript object
    console.log(person);

    // Print the person object to the console in multi-line JSON format
    // The third argument (2) tells JSON.stringify to indent with 2 spaces,
    // which produces the required multi-line, human-readable format.
    console.log(JSON.stringify(person, null, 2));
}
