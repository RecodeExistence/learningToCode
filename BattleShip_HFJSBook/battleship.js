/*Below is the MODEL VIEW CONTROLLER for the battleship web app.
First up is the VIEW.  This controls aspects like displaying messages to the user, displaying the hit image on the 
correct cell location, and displaying the miss image on the cell location entered when it's not a match.  
Essentially; The view controls... the view.  Things being displayed on the page are controlled from here. */
let model = {
        // game set up - set up grid size, how many ships in game.
        boardSize: 7, // size of board for grid. 
        numShips: 3, // How many ships are in the game
        shipLength: 3, // how many cells will each ship occupy?
        shipsSunk: 0 , // how many ships have been sunk so far. 

        // properties - current state:  
        ships: [ { locations: [0, 0, 0], hits: ["", "", ""] },
                 { locations: [0, 0, 0], hits: ["", "", ""] },
                 { locations: [0, 0, 0], hits: ["", "", ""] } 
                ],
        // method fires upon ships, decides if hit or miss.
        fire: function(guess) {

            for (let i = 0 ; i < this.numShips ; i++) {
                let ship = this.ships[i];
                let index = ship.locations.indexOf(guess);

                if (index >= 0) { // if index returns positive integer, 
                    ship.hits[index] = "hit"; 
                    view.displayHit(guess);
                    view.displayMessage("HIT! Are more nearby?");  	//update the view.  see displayHit method for info. 
                        //see isSunk multi-line comment below for explanation.  that method returns true, all locations of current ship hit, update the shipsSunk property. 

                        if (this.isSunk(ship)) {
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
            }, 

            generateShipLocations: function() {
                let locations; 
                for (let i = 0 ; i < this.numShips; i++) {
                    do {
                        locations = this.generateShip();
                    } while (this.collision(locations));
                    this.ships[i].locations = locations;
                }
                console.log("Ships array: "); 
                console.log(this.ships); 
            },

            generateShip: function() {
                let direction = Math.floor(Math.random()*2);
                let row, col;

                if (direction === 1) {
                    // starting location, horizontal.
                    row = Math.floor(Math.random() * this.boardSize);
                    col = Math.floor(Math.random()* (this.boardSize - this.shipLength + 1));
                } else {
                    // starting location, vertical.
                    row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
                    col = Math.floor(Math.random() * this.boardSize); 
                }

                let newShipLocations = []; 
                for (let i = 0 ; i < this.shipLength ; i++) {
                    if(direction === 1) {
                        //push location to horizontal ship array.
                        newShipLocations.push(row + "" + (col + i));
                    } else {
                        //push location to vertical ship array. 
                        newShipLocations.push((row + i) + "" + col);
                    }
                }
                return newShipLocations;
            },
            

                collision: function(locations) {
                    for (let i = 0 ; i < this.numShips ; i++) {
                        let ship = this.ships[i]; 
                        for (let j = 0 ; j <  locations.length ; j++) {
                            if(ship.locations.indexOf(locations[j]) >= 0) {
                                return true; // return true if the randomly generated location matches an already generated location.
                                }
                             
                        }
                    }
                    return false; 
                }

                
            
        };

        /* Looks like it will be possible to dynamically add ships to the array.  create a new object containing
           locations and hits for every new ship generating, and push() it to the ships array.  
           	Wait.. does that sound like a job for constructor functions? 
         */

let view = {
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
     

         let controller = {
             guesses: 0 , 

             processGuess: function(guess) {
                 let location = parseGuess(guess);
                 if(location) {
                     this.guesses++ ;
                     let hit = model.fire(location);
                     if(hit && model.shipsSunk === model.numShips) {
                         view.displayMessage(`You sank all my battleships, in ${this.guesses} guesses`);
                     }

                 }
             }
         };

         function parseGuess(guess) {
            let alphabet = ["A", "B", "C", "D", "E","F","G"]; 

            if(guess === null || guess.length !== 2) {
                alert("Oops, please enter a letter and a number on the board.");
            } else {
                let row = alphabet.indexOf(guess.charAt(0));
                let column = guess.charAt(1);

                if (isNaN(row) || isNaN(column)) {
                    alert("Oops, that isn't on the board");
                } else if (row < 0 || row >= model.boardSize || 
                            column < 0 || column >= model.boardSize) {
                                alert("Oops, that's off the board");
                            } else {
                                return row + column ; 
                            }
            }
            return null; 
        
        }


        function handleKeyPress(e) {
            let fireButton = document.getElementById("fireButton");
            if (e.keyCode === 13) {
                fireButton.click();
                return false;
            }
        }
 
       
        //init to be called when page loaded.
        window.onload = init;
        function init() {
           let fireButton = document.getElementById("fireButton"); 
           fireButton.onclick = handleFireButton;
           let guessInput = document.getElementById("guessInput");
           guessInput.onkeypress = handleKeyPress;

           model.generateShipLocations();
       }

       
       function handleFireButton() {
           let guessInput = document.getElementById("guessInput"); 
           let guess = guessInput.value;
           controller.processGuess(guess);

           guessInput.value = "";

       }
      
