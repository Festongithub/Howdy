import {fetchLocations} from "./API_Calls/fetchlocations";
import { fetchOpenSlots } from "./API_Calls/fetchOpenSlots";
import { createNotification } from "./users_lib/createNotifications";

const  ALARM_NAME = "HOWDY_ALARM";

let cachedPrefs = {};

let firstAppointment = null;

chrome.runtime.onInstalled.addListener(details => {
    handleOnstop();
    fetchLocations();
    fetchQuotes();
})

chrome.runtime.onMessage.addListener( data => {
    const { event, prefs} = data;

    switch (event) {
        case "onStop":
            console.log("onStop");
            break;
        case "onStart":
            console.log("onStart");
            console.log(data.prefs);
            break;
        case "onLocationId":
            console.log("onLocationId");
            break;
        case "onStartDate":
            console.log("onStartDate");
            break;
        case "onEndDate":
            console.log("onEndDate");
            break;
        case "onBookingId":
            console.log("onBookingId");

        default:
            break; 
    }

})

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({url: "https://ttp.cbp.dhs.gov/scheduler"});
})

chrome.alarms.onAlarm.addListener( alarm => {
    console.log("Alarm Fired...");
    fetchLocations()
    openSlotsJobs()
})



const handleOnstop = () => {
    console.log("onStop");
    setRunningStatus(false);
    stopAlarm();
    cachedPrefs = {};
    firstAppointment = null;
}

const handleOnStart = (prefs) => {
    console.log("prefs recieved: ", prefs);
    cachedPrefs = prefs;
    chrome.storage.local.set(prefs);
    setRunningStatus(true);
    createAlarm();

}

const  setRunningStatus = (isRunning) => {
    chrome.storage.local.set({isRunning})
}



const createAlarm = () => {
    chrome.alarms.get(ALARM_NAME, existingAlarms => {
        if(existingAlarms) {

            chrome.alarms.create(ALARM_NAME, {periodInMinutes: 1});
        }
    })

    chrome.alarms.create(ALARM_NAME, {periodInMinutes: 1});
}


// stop the alarm when the extension is installed
const stopAlarm = () => {
    chrome.alarms.clear(ALARM_NAME);
}


const openSlotsJobs = () => {
    fetchOpenSlots(cachedPrefs)
    .then(data => handle) 
}

const handleOpenSlots =(openSlots) => {
    if(openSlots && openSlots.length > 0 && openSlots[0].timestamp !== firstAppointment) {
        firstAppointment = openSlots[0].timestamp;
        createNotification(openSlots[0]);
    }

}