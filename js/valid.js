// Get all the necessary DOM elements
let userName = document.getElementById("userName");
let emailUser = document.getElementById("emailUser");
let company = document.getElementById("company");
let website = document.getElementById("website");
let btnContact = document.getElementById("btnContact");
let contactForm = document.getElementById("contactForm");
let text = document.getElementById("text");
let allInputs = document.querySelectorAll("input , textarea");
let emailContact = document.getElementById("emailContact");
let btnFoot = document.getElementById("btnFoot");

// To make a loading screen when reload
window.addEventListener("load", () => {
  setTimeout( () => {
    let load = document.getElementById("loaders");
    load.classList.add("fade-out");
  }, 300);
  setTimeout(function timeOut() {
    let load = document.getElementById("loaders");
    load.classList.add("d-none");
  }, 1000);
});

// Initialize data list from localStorage or as an empty array
let dataList = [];

// Regular expression for validating names
let nameRegex = /[a-zA-Z]{3,}/;
let emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let websiteRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

// If data exists in localStorage, retrieve and parse it
localStorage.getItem("data")
  ? (dataList = JSON.parse(localStorage.getItem("data")))
  : "";

// Add an event listener for contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Validate each input field using regex
  let ValidName = validate(userName, nameRegex.test(userName.value));
  let ValidEmail = validate(emailUser, emailRegex.test(emailUser.value));
  let ValidComp = validate(company, nameRegex.test(company.value));
  let ValidWeb = validate(website, websiteRegex.test(website.value));
  let ValidText = validate(text, nameRegex.test(text.value));

  // If all inputs are valid, proceed to submit
  if (ValidName && ValidEmail && ValidComp && ValidWeb && ValidText) {
    submit();
  }
});

// Add real-time validation for each input field
userName.addEventListener("input", () => {
  validate(userName, nameRegex.test(userName.value));
});
emailUser.addEventListener("input", () => {
  validate(emailUser, emailRegex.test(emailUser.value));
});
company.addEventListener("input", () => {
  validate(company, nameRegex.test(company.value));
});
website.addEventListener("input", () => {
  validate(website, websiteRegex.test(website.value));
});
text.addEventListener("input", () => {
  validate(text, nameRegex.test(text.value));
});
emailContact.addEventListener("input", () => {
  validate(emailContact, emailRegex.test(emailContact.value));
});

// Add real-time validation for each input field
function submit() {
  const usreData = {
    name: userName.value, // Collect the name
    email: emailUser.value, // Collect the name
    comp: company.value, // Collect the name
    web: website.value, // Collect the name
    massage: text.value, // Collect the name
  };
  dataList.push(usreData); // Add the collected data to the data list
  localStorage.setItem("data", JSON.stringify(dataList)); // Save the data list in localStorage
  clear(); // Clear all inputs and reset form styles
}

// Function to clear input fields and reset styles
function clear() {
  userName.value = "";
  emailUser.value = "";
  company.value = "";
  website.value = "";
  text.value = "";
  emailContact.value = "";

  // Loop through all inputs and remove validation classes
  for (i = 0; i < allInputs.length; ++i) {
    allInputs[i].classList.remove("is-valid");
  }
}

// Function to validate inputs and apply styles
function validate(input, condition) {
  if ((input, condition)) {
    // Check if input matches the condition
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true; // Return true if valid
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

// Add event listener for footer subscription form submission
formFooter.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate footer email input
  let validEmailContact = validate(
    emailContact,
    emailRegex.test(emailContact.value)
  );

  // If valid, submit the subscription data
  if (validEmailContact) {
    submitSubscribe();
  } else {
    // Show an error message if the email is invalid
    document
      .getElementById("errorMassage")
      .classList.replace("d-none", "d-block");
  }
});

// Function to handle footer subscription form submission
function submitSubscribe() {
  let data = {
    emailSub: emailContact.value,
  };
  dataList.push(data);
  localStorage.setItem("data", JSON.stringify(dataList));
  document
    .getElementById("errorMassage")
    .classList.replace("d-block", "d-none");
  clear();
}
