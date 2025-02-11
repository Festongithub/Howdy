export const handleNotifications = (activeAppointments) => {
    if (activeAppointments.length > 0) {
        createNotification(activeAppointments[0]);
    } 
}

const createNotification = (activeAppointments) => {
    chrome.notifications.create({
        title: "Howdy there",
        message: "You have an appointment at $(activeAppointments.timestamp)",
        iconUrl: "./images/icon.png",
        type: "basic"

    })
}
        