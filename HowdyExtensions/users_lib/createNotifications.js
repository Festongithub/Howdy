export const createNotification = (openSlot, numberOfSlots, prefs) => {
    const { tzData } = prefs;

    let message = `You have an appointment at $(openSlot.timestamp) :$(tzData) timezones`;
    if (numberOfSlots > 1) {
        message =  `${message} and ${numberOfSlots - 1} additional  open interviews`
    }

    chrome.notifications.create({
        title: "Howdy there", 
        message,
        iconUrl: "./images/icon.png",
        type: "basic"

    });
}
