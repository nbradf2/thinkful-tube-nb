$(document).ready(function () {

    // STEP ONE - Get user input (form id: #search-form, input id: #search-item, button id: #search-button)
    $('#search-form').submit(function (event) {
        event.preventDefault();
        // get the value from the input box (id: #search-item)
        let userInput = $('#search-item').val();
        console.log(userInput);
        // use value userInput to call the getResults function defined below
        getResults(userInput);
    });

    // STEP TWO - Using input from the user (userInput - or #search-item) make the API call to get the JSON response
    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyCrGFyqH3k1epbj2LLoN-dFHvQ01u2ki40",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {
                console.log(receivedApiData);
                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                } else {
                    displaySearchResults(receivedApiData.items);
                }
            });
    }


    // STEP THREE - Using the JSON response (videos) to populate HTML with the variable inside JSON
    function displaySearchResults(videosArray) {

        // Create an empty variable to store the LI for each of the results
        let buildHtmlOutput = "";

        $.each(videosArray, function (videosArrayKey, videosArrayValue) {
            buildHtmlOutput +=
                `<li>
                    <p>${videosArrayValue.snippet.title}</p>
                    <a href='https://www.youtube.com/watch?v=${videosArrayValue.id.videoId}' target='_blank'>
                    <img src='${videosArrayValue.snippet.thumbnails.high.url}'/>
                    </a>
                </li>`
        });

        //use HTML output to show it in the index.html
        $('#results-section ul').html(buildHtmlOutput)

    }
})
