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



/* REMOVE THIS BEFORE MERGING WITH MASTER, ONLY AFTER READING AND ACTING.
	Issue for this is that the displayMiss method won't */
displayMiss: function(location) {
/* Display the miss.png on the cell entered, by adding a class attribute to the element with the value miss,
	 which will reference the correct <td>, via i assume another method converting it */
	 let cell = document.getElementById(location); 
	cell.setAttribute("class", "miss");
	}
};

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("Tap tap, is this thing on?");