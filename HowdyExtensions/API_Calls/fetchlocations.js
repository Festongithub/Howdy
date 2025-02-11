const locationEndPoints = "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry"

export const fetchLocations = () => {
    fetch(locationEndPoints)
    .then(response => response.json())
    .then(data => {
        const filteredLocations = data.map(location => ({
            "id":location.id,
            "name":location.name,
            "address":location.address,
            "locationtype":location.locationType,
            "tzData": location.tzData,
            "shortname":location.shortName
    }));
    filteredLocations.sort[(a,b) => a.name.localeCompare(b.name)];
    chrome.storage.local.set({locations: filteredLocations});
    
     console.log(filteredLocations);
    })
    .catch(error => {
        console.log(error);
    });
};