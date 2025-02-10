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
        default:
            break; 
    }

})

const handleOnstop = () => {
    console.log("onStop");
}

const handleOnStart = (prefs) => {
    console.log("onStart");
    console.log("prefs recieved: ", prefs);

    chrome.storage.local.set(prefs)

}
