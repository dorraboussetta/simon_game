var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var gameStarted=0;

function playSound(name) {
     var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
         $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(".btn").click(function(){
    if (gameStarted == 1) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length -1);
    }
    
})

$(document).on("keydown", function (){
    if (gameStarted == 0) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = 1; 
    }
})


function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4 );
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   level++;
   $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
    if (gamePattern.at(currentLevel) == userClickedPattern.at(currentLevel)) {
        if (gamePattern.length == userClickedPattern.length) {
            userClickedPattern = [];
            setTimeout(nextSequence, 100);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over"); 
        startOver();
        setTimeout(function(){
            $("body").removeClass("game-over"); 
            $("h1").text("Game Over, Press Any Key to Restart");
        }, 100);
        console.log("false");
    }
}

function startOver(){
    level = 0; 
    gameStarted = 0; 
    gamePattern = [];
    userClickedPattern = [];
}











