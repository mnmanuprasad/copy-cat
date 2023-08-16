const elements = document.querySelectorAll('.move-shadow');
const ticTacToeEle = document.querySelectorAll('.elements');

const starMoveList = [];
const planetMoveList = [];

const planetMove = 'planet';
const starMove = 'star';

let nextMove = planetMove;

const winning_combo = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [7,5,3]
];


function handleMouseOver(e){
   const shadowEle = e.target;
   
   if(nextMove == planetMove){
    shadowEle.className = 'move-shadow shadow-planet';
   }
   else{
    shadowEle.className = 'move-shadow shadow-star';
   }
  
}

function handleNextMove(e){
    const shadowEle = e.target;
    const elementNO = shadowEle.parentElement.className.split(" ")[1];
    shadowEle.removeEventListener("mouseover", handleMouseOver);
    shadowEle.removeEventListener('click', handleNextMove);
    if(nextMove == planetMove){
        shadowEle.className = 'move-shadow planet-element';
        planetMoveList.push(parseInt(elementNO))
        if(checkForWin(planetMoveList)){
            console.log("planet wins")
        }
        nextMove = starMove;
    }else{
        shadowEle.className = 'move-shadow star-element';
        starMoveList.push(parseInt(elementNO))
        if(checkForWin(starMoveList)){
            console.log("star wins")
        }
        nextMove = planetMove;
    }

    console.log("Planet Move :", planetMoveList)
    console.log("Star Move :", starMoveList)
}


function checkForWin(movesList){
    for (const combo of winning_combo) {
        if (combo.every(item => movesList.includes(item))) {
            return true;
        }
    }
    return false;
}

elements.forEach((element)=>{
    element.addEventListener('mouseover',handleMouseOver);
});

elements.forEach((element)=>{
    element.addEventListener('click',handleNextMove);
});

