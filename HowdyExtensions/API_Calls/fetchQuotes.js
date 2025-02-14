const QUOTES_ENDPOINT = 'https://api.api-ninjas.com/v1/quotes';

export default function fetchQuotes() {
    fetch(QUOTES_ENDPOINT, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'tQA53B4GUG7d8M5JwSIMWg==BSpB68KfN32mCgnI' 
        }
    })
    .then(response => response.json())
    .then(data => {
        const filteredQuotes = data.map(quote => {
            return {
                "author": quote.author,
                "quote": quote.quote,
                "category": quote.category
            }
        });
        filteredQuotes.sort((a, b) => a.author.localeCompare(b.author));
        chrome.storage.local.set({quote: filteredQuotes}); // Changed 'quote' to 'quotes' for clarity
        console.log(filteredQuotes);
    })
    .catch(error => {
        console.log('Error:', error); // Changed to console.error for error logs
    });
};