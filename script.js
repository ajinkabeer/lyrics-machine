const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

//Event Listeners
form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

//Search by song or artist
async function searchSongs(searchTerm) {
  const response = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await response.json();
  showData(data);
}

//Render songs and artist in DOM
function showData(data) {}
