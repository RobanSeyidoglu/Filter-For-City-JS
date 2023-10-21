// Define the API endpoint for the cities data
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

// Create an empty array to store the city data
const cities = [];

// Fetch data from the endpoint and populate the 'cities' array
fetch(endpoint)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    cities.push(...data);
  });

// Function to find cities and states matching a typed word
function findWord(wordTyped, cities) {
  return cities.filter((place) => {
    const regExp = new RegExp(wordTyped, "gi");
    return place.city.match(regExp) || place.state.match(regExp);
  });
}

// Function to display matching city and state results
function displayMatches() {
  // Get the input element and suggestions list
  const input = document.querySelector(".search");
  const ul = document.querySelector(".suggestions");

  // Find cities and states matching the input value
  const matchArray = findWord(input.value, cities);

  // Generate HTML for the matching results
  const html = matchArray.map((place) => {
    // Create regular expression to highlight the input value in the city and state names
    const regExp2 = new RegExp(input.value, "gi");
    const cityName = place.city.replace(
      regExp2,
      `<span class="hl">${input.value}</span>`
    );
    const stateName = place.state.replace(
      regExp2,
      `<span class="hl">${input.value}</span>`
    );

    // Create list items with city, state, and population information
    return `<li> <span class="name"> ${cityName}, ${stateName}</span>
    <span class="population"> ${place.population}</span> </li>`;
  });

  // Update the suggestions list with the generated HTML
  ul.innerHTML = html;
}

// Get references to the input and suggestions elements
const input = document.querySelector(".search");
const ul = document.querySelector(".suggestions");

// Add event listeners to trigger displayMatches when input changes or key is released
input.addEventListener("change", displayMatches);
input.addEventListener("keyup", displayMatches);
