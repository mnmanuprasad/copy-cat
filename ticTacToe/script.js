const elements = document.querySelectorAll('.move-shadow');

const planetMove = 'planet';
const starMove = 'star';

let nextMove = planetMove;


function handleMouseOver(e){
   const shadowEle = e.target
   if(nextMove == planetMove){
    shadowEle.className = 'move-shadow shadow-planet';
   }
   else{
    shadowEle.className = 'move-shadow shadow-star';
   }
  
}

function handleNextMove(e){
    const shadowEle = e.target
    if(nextMove == planetMove){
        shadowEle.className = 'move-shadow planet-element';
        nextMove = starMove;
    }else{
        shadowEle.className = 'move-shadow star-element';
        nextMove = planetMove;
    }
}

function handleEventRemove(e){

}

elements.forEach((element)=>{
    element.addEventListener('mouseover',handleMouseOver);
});

elements.forEach((element)=>{
    element.addEventListener('click',handleNextMove);
});

