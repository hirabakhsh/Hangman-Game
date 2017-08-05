$(document).ready(function() {


// helper functions

function initializeImgMap(mp) {
    mp.set("urdu", "assets/images/urdu.JPG");
    mp.set("hindi", "assets/images/hindi.JPG");
    mp.set("english", "assets/images/english.JPG");
    mp.set("spanish", "assets/images/spanish.JPG");
    mp.set("french", "assets/images/french.PNG");
    mp.set("german", "assets/images/german.JPG");
    mp.set("chinese", "assets/images/chinese.jpg");
    mp.set("arabic", "assets/images/arabic.JPG");
    mp.set("russian", "assets/images/russian.JPG");
}

function initializeAudMap(mp) {
    mp.set("urdu", "assets/audio/urdu.m4a");
    mp.set("hindi", "assets/audio/urdu.m4a");
    mp.set("english", "assets/audio/urdu.m4a");
    mp.set("spanish", "assets/audio/urdu.m4a");
    mp.set("french", "assets/audio/urdu.m4a");
    mp.set("german", "assets/audio/urdu.m4a");
    mp.set("chinese", "assets/audio/urdu.m4a");
    mp.set("arabic", "assets/audio/urdu.m4a");
    mp.set("russian", "assets/audio/urdu.m4a");
}

// hangman graphic
 
 var hangmanGraphic = function () {
        maxParts = 7;
    return {
      addBodyPart : function () {
        if (bodyParts < maxParts) {
          ++bodyParts;
          $("#hangman-frame" + bodyParts).css("opacity", 1);
        }
      },
    };
  }();

// Game playing

function getRandomWordFromMap(mp) {
    var randomWord = '';
    var keyIter = mp.keys();
    var randomNumber = Math.floor(Math.random() * mp.size);
    for(i = 0; i <= randomNumber ; i++){
        randomWord = keyIter.next().value;
    }
    return randomWord;
}

function resetVars() {
    usedChars = [];
    currentChar = '';
    livesRemaining = 7;
    audioPath = '';
    imgPath = '';
    currentWord = getRandomWordFromMap(imgMap);
    currentSuccessfullyGuessedArray = [];
    for(i = 0; i < currentWord.length; i++){
        currentSuccessfullyGuessedArray.push("___");
    }
    $(".hangman-frames").css("opacity", 0);
    $("#hangman-frame0").css("opacity", 1);
    bodyParts = 0;
}

function isAlreadyWon() {
    if(!(isCharPresentInArray('___', currentSuccessfullyGuessedArray))){

        //  code for changing image and audio upon winning
        // audioPath = audMap.get(currentWord);
        // var audioElement = document.createElement("audio");
        // audioElement.setAttribute("src", audioPath);
        // imgPath = imgMap.get(currentWord);
        // var imageElement = document.createElement("image")
        // imageElement.setAttribute("src", imgPath);
        alert("You won!");
        totalWins++;
        return true;
    }
    return false;
}

function isAlreadyLost() {
    if(livesRemaining <= 0){
        alert("You lost, try again!");
        return true;
    }
    return false;
}

function printAllVars() {

    console.log("totalWins: " + totalWins);
    console.log("usedChars: " + usedChars);
    console.log("currentChar: " + currentChar);
    console.log("livesRemaining: " + livesRemaining);
    console.log("currentWord: " + currentWord);
    console.log("currentSuccessfullyGuessedArray: " + currentSuccessfullyGuessedArray.toString());

    document.getElementById("wins").innerHTML = totalWins.toString();
    document.getElementById("word").innerHTML = currentSuccessfullyGuessedArray.toString();
    document.getElementById("guesses").innerHTML = livesRemaining.toString();
    document.getElementById("wrong-guesses").innerHTML = usedChars;
    // document.getElementById("word-guessed").innerHTML = "you haven't been successful yet!";
    document.getElementById("win-statement").innerHTML = ["you won " + totalWins + " time(s)"];
    // document.getElementById("game-audio").innerHTML = audioElement.setAttribute("src", audioPath);
    // document.getElementById("game-image").innerHTML = imageElement.setAttribute("src", imgPath);

}

function isValidAlpha(ch) {
    var chNum = ch.toLowerCase().charCodeAt(0);
    return chNum >= 97 && chNum <= 122;
}

function isCharPresentInArray(ch, arr) {
    return jQuery.inArray(ch, arr) !== -1;
}

function isCharPresentInString(ch, str) {
    return str.indexOf(ch) >= 0;
}

function fillCharInArray(ch, str, arr) {
    var index = 0;
    while(true){
        index = str.indexOf(ch, index);
        if(index == -1) {
            break;
        }
        arr[index] = ch;
        index++;
    }
}

function getAlphaFromUser() {
    // currentChar = getRandomCharFromString("abcdefghijklmnopqrstuvwxyz");
    if (!isValidAlpha(currentChar)) {
        // alert("Not a valid alphabet");
        return;
    }
    if (isCharPresentInArray(currentChar, usedChars)) {
        // alert("Alphabet already used");        
        return;
    }
    if (isCharPresentInString(currentChar, currentWord)) {
        fillCharInArray(currentChar, currentWord, currentSuccessfullyGuessedArray);
    } else {
        livesRemaining--;
        usedChars.push(currentChar); 
         hangmanGraphic.addBodyPart();  
    }
}

//global vars
var imgMap = new Map();
initializeImgMap(imgMap);
var audMap = new Map();
initializeAudMap(audMap)

var usedChars = [];
var currentWord = '';
var currentGuessedArray = [];
var currentChar = '';
var livesRemaining = 7;
var totalWins = 0;
var audioPath = '';
var imgPath = '';
var bodyParts = 0;

//1. Start game
resetVars();
printAllVars();

//2. PlayGame
document.onkeyup = function(e){
        currentChar = e.key;
    if(!isAlreadyWon() && !isAlreadyLost()) {
        getAlphaFromUser();
        printAllVars();
        if(isAlreadyWon() || isAlreadyLost()){
            printAllVars();
            resetVars();
            printAllVars();
        }
    }
};

})