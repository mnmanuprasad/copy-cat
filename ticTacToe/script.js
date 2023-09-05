const elements = document.querySelectorAll('.move-shadow');
const ticTacToeEle = document.querySelectorAll('.elements');
const winnerDialog = document.getElementById('#winner');
const dialog = document.getElementById("dialog");
const winnerTitle = document.getElementById('winner-title');

const nextRoundBtn = document.getElementById('next-round-btn');
const restartBtn = document.getElementById('restart-btn');

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

function updateWin(winner){
    if(winner==planetMove){
        dialog.style.display = 'flex'
        winnerTitle.innerText = 'Planet Wins'
    }
    else{
        dialog.style.display = 'flex'
        winnerTitle.innerText = 'Star Wins'
    }
}

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
            updateWin(planetMove)
        }
        nextMove = starMove;
    }else{
        shadowEle.className = 'move-shadow star-element';
        starMoveList.push(parseInt(elementNO))
        if(checkForWin(starMoveList)){
            updateWin(starMove)
        }
        nextMove = planetMove;
    }
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

document.addEventListener('DOMContentLoaded',()=>{
    console.log("Dialog :", dialog)
    dialog.close();
})

restartBtn.addEventListener('click',()=>{
    location.reload();
})