import {fetchLocations} from "./API_Calls/fetchlocations";
import { fetchOpenSlots } from "./API_Calls/fetchOpenSlots";
const  ALARM_NAME = "HOWDY_ALARM";

let cachedPrefs = {};


chrome.runtime.onInstalled.addListener(details => {
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

const handleOnstop = () => {
    console.log("onStop");
    setRunningStatus(false);
    stopAlarm();
    cachedPrefs = {};
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
            console.log("Alarm already exists");
            return;
        }
    })

    chrome.alarms.create(ALARM_NAME, {periodInMinutes: 1});
}


// stop the alarm when the extension is installed
const stopAlarm = () => {
    chrome.alarms.clear(ALARM_NAME);
}

chrome.alarms.onAlarm.addListener( alarm => {
    console.log("Alarm Fired...");
    fetchLocations();
    fetchOpenSlots(cachedPrefs);
})