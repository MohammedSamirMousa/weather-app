// Get all the necessary DOM elements
let inputSearch = document.getElementById("inputSearch");
let weatherContainer = document.getElementById("weatherContainer");
let formHero = document.getElementById("formHero");
let formFooter = document.getElementById("formFooter");
let btnFoot = document.getElementById("btnFoot");
let email = document.getElementById("email");
let errorMassage = document.getElementById("errorMassage");

// To make a loading screen when realod
window.addEventListener("load", () => {
  setTimeout( () => {
    let load = document.getElementById("loader");
    load.classList.add("fade-out");
  }, 700);
  setTimeout(function timeOut() {
    let load = document.getElementById("loader");
    load.classList.add("d-none");
  }, 1500);
});

// Initialize user data array and populate it from localStorage if data exists
let userData = [];
if (localStorage.getItem("data")) {
  userData = JSON.parse(localStorage.getItem("data"));
}

// Prevent default form submission behavior for hero and footer forms
formHero.addEventListener("submit", function (e) {
  e.preventDefault();
});
formFooter.addEventListener("submit", function (e) {
  e.preventDefault();
});

// Array of day names to be used for displaying weather
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Array of month names for displaying dates
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to fetch weather data from the API and display it
async function search(res) {
  let apiLink = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${res}&days=3`
  );
  if (apiLink.status >= 200 && apiLink.status < 300) {
    // Check if the request was successful
    let res = await apiLink.json(); // Parse the API response
    display(res.location, res.current); // Display current weather data
    displayAnother(res.forecast.forecastday); // Display forecast data
  }
}

// Listen for user input in the search field and fetch weather data dynamically
inputSearch.addEventListener("keyup", function (res) {
  search(res.target.value);
});

// Function to display current weather data in the main container
function display(res, apiLink) {
  if (apiLink != null) {
    let newDay = new Date(apiLink.last_updated); // Get the date from the API
    let elementsHTML = `
    <div class="col-lg-4 p-0">
                    <div class="card h-100 rounded-end-0 border-end-1">
                        <div class="card-header border-0 d-flex justify-content-between">
                            <h1 class="day color fs-5">${
                              days[newDay.getDay()]
                            }</h1>
                            <h1 class="day color fs-5">${newDay.getDate()} ${
      monthNames[newDay.getMonth()]
    }</h1>
                        </div>
                        <div class="card-body">
                            <p class="color fw-semibold location">${
                              res.name
                            }</p>
                            <div class="degree d-md-flex align-items-md-center gap-3">
                                <h2 class="degree display-1 text-white fw-semibold">${
                                  apiLink.temp_c
                                }</h2>
                                <img src="${
                                  apiLink.condition.icon
                                }" alt="sunny">
                            </div>
                            <p class="staute color-2 fw-semibold">${
                              apiLink.condition.text
                            }</p>
                            <div class="stautes">
                                <ul class="color list-unstyled d-flex">
                                    <li class="me-2">
                                        <i class="fa-solid fa-umbrella"></i>
                                        <span>20%</span>
                                    </li>
                                    <li class="me-2">
                                        <i class="fa-solid fa-wind"></i>
                                        <span>18km/h</span>
                                    </li>
                                    <li class="me-2">
                                        <i class="fa-regular fa-compass"></i>
                                        <span>East</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    weatherContainer.innerHTML = elementsHTML;
  }
}

// Function to display weather forecasts for additional days
function displayAnother(res) {
  let apiLink = "";
  for (i = 1; i < res.length; ++i) {
    // Loop through forecast data (excluding the first day)
    apiLink += `
        <div class="col-lg-4 p-0">
                    <div class="bg-2 h-100 rounded-0 border-end border-1 border-dark">
                        <div class="card-header border-0 p-2">
                            <h1 class="color fs-5 text-center">${
                              days[new Date(res[i].date).getDay()]
                            }</h1>
                        </div>
                        <div class="card-body text-center">
                            <figure>
                                <img src="${res[i].day.condition.icon}" alt="${
      res[i].day.condition.text
    }">
                                <figcaption>
                                    <h2 class="display-1 text-white fw-semibold">${
                                      res[i].day.maxtemp_c
                                    }</h2>
                                    <p class="color">${res[i].day.mintemp_c}</p>
                                    <span class="color-2">${
                                      res[i].day.condition.text
                                    }</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>

                
        `;
  }
  weatherContainer.innerHTML += apiLink;
}

// Add event listener for the footer button to save user email
btnFoot.addEventListener("click", function () {
  if (isValid()) {
    user = {
      name: email.value,
    };
    userData.push(user);
    localStorage.setItem("data", JSON.stringify(userData));
  }
});

// Function to validate the email input
function isValid() {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email.value)) {
    errorMassage.classList.replace("d-block", "d-none");
    clear();
  } else {
    errorMassage.classList.replace("d-none", "d-block");
  }
}

// Function to clear the email input field
function clear() {
  email.value = "";
}

// Initialize the search with a default value
search("Shubra El-Kheima");
