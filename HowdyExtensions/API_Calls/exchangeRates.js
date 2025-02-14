const  EX_RATE_URL = 'https://api.api-ninjas.com/v1/exchangerate?pair=GBP_AUD';
export default function fetchExchangeRates() {
    fetch(EX_RATE_URL, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'tQA53B4GUG7d8M5JwSIMWg==BSpB68KfN32mCgnI' 
        }
    })
    .then(response => response.json())
    .then(data => {
        const filteredRates = data.map(rate => {
            return {
                "pair": rate.pair,
                "rate": rate.rate
            }
        });
        filteredRates.sort((a, b) => a.author.localeCompare(b.author));
        chrome.storage.local.set({exchangeRates: filteredRates}); // Changed 'quote' to 'quotes' for clarity
        console.log(filteredRates);
    })
    .catch(error => {
        console.log('Error:', error); // Changed to console.error for error logs
    });
};

