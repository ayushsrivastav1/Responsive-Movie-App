const searchForm = document.querySelector('form');
const inputbox = document.querySelector('.inputBox');


const getData = async (movie) => {
    const myApiKey = "8415be77";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`
    const response = await fetch(url);
    const Data = await response.json();
    document.querySelector('.movie').innerHTML="";
    inputbox.value = ""

    let div = document.createElement('div');
    div.classList.add('movieCard');
    div.innerHTML = `
    <img src="${Data.Poster}" alt="">
        <div class="movieText">
        <h1>${Data.Title}</h1>
        <p class="rating">Rating : &#11088; <span>${Data.Ratings[0].Value}</span></p>
        <a href="">${Data.Genre}</a>
        <p>Release : <span>${Data.Released}</span></p>
        <p>Duration : <span>${Data.Runtime}</span></p>
        <p>Discription : <span>${Data.Plot}</span></p>
    `
    document.querySelector('.movie').appendChild(div);
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = inputbox.value.trim();

    if (movieName !== "") {
        getData(movieName);
    }
    else{
        document.querySelector('.movie').innerHTML = "<h1>Enter movie name to get movie details</h1>"
    }
}) 

const fn = ()=>{
    console.log("hi");
    
}