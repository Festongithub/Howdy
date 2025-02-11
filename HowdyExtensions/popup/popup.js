
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


const showDateError = (dateErrorElem,  errorMessage) => {
    dateErrorElem.innerHTML = errorMessage;
    showElement(dateElem);
}
const validateStartDates = (today, startDate) => {
    const isAfterToday = startDate.isBefore(today, 'date');

    if (startDateElement.value) {
        showDateError(startDateErrorElement, "Please enter a valid start date");
    } else if (isAfterToday) 
    {
        showDateError(startDateErrorElement, "Start date should be after today");
    } else {
        hideElement(startDateErrorElement);
    }

    return startDateErrorElement.value && isAfterToday;
}

const validateEndDates = (today, startDate, endDate) => {
    const isAfterStartDate = endDate.isAfter(startDate, 'date');
    const isAfterToday = endDate.isBefore(today, 'date');

    if (endDateElement.value) {
        showDateError(endDateErrorElement, "Please enter a valid end date");
    } else if (isAfterToday) {
        showDateError(endDateErrorElement, "End date should be after today");

    }
     else {
        hideElement(endDateErrorElement);
    }

    return endDateErrorElement.value && isAfterStartDate && isAfterToday;
}


const validateDates = () => {
    const today = spacetime.now.startOf('day');
    const startDate = spacetime(startDateElement.value).startOf('day');
    const endDate = spacetime(endDateElement.value).startOf('day');

    const isStartDateValid = validateStartDates(today, startDate);

    const isEndDateValid = validateEndDates(today, startDate, endDate);

    return isStartDateValid && isEndDateValid;
}
const performOnstartValidation = () => {
    const isDatesValid = validateDates();

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


    if (QuoteElement.value) {
        showElement(quoteErrorElement);
    }

    return LocationIDElement.value && isDatesValid;
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

const today = spacetime.now();
