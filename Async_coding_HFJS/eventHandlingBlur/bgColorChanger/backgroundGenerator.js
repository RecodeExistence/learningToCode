let randomBackGroundGenerator = {
    top : document.getElementById("top-container"),  
    bottom: document.getElementById("bottom-container"),  

generateRgb: function() {   //generates number up to 255, for use in rgb string concat. 
    const num = Math.floor(Math.random()*255); 
        return num;
        },

randomiseTimer: function() { //random timeout creator, up to 5 seconds.  used for reloads.  
    let randomTime = Math.floor(Math.random()* 5000); 
        return randomTime; 
        },

selectDiv: function(selectorOne, selectorTwo) { 
    selectorTop = this.top; 
    selectorBottom = this.bottom; 
    let divArray = [selectorTop, selectorBottom]; 
    let chooseIndex = Math.floor(Math.random() * divArray.length); 
    return divArray[chooseIndex]; 
}, 

changeBackground: function() {  // generate random background color, set it.
        let index = this.selectDiv()      
        index.style.backgroundColor = `rgb(${this.generateRgb()}, ${this.generateRgb()}, ${this.generateRgb()})`;
    setTimeout(this.changeBackground(), this.randomiseTimer());       
        }, 

reloadPage: function(rand) {    // generates a timer between 0 and 5 seconds, then reloads the window after that timer.  
    rand = Math.floor(Math.random()* (5000 - 2500) + 2500); 
    setTimeout(location.reload(true), rand); 
    }

}; 
window.onload = init;  

function init() { 
    let button = document.getElementById("submit-btn");
    button.addEventListener("click", randomBackGroundGenerator.changeBackground());
     
}