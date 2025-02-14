import fetchQuotes from "./API_Calls/fetchQuotes.js";
import fetchExercise from "./API_Calls/fetchExercise.js";
import fetchExchangeRates from "./API_Calls/exchangeRates.js";

chrome.runtime.onInstalled.addListener( details => {
    fetchQuotes();
    fetchExercise();
    fetchExchangeRates();
})

chrome.runtime.onMessage.addListener((data) => {
    const {event, prefs} = data
    switch (event) {
        case 'onStart':
            handleOnStart(prefs);
            break
        case 'onStop':
            handleOnStop(prefs);
            break
        default:
            break
    } 
});

const handleOnStop = () => {
    console.log('onStop in the Background');
    setRunningStatus(false);
    stopAlarm();
}

const handleOnStart = (prefs) => {
    console.log('onStart in the Background');
    console.log('prefs received: ',prefs);
    chrome.storage.local.set(prefs);
    setRunningStatus(true);
    createAlarm();
}

const setRunningStatus = (isRunning) => {
    chrome.storage.local.set({isRunning})
}

const ALARM_NAME = "HOWDY_ALARM"

const createAlarm = () => {
    chrome.alarms.get(ALARM_NAME, existingAlarm => {
        if(existingAlarm) {
            chrome.alarms.create(ALARM_NAME, {periodInMinutes: 1.0})
        }  
    })
}

const stopAlarm = () => {
    chrome.alarms.clearAll()
}
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('On Alarm schedule code running...')
})