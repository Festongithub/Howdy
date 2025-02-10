
// Elements

const LocationIDElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');
const BookingIDElement = document.getElementById('bookId');

// Buttons
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');


// Event Listeners
startButton.onclick = () => {

    const prefs = {
        locationId: LocationIDElement.value,
        startDate: startDateElement.value,
        endDate: endDateElement.value,
        tzData: LocationIDElement.options[LocationIDElement.selectedIndex].getAttribute('data-tz')
    }
    chrome.runtime.sendMessage({
        event: "onStart", prefs
    });
}


stopButton.onclick = () =>{
    chrome.runtime.sendMessage({
        event: "onStop"
    });
}

chrome.storage.local.get(['locationId','startDate', 'endDate','locations', 'isRunning'], (result) => {
    const { locationId, startDate, endDate , locations, isRunning} = result;
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

    console.log("Running status: ", isRunning);
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
