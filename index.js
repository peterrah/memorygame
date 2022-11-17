var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];

var started=false;
var level=0;

$(document).keypress(function(e){
  if(!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started=true;
  }
})

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})



function nextSequence(){

  userClickedPattern=[];

  level++
  $("#level-title").text("Level "+level);

  randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}


function playSound(name){
  var sounds=new Audio("sounds/"+name+".mp3")
  sounds.play();

}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  },100)

}


function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("failed");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },2000);
    startOver();
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
  // $("#level-title").text("Press Any Key to Start");
}
