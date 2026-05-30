function showLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
}

function renderList(data) {
    const body = document.getElementById("tableBody");
    const fav = getFavorites();

    const start = (currentPage - 1) * perPage;
    const pageData = data.slice(start, start + perPage);

    body.innerHTML = "";

    pageData.forEach((coin, i) => {
        body.innerHTML += `
        <tr onclick="showDetails('${coin.id}')">
          <td>${start + i + 1}</td>
          <td>${coin.name}</td>
          <td>$${coin.current_price}</td>
          <td>$${coin.market_cap}</td>
          <td onclick="favClick('${coin.id}', event)">
            ${fav.includes(coin.id) ? "⭐" : "☆"}
          </td>
        </tr>`;
    });

    renderPagination(data.length);

    document.getElementById("favCount").innerText =
        "Ulubione: " + fav.length;
}

function renderPagination(total) {
    const pages = Math.ceil(total / perPage);
    let html = "";

    for (let i = 1; i <= pages; i++) {
        html += `<button onclick="goToPage(${i})">${i}</button>`;
    }

    document.getElementById("pagination").innerHTML = html;
}

function showDetails(id) {
    selectedCoinId = id;

    const coin = coins.find(c => c.id === id);
    const note = getNote(id);

    document.getElementById("listView").classList.add("hidden");
    document.getElementById("detailsView").classList.remove("hidden");

    // ukryj UI listy
    document.getElementById("controls").style.display = "none";
    document.getElementById("searchSection").style.display = "none";

    document.getElementById("details").innerHTML = `
        <h2>${coin.name}</h2>
        <img src="${coin.image}" width="80">
        <p>Cena: $${coin.current_price}</p>
        <p>Max 24h: $${coin.high_24h}</p>
        <p>Min 24h: $${coin.low_24h}</p>
        <p><b>Notatka:</b> ${note || "Brak notatki"}</p>
        <button onclick="openForm()">Edytuj notatkę</button>
    `;
}

function goBack() {
    document.getElementById("detailsView").classList.add("hidden");
    document.getElementById("formView").classList.add("hidden");
    document.getElementById("listView").classList.remove("hidden");

    // pokaż UI listy
    document.getElementById("controls").style.display = "block";
    document.getElementById("searchSection").style.display = "block";
}

function openForm() {
    document.getElementById("detailsView").classList.add("hidden");
    document.getElementById("formView").classList.remove("hidden");

    document.getElementById("noteInput").value =
        getNote(selectedCoinId);
}