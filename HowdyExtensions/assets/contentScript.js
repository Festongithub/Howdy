(() => {
    let youtubeLeftControl, youtubePlayer; 
    let currentVideo = "";

    chrome.runtime.onMessage.addListener((Obj, sender, response) => {
        const  { type, value, videoId} = Obj;

        if(type === "NEW"){
            currentVideo = videoId;
            newVideoloaded();

        }

    });
})();