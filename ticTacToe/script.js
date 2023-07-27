const elements = document.querySelectorAll('.move-shadow')

const planetMove = 'planet'
const starMove = 'star'

let nextMove = planetMove


function handleNextMove(e){
   const shadowEle = e.target
   console.log("shadow : ", shadowEle)
   if(nextMove == planetMove){
    shadowEle.className = 'move-shadow shadow-planet'
    nextMove = starMove
   }
   else{
    shadowEle.className = 'move-shadow shadow-star'
    nextMove = planetMove
   }
  
}

elements.forEach((element)=>{
    element.addEventListener('mouseover',handleNextMove)
})

