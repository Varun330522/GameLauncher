const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
let width = 15; //value of width for the shooter which is also same for width of a div inside the grid
let direction = 1;
let goingRight = true;
let aliensRemoved = [];
let result = 0;
let invadersId;

for (let i=0; i<225; i++){
    const square = document.createElement('div');
    grid.appendChild(square)
}

//to get all small divs made inside the grid and story it as an array in a constant named 'squares'
const squares = Array.from(document.querySelectorAll(".grid div"));

//indexes where the aliens will be in (Each alien/smallDiv is of width 15)
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
];

//to actually put the alien Invaders in the selected div/array(squares)
function drawAliens(){
    for(let i =0; i<alienInvaders.length; i++){
        if(!aliensRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

drawAliens()

function removeAliens() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

//to put shooter on a default place at start
squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e){

    //first remove the shooter
    squares[currentShooterIndex].classList.remove('shooter');

    //using the keyboard press
    switch(e.key){
        case 'ArrowLeft':
            //check if the shooter is not at the left most part of the outline Box.
            if (currentShooterIndex % width !== 0){
                //if not on the leftMost part then move it to Left
                currentShooterIndex -= 1;
            }break
        case 'ArrowRight':
            //check if the shooter is not on the right most part of the box
            if (currentShooterIndex % width < width-1){
                currentShooterIndex += 1;
            }break
    }

    // Redraw the shooter in its new position
    squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener('keydown', moveShooter);

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =  alienInvaders[alienInvaders.length - 1] % width  === width -1;
    removeAliens();

    if(rightEdge && goingRight){
        for (let i = 0; i < alienInvaders.length; i++) {
             alienInvaders[i] += width +1;
             direction = -1
             goingRight = false
            
        }
    }

    if (leftEdge && !goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width -1;
        direction = 1;
        goingRight = true;
      }
    }

    for(let i=0; i< alienInvaders.length; i++){
        alienInvaders[i] += direction; 
    }
    drawAliens();

    //to check if any alienInvader touched Shooter
    let cList = squares[currentShooterIndex].classList;
    if (cList.contains("shooter") && cList.contains("invader")) {
      //console.log("game over");
      resultDisplay.innerHTML = 'GAME OVER! :('
      clearInterval(invadersId);
    }

    for(let i=0; i<alienInvaders.length; i++){

        if(alienInvaders[i] > (squares.length)){
            resultDisplay.innerHTML = "GAME OVER! :(";
            clearInterval(invadersId);
        }
    }

    if(aliensRemoved.length === alienInvaders.length){
        resultDisplay.innerHTML = "YOU WON!🥳";
        clearInterval(invadersId);
    }

}
//to move the invaders every 500milisecs
invadersId = setInterval(moveInvaders, 500);

//the shoot laser
function shoot(e){
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser(){
        //to erase or remove laser
        squares[currentLaserIndex].classList.remove('laser');

        //to move a width(a div cell) backwards i.e to move upwards in the box boundary
        currentLaserIndex -= width;

        //redraw laser
        squares[currentLaserIndex].classList.add("laser");

        // to check if the laser shoot touched the invader
        // if yes then remove the laser and the invader both
        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(()=> squares[currentLaserIndex].classList.remove("boom"), 400)
            clearInterval(laserId)

            const alienRemoved =  alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved)
            result++;
            resultDisplay.innerHTML = result;
            console.log(aliensRemoved);
        }
    }

    switch (e.key) {
      case "ArrowUp":
        laserId = setInterval(moveLaser, 200);
    }

}

document.addEventListener('keydown', shoot);