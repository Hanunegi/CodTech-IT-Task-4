const API_KEY = '220c4c9bf150417e90b9d855cdfd8267'; // Replace with your key
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

async function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const cuisine = document.getElementById('cuisine').value;
    const diet = document.getElementById('diet').value;
    const loading = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');

    // Show loading animation
    loading.style.display = 'block';
    resultsDiv.innerHTML = '';

    const params = new URLSearchParams({
        apiKey: API_KEY,
        query: query,
        cuisine: cuisine,
        diet: diet,
        addRecipeInformation: true,
        instructionsRequired: true,
        number: 12
    });

    try {
        const response = await fetch(`${BASE_URL}?${params}`);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p class="error">Error fetching recipes. Please try again.</p>';
    } finally {
        // Hide loading animation
        loading.style.display = 'none';
    }
}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">No recipes found. Try different filters.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            ${recipe.image ? `<img src="${recipe.image}" class="recipe-image" alt="${recipe.title}">` : ''}
            <h3>${recipe.title}</h3>
            <div class="dietary-info">
                ${recipe.diets.map(diet => `<span class="badge">${diet}</span>`).join('')}
            </div>
            <p>⏱️ Ready in ${recipe.readyInMinutes} minutes</p>
            <p>🍽️ Serves ${recipe.servings}</p>
            ${recipe.summary ? `<p>${recipe.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}...</p>` : ''}
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe →</a>
        `;
        resultsDiv.appendChild(card);
    });
}