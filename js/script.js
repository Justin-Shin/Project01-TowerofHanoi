var towerOfHanoi = {
  activeDisk: null,
  disks:['one','two','three','four','five'],
  clickedTower: null
}
$('.tower').on('click', function(){
  clickedTower = $(this)
  diskClick($(this).children('.disk').eq(0));
})
function diskClick(clickedDisk) { //tower has been clicked
  console.log(clickedDisk[0])
  if (towerOfHanoi.activeDisk == null && clickedDisk[0] != undefined) { //there is no disk that has been previously activated
    clickedDisk.css('background','black'); //activate the first disk of the tower
    towerOfHanoi.activeDisk = clickedDisk; //store that as the active disk
  } else if (clickedDisk == towerOfHanoi.activeDisk){ //if I click the same disk again it should clear the selection
    clearDiskSelection();
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
  towerOfHanoi.activeDisk.css('background','white')
  towerOfHanoi.activeDisk = null;
}
function checkAllowedMove(destinationTower) {
  // if (destinationTower[0]==undefined) {
  //   moveDisk(destinationTower);
  // } else if (checkSizeofDisk(towerOfHanoi.activeDisk) < checkSizeofDisk(destinationTower)) {
  //   moveDisk(destinationTower);
  // } else {
  //   clearDiskSelection();
  // }
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
  console.log('apple')
  console.log('dest : ' + destinationTower.parent().attr('id'));
  console.log('div: ' +towerOfHanoi.activeDisk.attr('id'));
  if (destinationTower[0]==undefined) {
    towerOfHanoi.activeDisk.appendTo(clickedTower);
    clearDiskSelection();
  } else {
    towerOfHanoi.activeDisk.prependTo(destinationTower.parent());
    clearDiskSelection();
  // destinationTower.prepend(towerOfHanoi.activeDisk)
  }
}
