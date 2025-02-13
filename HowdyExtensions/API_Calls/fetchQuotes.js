const QUOTES_ENDPOINT = 'https://api.api-ninjas.com/v1/quotes';

export default function fetchQuotes() {
    fetch(QUOTES_ENDPOINT, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'tQA53B4GUG7d8M5JwSIMWg==BSpB68KfN32mCgnI' 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const filteredQuotes = data.map(quote => ({
            "author": quote.author,
            "quote": quote.quote,
            "category": quote.category
        }));
        filteredQuotes.sort((a, b) => a.author.localeCompare(b.author));
        console.log(filteredQuotes);
        chrome.storage.local.set({quotes: filteredQuotes}); // Changed 'quote' to 'quotes' for clarity
    })
    .catch(error => {
        console.error('Error:', error); // Changed to console.error for error logs
    });
};