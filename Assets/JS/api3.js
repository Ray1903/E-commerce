async function fetchData() {
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=3&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e2653a3d0bmsh7c26e567f41df47p1dd73djsn74a3918221f7',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const topCoinsContainer = document.getElementById('topCoins');
        data.data.coins.forEach((coin, index) => {
            const article = document.createElement('article');
            article.className = 'coin-card';
            article.innerHTML = `
                <h3 class="coin-name">${coin.name}</h3>
                <p class="coin-info">Rank: ${coin.rank}</p>
                <p class="coin-info">Price: ${coin.price}</p>
                <img src="${coin.iconUrl}" alt="${coin.name} icon" class="coin-image">
            `;

            topCoinsContainer.appendChild(article);
        });

    } catch (error) {
        console.error(error);
    }
}

// Call the async function
fetchData();