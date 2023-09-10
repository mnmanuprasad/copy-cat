const elements = document.querySelectorAll('.move-shadow');
const winnerDialog = document.getElementById('#winner');
const dialog = document.getElementById("dialog");
const winnerTitle = document.getElementById('winner-title');
const bannerEle = document.getElementById('banner')

const nextRoundBtn = document.getElementById('next-round-btn');
const restartBtn = document.getElementById('restart-btn');

const planetScoreEle = document.getElementById('planet-score');
const starScoreEle = document.getElementById('star-score');

let starMoveList = [];
let planetMoveList = [];

const planetMove = 'planet';
const starMove = 'star';

let planetScore = 0;
let starScore = 0;

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
    dialog.style.display = 'flex';
    if(winner==planetMove){
        planetScore = planetScore + 1;
        planetScoreEle.innerText = planetScore;
        winnerTitle.innerText = 'Planet Wins';
        bannerEle.classList.add('planet-bg')
    }
    else if(winner==starMove){
        starScore = starScore + 1;
        starScoreEle.innerText = starScore;
        winnerTitle.innerText = 'Star Wins';
        bannerEle.classList.add('star-bg')
    }
    else{
        winnerTitle.innerText = 'Game Tied';
        bannerEle.classList.add('tie-bg')
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
        const gameStatus = checkForWin(planetMoveList)
        if(gameStatus=='win'){
            updateWin(planetMove)
        }
        else if(gameStatus=='tie'){
            updateWin('tie')
        }
        nextMove = starMove;
    }else{
        shadowEle.className = 'move-shadow star-element';
        starMoveList.push(parseInt(elementNO))
        const gameStatus = checkForWin(starMoveList)
        if(gameStatus == 'win'){
            updateWin(starMove)
        }else if(gameStatus=='tie'){
            updateWin('tie')
        }
        nextMove = planetMove;
    }
}

function checkForWin(movesList){
    for (const combo of winning_combo) {
        if (combo.every(item => movesList.includes(item))) {
            return 'win';
        }
    }
    if (planetMoveList.length + starMoveList.length == 9){
        return 'tie'
    }
    return 'continue';
}

elements.forEach((element)=>{
    element.addEventListener('mouseover',handleMouseOver);
});

elements.forEach((element)=>{
    element.addEventListener('click',handleNextMove);
});


restartBtn.addEventListener('click',()=>{
    location.reload();
})


nextRoundBtn.addEventListener('click',()=>{
    // Updating the move list to empty
    starMoveList = [];
    planetMoveList = [];

    elements.forEach((element)=>{
        element.addEventListener('mouseover',handleMouseOver);
    });
    
    elements.forEach((element)=>{
        element.addEventListener('click',handleNextMove);
    });
    
    elements.forEach((element)=>{
        console.log(element)
        element.className = "move-shadow";
    });
    
    dialog.style.display = 'none';
})

