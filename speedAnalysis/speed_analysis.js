let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
    // Set the test text
    document.getElementById("inputText").value = testText;
    
    // Reset results and timer
    document.getElementById("userInput").readOnly = false;
    document.getElementById("userInput").value= "";
    document.getElementById("output").innerHTML = "";
    startTime = new Date().getTime();
    
    // Change button text and functionality
    var button = document.getElementById("btn");
    button.innerHTML = "End Test";
    button.onclick = endTest;
}

function endTest() {
    endTime = new Date().getTime();

    // Disable user input
    document.getElementById("userInput").readOnly = true;

    // Calculate time elapsed and words per minute (WPM)
    var timeElapsed = (endTime - startTime) / 1000; // in seconds
    var userTypedText = document.getElementById("userInput").value;

    // Split the text using regex to count words correctly
    var typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    });

    var wpm = 0; // Default value

    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }

    var corrects = 0; //default value of correct rate

    var testWords = testText.split(/\s+/).filter(function (word) {
        return word !== "";
    }); //get the array of test words

    var totalCompares = testWords.length <= typedWords.length ? testWords.length : typedWords.length; // choose the lenght of shorter one for the total compares

    for (let i = 0; i < totalCompares; i++) {
        if (testWords[i] === typedWords[i] ) {
            corrects += 1;
        }
    }

    var correctRate = (corrects/testWords.length * 100).toFixed(2);

    // Display the results
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Typing Test Results:</h2>" +
        "<p>Words Typed: " + typedWords.length + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>" + 
        "<p>Correct Rate: " + correctRate + "%" + "</p>"
        ;

    // Reset the button
    var button = document.getElementById("btn");
    button.innerHTML = "Start Test";
    button.onclick = startTest;
}