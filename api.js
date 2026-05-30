const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

async function getCoins() {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Błąd API");
    }

    return await res.json();
}
