var gamePattern = [];
var userClickedPattern =[];
var buttonColors = ["red", "blue", "green", "yellow"]
var level=0;
var started = false;



$(document).keypress(function() {
  if (!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});



$('.btn').click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound('sounds/'+userChosenColour+'.mp3');
  animatePress(userChosenColour);
  var len =userClickedPattern.length;
  checkAnswer(len-1);
});


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
var randomNumber = Math.floor(Math.random()*4);

var randomChosenColour = buttonColors[randomNumber];

gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound('sounds/'+randomChosenColour+'.mp3');
}





function checkAnswer(currentLevel){

    if((gamePattern[currentLevel])===(userClickedPattern[currentLevel])){
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

  }else {

    playSound('sounds/wrong.mp3');
  $('body').addClass('game-over');
    setTimeout(function (){
      $('body').removeClass('game-over');
    },200);
   $('h1').text('Game Over, Press Any Key to Restart');
   started =false;
   level =0;
   gamePattern=[];
  }

}



function playSound(name){
  var audio = new Audio(name);
  audio.play();
}
function animatePress(name){
  $("#"+name).addClass('pressed');

  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}
