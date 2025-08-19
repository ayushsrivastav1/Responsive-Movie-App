// Select elements from DOM
const searchForm = document.querySelector('form');
const inputbox = document.querySelector('.inputBox');
const movieContainer = document.querySelector('.movie');

// Function to fetch movie data
const getData = async (movie) => {
    const myApiKey = "8415be77";
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    try {
        // Fetch data from API
        const response = await fetch(url);
        const data = await response.json();

        // Clear old results before showing new one
        movieContainer.innerHTML = "";
        inputbox.value = "";

        // If API says "Movie not found"
        if (data.Response === "False") {
            movieContainer.innerHTML = `<h2 style="color:red;">${data.Error}</h2>`;
            return; // stop function here
        }

        // Create movie card
        let div = document.createElement('div');
        div.classList.add('movieCard');

        // Fill card with movie details
        div.innerHTML = `
            <img src="${data.Poster}" alt="Movie Poster">
            <div class="movieText">
                <h1>${data.Title}</h1>
                <p class="rating">Rating : &#11088; <span>${data.Ratings?.[0]?.Value || "N/A"}</span></p>
                <a href="#">${data.Genre}</a>
                <p>Release : <span>${data.Released}</span></p>
                <p>Duration : <span>${data.Runtime}</span></p>
                <p>Description : <span>${data.Plot}</span></p>
            </div>
        `;

        // Append card to container
        movieContainer.appendChild(div);

    } catch (error) {
        // If internet/server issue
        movieContainer.innerHTML = `<h2 style="color:red;">Something went wrong. Please try again later.</h2>`;
        console.error("Fetch error:", error);
    }
};

// When user submits the form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload
    const movieName = inputbox.value.trim(); // get movie name from input

    if (movieName !== "") {
        getData(movieName); // fetch details if not empty
    } else {
        movieContainer.innerHTML = "<h2>Please enter a movie name</h2>";
    }
});