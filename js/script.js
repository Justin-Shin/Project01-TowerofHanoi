var towerOfHanoi = {
  activeDisk: null,
  disks:['one','two','three','four','five','six','seven','eight'],
  clickedTower: null,
  numberOfDisks: 5,
  numberOfClicks: null
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
    console.log(towerOfHanoi.numberOfClicks)
    clearDiskSelection();
  } else {
    towerOfHanoi.activeDisk.prependTo(destinationTower.parent());
    towerOfHanoi.numberOfClicks++
    console.log(towerOfHanoi.numberOfClicks)
    clearDiskSelection();
  }
}
function winScenario() {

}
