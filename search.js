// search.js
const API_KEY = '37c08cbd542e2f54d82f2c0dd22901f0';

function searchItems() {
    const query = document.getElementById('search').value.trim();
    const type = document.getElementById('type').value;

    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    // Redirect to results page with search parameters
    window.location.href = `results.html?query=${encodeURIComponent(query)}&type=${type}`;
}

// results.js
async function loadResults() {
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const type = urlParams.get('type');

    // Update the search input and type select with the current search
    document.getElementById('search').value = query;
    document.getElementById('type').value = type;

    const response = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.results.forEach((item) => {
        const title = type === 'movie' ? item.title : item.name;
        const year = type === 'movie' ? item.release_date : item.first_air_date;
        const posterPath = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
        const id = item.id;

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="item" onclick="viewDetails('${type}', ${id})">
                <img src="${posterPath}" alt="${title}" style="width: 100px; height: auto;">
                <h3>${title} (${year ? year.split('-')[0] : 'N/A'})</h3>
            </div>
        `;
        resultsDiv.appendChild(div);
    });
}

async function viewDetails(type, id) {
    window.location.href = `details.html?type=${type}&id=${id}`;
}