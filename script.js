const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

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
  try {
    const response = await fetch(`${apiURL}/suggest/${searchTerm}`);
    const data = await response.json();
    showData(data);
  } catch (error) {
    console.log("Sorry, Try again.");
  }
}

//Render songs and artist in DOM
function showData(data) {
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      song =>
        `
        <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>
      
      `
    )
    .join("")}
  </ul>
  `;
  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Previous</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
}

//pagination

async function getMoreSongs(url) {
  console.log(url);
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();
  showData(data);
}

//Get lyrics button click
result.addEventListener("click", e => {
  clickedElement = e.target;
  if (clickedElement.tagName === "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});

async function getLyrics(artist, songTitle) {
  try {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r|\n)/g, "<br>");
    more.innerHTML = "";
    console.log(lyrics);
    result.innerHTML = `<h2><strong>${artist}</strong></h2>
    <span>${lyrics}</span>
    `;
  } catch (error) {
    alert("Sorry, not available.");
  }
}
