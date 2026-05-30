function getFavorites() {
    return JSON.parse(localStorage.getItem("fav")) || [];
}

function toggleFavorite(id) {
    let fav = getFavorites();

    if (fav.includes(id)) {
        fav = fav.filter(f => f !== id);
    } else {
        fav.push(id);
    }

    localStorage.setItem("fav", JSON.stringify(fav));
}

// NOTATKI
function saveNote(coinId, note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || {};
    notes[coinId] = note;
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getNote(coinId) {
    let notes = JSON.parse(localStorage.getItem("notes")) || {};
    return notes[coinId] || "";
}