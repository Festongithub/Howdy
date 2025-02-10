// Elements

const LocationIDElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');

// Buttons
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');


// Event Listeners
startButton.onclick = () => {

    const prefs = {
        locationId: LocationIDElement.value,
        startDate: startDateElement.value,
        endDate: endDateElement.value
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

chrome.storage.local.get(['prefs'], (result) => {
    const { prefs } = result;

    if (prefs) {
        LocationIDElement.value = prefs.locationId;
        startDateElement.value = prefs.startDate;
        endDateElement.value = prefs.endDate;
    }
})
