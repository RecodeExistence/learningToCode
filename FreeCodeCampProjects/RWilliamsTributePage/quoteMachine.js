function getImage() { 
  let image = document.getElementById("image"); 
  return image; 
}

window.onload = init;  
function init() { 
image.addEventListener("mouseover", giveHope);
}

function giveHope() { 
let quoteArray = ["There is still a lot to learn and there is always great stuff out there. Even mistakes can be wonderful.", "“You’re only given a little spark of madness. You mustn’t lose it.”", "“No matter what people tell you, words and ideas can change the world.”", "“Why do they call it rush hour when nothing moves?”", "“I always thought the idea of education was to learn to think for yourself.”", "“Ah, yes, divorce… from the Latin word meaning to rip out a man’s genitals through his wallet.”", "“A human life is just a heartbeat in heaven.”", "", "“There are no rules. Just follow your heart.”"];

let quoteIndex = Math.floor(Math.random()*quoteArray.length); 
alert(quoteArray[quoteIndex]);   
}