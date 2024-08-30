async function fetchData() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e2653a3d0bmsh7c26e567f41df47p1dd73djsn74a3918221f7',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Actualiza la información en el HTML
        document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
        document.getElementById('condition').textContent = data.current.condition.text;

        // Actualiza el icono
        const iconUrl = `https:${data.current.condition.icon}`;
        document.getElementById('weatherIcon').src = iconUrl;
    } catch (error) {
        console.error(error);
    }
}

fetchData();