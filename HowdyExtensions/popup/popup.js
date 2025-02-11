
// Elements

const LocationIDElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');
const BookingIDElement = document.getElementById('bookId');
const QuoteElement = document.getElementById('quotesID');

// Buttons
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// event listeners for starting and stop

const runningSpan = document.getElementById('runningSpan');
const stoppingSpan = document.getElementById('stoppingSpan');


const hideElement = (elem) => {
    elem.style.display = 'none';

}

const showElement = (elem) => {
    elem.style.display = '';
}

const disableElement = (elem) => {
    elem.disabled = true;
}

const enableElement = (elem) => {
    elem.disabled = false;
}

const handleOnStartState = () => {
    //span

    showElement(runningSpan);
    hideElement(stoppingSpan);

    //Buttons
    disableElement(startButton);
    enableElement(stopButton);

    //inputs
    disableElement(LocationIDElement);
    disableElement(startDateElement);
    disableElement(endDateElement);
}


const handleOnStopState = () => {
    showElement(stoppingSpan);
    hideElement(runningSpan);

    disableElement(stopButton);
    enableElement(startButton);

    enableElement(LocationIDElement);
    enableElement(startDateElement);
    enableElement(endDateElement);
}

// Error message listener
const LocationErrorElement = document.getElementById('locationError');
const startDateErrorElement = document.getElementById('startDateError');
const endDateErrorElement = document.getElementById('endDateError');
const quoteErrorElement = document.getElementById('quoteError');


const performOnstartValidation = () => {
    if (LocationIDElement.value) {
        showElement(LocationErrorElement);
    } else {
        hideElement(LocationErrorElement);
    }

    if (startDateElement.value) {
        showElement(startDateErrorElement);
    } else {
        hideElement(startDateErrorElement);
    }

    if (endDateElement.value) {
        showElement(endDateErrorElement);
    }

    if (QuoteElement.value) {
        showElement(quoteErrorElement);
    }


    return  LocationErrorElement.value && startDateErrorElement.value && endDateErrorElement.value && quoteErrorElement.value;

}
// Event Listeners
startButton.onclick = () => {

    const allFieldsValid = performOnstartValidation();

    if(allFieldsValid) {

        const prefs = {
            locationId: LocationIDElement.value,
            startDate: startDateElement.value,
            endDate: endDateElement.value,
            tzData: LocationIDElement.options[LocationIDElement.selectedIndex].getAttribute('data-tz'),
            quotes: QuoteElement.value
        }
        chrome.runtime.sendMessage({
            event: "onStart", prefs
        });

    }

    handleOnStartState();
}


stopButton.onclick = () =>{
    handleOnStopState();

    chrome.runtime.sendMessage({
        event: "onStop"
    });
}

chrome.storage.local.get(['locationId','startDate', 'endDate','locations', 'isRunning', 'quotes'], (result) => {
    const { locationId, startDate, endDate , locations, isRunning, quotes } = result;
    setLocations(locations)

    if(locationId) {
        LocationIDElement.value = locationId;
    }

    if(startDate) {
        startDateElement.value = startDate;
    }

    if(endDate) {
        endDateElement.value = endDate;
    }

    console.log(quotes);

    if(isRunning) {
       handleOnStartState();
    } else {
      handleOnStopState();
    }

});



const setLocations = (locations) => {
    locations.forEach(location => {
        let optionElement = document.createElement('option');
        optionElement.value = location.id;
        optionElement.innerHTML = location.name;
        optionElement.setAttribute('data-tz', location.tzData);
        LocationIDElement.appendChild(optionElement);
    })
}
