
const quoteIdElement = document.getElementById('quotesId');
const fitIdElement = document.getElementById('fitId');
const bookIdElement = document.getElementById('booksId');
const newsIdElement = document.getElementById('newsId');
const startIdElement = document.getElementById('startDate');
const endDateIdElement = document.getElementById('endDate');

// Button click event
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');


startButton.onclick = () => {
    const prefs  = {
        quotes: quoteIdElement.value,
        fit: fitIdElement.value,
        books: bookIdElement.value,
        news: newsIdElement.value,
        startDate: startIdElement.value,
        endDate: endDateIdElement.value
    }
    chrome.runtime.sendMessage({event: 'onStart', prefs})
}

stopButton.onclick = () => {
    chrome.runtime.sendMessage({event: 'onStop'})
}

chrome.storage.local.get(['quotes', 'fit', 'books', 'news', 'startDate', 'endDate', 'quote'], (result) => { 
    const {quotes, fit, books, news, startDate, endDate, quote } = result
    
    setQuotes(quote);

    if (quotes) {
        quoteIdElement.value = quotes
    }
    if (fit) {
        fitIdElement.value = fit
    }
    if (books) {
        bookIdElement.value = books
    }
    if (news) {
        newsIdElement.value = news
    }

    if (startDate) {
        startIdElement.value = startDate
    }
    if (endDate) {
        endDateIdElement.value = endDate
    }

})

const setQuotes = (quotes) =>  {
    quotes.forEach((quote) => {
        let OptionElement = document.createElement('option');
        OptionElement.value = quote.author;
        OptionElement.innerText = quote.quote;
        OptionElement.setAttribute('data-category', quote.category);
        quoteIdElement.appendChild(OptionElement);
    })
}