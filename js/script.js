var towerOfHanoi = {
  activeDisk: null,
  disks:['one','two','three','four','five','six','seven','eight'],
  clickedTower: null,
  numberOfDisks: 5,
  numberOfClicks: null,
  gameStarted: false,
  playTimer: null,
  timer: 0,
  highScoreTimes: [30,60,120,240,480,960],
  highScoreMoves: [15,31,63,127,255,511],
  populateScores: function() {
    for (i=0; i<6; i++) {
      for (j=0; j < 2 ; j++) {
        // $('#scoreboard').children('ul').eq(i).children().eq(j)
        switch (j) {
          case 0:
            $('#scoreboard').children('ul').eq(i).children().eq(j).text('Best Time: '+ parseToTime(towerOfHanoi.highScoreTimes[i]));
            break;
          case 1:
            $('#scoreboard').children('ul').eq(i).children().eq(j).text('Fewest Moves: '+towerOfHanoi.highScoreMoves[i]);
            break;
        }
      }
    }
  }
}
$('.tower').on('click', function(){
  towerOfHanoi.clickedTower = $(this)
  diskClick($(this).children('.disk').eq(0));
})
$('#towerThree').on('click',function(){
  if($(this).children().length == towerOfHanoi.numberOfDisks+1){
    winScenario();//WIN!
  }
})
$('.topBar').children(':not(:last-child)').on('click',function(){
  var overlayObject = $('#'+$(this).attr('class').split(" ")[0]);
  if(overlayObject.css('visibility')=='hidden') {
    overlayObject.css('visibility','visible');
    $(this).siblings().css('border-bottom','rgb(154,240,167) solid 2px');
    $(this).css('border-bottom','none');
    overlayObject.siblings('.overlays').css('visibility','hidden');
  } else {
    overlayObject.css('visibility','hidden');
    $('.otherThings').siblings().css('border-bottom','rgb(154,240,167) solid 2px');
    $('.otherThings').css('border-bottom','none');

  }
})
$('.reset').on('click',reset);

function diskClick(clickedDisk) { //tower has been clicked
  if (towerOfHanoi.activeDisk == null && clickedDisk[0] != undefined) { //there is no disk that has been previously activated
    clickedDisk.css('background','red'); //activate the first disk of the tower
    towerOfHanoi.activeDisk = clickedDisk; //store that as the active disk
  } else if (clickedDisk == towerOfHanoi.activeDisk){ //if I click the same disk again it should clear the selection
    clearDiskSelection();
  } else if (towerOfHanoi.activeDisk == null && clickedDisk[0] == undefined) {
    return false;
  } else { //this means you've clicked a different tower AND there is already a previously clicked tower stored
    var allowedMove = checkAllowedMove(clickedDisk); //check to see if the move is allowed
      if(!towerOfHanoi.gameStarted){
        towerOfHanoi.gameStarted = true;
        towerOfHanoi.playTimer = setInterval(function(){
        towerOfHanoi.timer++
        var seconds = towerOfHanoi.timer % 10;
        var tens = Math.floor(( towerOfHanoi.timer % 60 ) / 10);
        var minutes = Math.floor( towerOfHanoi.timer / 60 ) % 10;
        var tensMinutes = Math.floor( towerOfHanoi.timer / 600 ) % 10;
        $('.timer').text( tensMinutes+ minutes+ ":"+tens + seconds);
        },1000)
      }
    if (allowedMove == true) {
      moveDisk(clickedDisk);
    } else {
      //add red flash functionality
      clearDiskSelection();
    }
  }
}
function clearDiskSelection () {
  towerOfHanoi.activeDisk.css('background','black')
  towerOfHanoi.activeDisk = null;
}
function checkAllowedMove(destinationTower) {
  if (destinationTower[0]==undefined) { //there is no disk in the tower destination
    return true;
  } else if (checkSizeofDisk(towerOfHanoi.activeDisk) < checkSizeofDisk(destinationTower)) { //there is a disk in the tower destination, and it is larger
    return true;
  } else { //there is a disk but it smaller
    return false;
  }
}
function checkSizeofDisk(whichDisk) {
  return towerOfHanoi.disks.indexOf(whichDisk.attr('id'));
}
function moveDisk(destinationTower) {
  if (destinationTower[0]==undefined) {
    towerOfHanoi.activeDisk.appendTo(towerOfHanoi.clickedTower);
    towerOfHanoi.numberOfClicks++
    $('.score').text(towerOfHanoi.numberOfClicks)
    clearDiskSelection();
  } else {
    towerOfHanoi.activeDisk.prependTo(destinationTower.parent());
    towerOfHanoi.numberOfClicks++
    $('.score').text(towerOfHanoi.numberOfClicks)
    clearDiskSelection();
  }
}
function winScenario() {
  $('#youWinBanner').css('visibility','visible');
  $('.gameBoard').css('pointer-events','none');
  var scoreTime = towerOfHanoi.timer;
  var scoreMove = towerOfHanoi.numberOfClicks;
  if(towerOfHanoi.highScoreMoves[towerOfHanoi.numberOfDisks-3] < towerOfHanoi.scoreMove){
    if(towerOfHanoi.scoreTime < towerOfHanoi.highScoreTimes[towerOfHanoi.numberOfDisks-3]){
      towerOfHanoi.highScoreTimes[towerOfHanoi.numberOfDisks-3] = towerOfHanoi.scoreTime;
      towerOfHanoi.highScoreMoves[towerOfHanoi.numberOfDisks-3] =towerOfHanoi.scoreMove;
      youWin(true);
      return false;
    } else {
      towerOfHanoi.highScoreMoves[towerOfHanoi.numberOfDisks-3] =towerOfHanoi.scoreMove
      youWin(true);
      return false;
    }
  } else if(scoreTime < towerOfHanoi.highScoreTimes[towerOfHanoi.numberOfDisks-3]) {
      towerOfHanoi.highScoreTimes[towerOfHanoi.numberOfDisks-3] = towerOfHanoi.scoreTime;
    youWin(true);
  } else {
    youWin(false);
  }
}
function youWin(highScoreBreak) {
  if (highScoreBreak){
    $('.winContainer').children('h2').text('Congratulations, you beat a high score!')
    towerOfHanoi.populateScores();
  } else {
    $('.winContainer').children('h2').text('Congratulations, you did it!')
    towerOfHanoi.populateScores();
  }
}
function reset() {
  $('.disk').remove();
  towerOfHanoi.numberOfClicks = null;
  towerOfHanoi.activeDisk = null;
  towerOfHanoi.clickedTower = null;
  towerOfHanoi.gameStarted= false;
  clearInterval(towerOfHanoi.playTimer);
  $('.timer').text('00:00')
  $('.score').text('   0')
  towerOfHanoi.timer= 0;
  for(i=0;i<towerOfHanoi.numberOfDisks;i++){
    var diskTemplate = '<div class="disk" '+'id='+ towerOfHanoi.disks[8-towerOfHanoi.numberOfDisks+i] + '></div>'
    $('#towerOne').append(diskTemplate);
  }

}
function parseToTime(secondsTotal) {
  var seconds = secondsTotal % 10;
  var tens = Math.floor(( secondsTotal % 60 ) / 10);
  var minutes = Math.floor( secondsTotal / 60 ) % 10;
  var tensMinutes = String(Math.floor( secondsTotal / 600 ) % 10);
  console.log(tensMinutes)
  console.log(tensMinutes + minutes + ":" + tens + seconds)
  return tensMinutes + minutes + ":" + tens + seconds;

}
towerOfHanoi.populateScores();
