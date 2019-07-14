/*Below is the MODEL VIEW CONTROLLER for the battleship web app.
First up is the VIEW.  This controls aspects like displaying messages to the user, displaying the hit image on the 
correct cell location, and displaying the miss image on the cell location entered when it's not a match.  

Essentially; The view controls... the view.  Things being displayed on the page are controlled from here. */

var view = {
// this method takes a string message and displays it
// in the message display area
	displayMessage: function(msg) {
		let messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},	


// this method takes the users entered location, converts from a game grid to an id from the table in html
displayHit: function(location) {
// Display the hit.png on the cell entered.
	let cell = document.getElementById(location); 
	cell.setAttribute("class", "hit");
	}, 

    displayMiss: function(location) {
// Display the hit.png on the cell entered.
	let cell = document.getElementById(location); 
	cell.setAttribute("class", "miss");
	} 
};


/*let model = {
	// game set up - set up grid size, how many ships in game.
	boardSize: 10 , // size of board for grid. 
	numships: , // How many ships are in the game
	shipLength: , 	// how many cells will each ship occupy?

	// properties - current state:  
	ships: , 	// ship locations and hits
	shipsSunk: ,	// how many ships sunk 
	 

	// method fires upon ships, decides if hit or miss.
	fire: , 
};
*/
view.displayMessage("testing testing, is this thing on?");