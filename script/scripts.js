
function getScoreboard(){
  /*
    Call database get top 10 scores.
  */
}
function checkIfHighscore(score){
  /*
    gethighscorelist.
    if score higher than score on top 10,
      -> If yes,  prompt save score
      -> If no,  prompt message saying score not high enough.

  */
}

function saveScore(){
  /*
    Open modal with input name and show score
    if cancel
      -> Close modal and startGame(true)

    If save
      -> Call database and insert score and delete the lowest score
  */
}



var vm = function() {
  var self = this;
  self.playerScore = ko.observable(0);
  self.winner = ko.observable("");
  self.showAcceptChallengeBtn = ko.observable(true);
  self.showAlternativeBtns = ko.observable(false);
  self.cleaverSpeech = ko.observable("I challenge you to a match of Rock Paper Scissors!");

  // Start game, and show alternative btns
  self.startGame = function(newgame){
      $.ajax({
        url:"script/functions.php",
        type: "post",
        dataType: 'json',
        data: {action: "newgame"},
        success:function(){
            self.cleaverSpeech("Choose your weapon!");
            self.showAcceptChallengeBtn(false);
            self.showAlternativeBtns(true);
       }
     });
  }


  self.playRound = function(weapon){
    $.ajax({
            url:"script/functions.php",
            type: "post",
            dataType: 'json',
            data: {action: "crownWinner", weapon: weapon},
            success:function(data){
                self.playerScore(data.score);
                switch(data.winner){
                    case "win":
                    self.cleaverSpeech(weapon + "! Oh.. <strong>You win</strong>, let's go again!");
                    break;

                    case "loss":
                    /*Check if on scoreboard, show modal based on what result*/
                    self.cleaverSpeech("<strong>" + weapon + "!</strong> Haha! I win! Choose a weapon to challenge me again!");
                    break;

                    case "tie":
                    self.cleaverSpeech("Copy cat! I also picked <strong>" + weapon + "</strong>");
                    break;
                }
           }
         });
  }

} // End VM function

var viewmodel = new vm(vm);
ko.applyBindings(vm);