
const quoteIdElement = document.getElementById('quotesId');
const fitIdElement = document.getElementById('fitId');
const bookIdElement = document.getElementById('booksId');
const newsIdElement = document.getElementById('newsId');
const startIdElement = document.getElementById('startDate');
const endDateIdElement = document.getElementById('endDate');

// Button click event
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');

//Event listeners
const runningSpan = document.getElementById('runningSpan');
const stoppingSpan = document.getElementById('stoppingSpan');

// Error popup listeners
const bookError = document.getElementById('booksErrorId');
const quoteError = document.getElementById('quotesErrorId');
const fitError = document.getElementById('fitErrorId');
const newsError = document.getElementById('newsErrorId');
const startDateError = document.getElementById('startdatesErrorId');
const endDateError = document.getElementById('endDateErrorId');


const hideElement = (element) => {
    element.style.display = 'none';
}

const showElement = (element) => {
    element.style.display = '';
}

const disableElement = (element) => {
    element.disabled = true;
}

const enableElement = (element) => {
    element.disabled = false;
}
const handleOnStartState = () => {

    //Spans
    showElement(runningSpan);
    hideElement(stoppingSpan);

    //Buttons
    disableElement(startButton);
    enableElement(stopButton);

    //Inputs
    disableElement(quoteIdElement);
    disableElement(fitIdElement);
    disableElement(bookIdElement);
    disableElement(newsIdElement);
    disableElement(startIdElement);
    disableElement(endDateIdElement);
}

const handleOnStopState = () => {

    //Spans
    showElement(stoppingSpan);
    hideElement(runningSpan);

    //Buttons
    disableElement(stopButton);
    enableElement(startButton);

    //Inputs
    enableElement(quoteIdElement);
    enableElement(fitIdElement);
    enableElement(bookIdElement);
    enableElement(newsIdElement);
    enableElement(startIdElement);
    enableElement(endDateIdElement);
}


const performOnstart = () => {
    if(quoteIdElement.value ) {
            showElement(quoteError);
    } else {
        hideElement(quoteError);
    }

    if (fitIdElement.value) {
        showElement(fitError);
    } else {
        hideElement(fitError);
    }

    if (bookIdElement.value) {
        showElement(bookError);
    } else {
        hideElement(bookError);
    }

    if(newsIdElement.value) {
        showElement(newsError);
    }

    if(startIdElement.value) {
        showElement(startDateError);
    }
    
    if(endDateIdElement.value) {
        showElement(endDateError);
    }

    return quoteIdElement.value && fitIdElement.value && bookIdElement.value && newsIdElement.value && startIdElement.value && endDateIdElement.value;
}


startButton.onclick = () => {
    const allFieldsValid  = performOnstart();
    handleOnStartState();

    if (allFieldsValid) {
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
}

stopButton.onclick = () => {
    handleOnStopState();
    chrome.runtime.sendMessage({event: 'onStop'})
}

chrome.storage.local.get(['quotes', 'fit', 'books', 'news', 'startDate', 'endDate', 'quote', 'isRunning', 'exercise', 'exchangeRates'], (result) => { 
    const {quotes, fit, books, news, startDate, endDate, quote, isRunning, exercise , exchangeRates} = result
    
    setQuotes(quote);
    setExercise(exercise);
    setExchangeRates(exchangeRates);

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

    if(isRunning) {
        handleOnStartState();
    } else {
        handleOnStopState();
    }
    console.log(exercise);
})

const setQuotes = (quote) =>  {
    quote.forEach((quote) => {
        let OptionElement = document.createElement('option');
        OptionElement.value = quote.author;
        OptionElement.innerText = quote.quote;
        OptionElement.setAttribute('data-category', quote.category);
        quoteIdElement.appendChild(OptionElement);
    })
}

const setExercise = (exercise) => {
    exercise.forEach((exercise) => {
        let OptionElement = document.createElement('option');
        OptionElement.value = exercise.name;
        OptionElement.innerText = exercise.name;
        OptionElement.setAttribute('data-category', exercise.muscle);
        fitIdElement.appendChild(OptionElement);
    })
}


const setExchangeRates = (exchangeRates) => {
    exchangeRates.forEach((rate) => {
        let OptionElement = document.createElement('option');
        OptionElement.value = exchangeRates.pair;
        OptionElement.innerText = exchangeRates.rate;
        newsIdElement.appendChild(OptionElement);
    })
}