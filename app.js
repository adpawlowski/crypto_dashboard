let coins = [];
let currentPage = 1;
const perPage = 10;
let selectedCoinId = null;

async function init() {
    try {
        showLoader(true);

        coins = await getCoins();
        renderList(coins);
    } catch (e) {
        alert("Błąd ładowania danych");
        console.error(e);
    } finally {
        showLoader(false);
    }
}

function goToPage(page) {
    currentPage = page;
    renderList(coins);
}

function favClick(id, e) {
    e.stopPropagation();
    toggleFavorite(id);
    renderList(coins);
}

function sortByPrice() {
    coins.sort((a, b) => b.current_price - a.current_price);
    currentPage = 1;
    renderList(coins);
}

function showFavorites() {
    const fav = getFavorites();
    const filtered = coins.filter(c => fav.includes(c.id));

    currentPage = 1;
    renderList(filtered);
}

function resetList() {
    currentPage = 1;
    renderList(coins);
}

// SEARCH
document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();

    const val = document.getElementById("searchInput").value;

    if (val.length < 2) {
        alert("Minimum 2 znaki!");
        return;
    }

    const filtered = coins.filter(c =>
        c.name.toLowerCase().includes(val.toLowerCase())
    );

    currentPage = 1;
    renderList(filtered);
});

// NOTATKI
document.getElementById("noteForm").addEventListener("submit", e => {
    e.preventDefault();

    const val = document.getElementById("noteInput").value;

    if (val.length < 3) {
        alert("Minimum 3 znaki!");
        return;
    }

    saveNote(selectedCoinId, val);

    alert("Zapisano ✅");

    goBack();
});

init();