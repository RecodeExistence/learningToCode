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


let model = {
        // game set up - set up grid size, how many ships in game.
        boardSize: 7, // size of board for grid. 
        numShips: 3, // How many ships are in the game
        shipLength: 3, // how many cells will each ship occupy?
        shipsSunk: 0 , // how many ships have been sunk so far. 

        // properties - current state:  
        ships: [
            /*array of objects, each object stores the locations of a ship, how many hit's it's had.  
					Access the locations and hits indexes just like any other array indexes.*/
            { //index[0] object.  array of locations, array of hits.   
                locations: ["06", "16", "26"],
                hits: ["", "", ""]
            }, //end of index[0] object, first ship.

            { //index[1] object. 
                locations: ["24", "34", "44"],
                hits: ["", "", ""]
            }, //end of index[1] object , second ship.

            { //index[2] object.
                locations: ["10", "11", "12"],
                hits: ["", "", ""]
            } //end of index[2] object, third ship.   


        ], // end of array of objects.  , 	// ship locations and hits

        // method fires upon ships, decides if hit or miss.
        fire: function(guess) {

            for (let i = 0; i < this.numShips ; i++) {
                let ship = this.ships[i];
                let index = ship.locations.indexOf(guess);

                if (index >= 0) { // if index returns positive integer, 
                    ship.hits[index] = "hit"; // update the matching index of hits that there's been a hit.
                    view.displayHit(guess); 	//update the view.  see displayHit method for info. 
                        //see isSunk multi-line comment below for explanation.  that method returns true, all locations of current ship hit, update the shipsSunk property. 
                        if (this.isSunk(ship)) {
                        		this.numShips--; 
                        		view.displayMessage(`You sank my battleship!`);
                                this.shipsSunk++;
                            }

                            return true; // return true so we can break out of the method and continue the game.
                        }
                }
                view.displayMiss(guess); //update the view.  see displayMiss method in view object for info. 
                	view.displayMessage("The ship moved at the last second!  Fire again!");
                return false; // otherwise, return false.  I think this will be used to update the cells with "miss". 
            },

            /*helper method.  passes to fire() method.  checks if all the hits array indexes contain the word hit, which would sink the ship.
              returns false if any of the index values isn't hit (ie, the ship hasn't been sunk.  returns true if all indexs of the hits array contains "hit"  */
            isSunk: function(ship) {
                for (let i = 0; i < this.shipLength; i++) {
                    if (ship.hits[i] !== "hit") {
                        return false;
                    }
                }
                return true;
            }
        };

        /* Looks like it will be possible to dynamically add ships to the array.  create a new object containing
           locations and hits for every new ship generating, and push() it to the ships array.  

           	Wait.. does that sound like a job for constructor functions? 
         */
         model.fire("53");
         model.fire("06");
		model.fire("16");
		model.fire("26");
		model.fire("34");
		model.fire("24");
		model.fire("44");
		model.fire("12");
		model.fire("11");
		model.fire("10");