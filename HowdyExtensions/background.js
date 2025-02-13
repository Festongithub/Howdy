import fetchQuotes from "./API_Calls/fetchQuotes.js";

chrome.runtime.onInstalled.addListener( details => {
    fetchQuotes();
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
    console.log('onStop in the Background')
}

const handleOnStart = (prefs) => {
    console.log('onStart in the Background')
    console.log('prefs received: ',prefs)
    chrome.storage.local.set(prefs)
}