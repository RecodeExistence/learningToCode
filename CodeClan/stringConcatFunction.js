// Program for Admissions. Edited 16/07/2019
const getWeather = function(country, weatherType) {

    //Assign the datatypes of our arguments to variables.  
    let countryDataType = typeof(country);
    let weatherDataType = typeof(weatherType);

    //Conditional to ensure datatypes are what we expect.
    if (countryDataType === "string" && weatherDataType === "string") {
        return (`The weather in ${country} is ${weatherType}.`);
    } else {
        /*  This is the code I'd use to return an error if the arguments passed to the parameters are not of the 
            data type I want them to be.  
            throw new TypeError(`Expected a string, instead recieved a ${countryDataType} and ${weatherDataType}`, "index.js", 
            lookup callstack
            for line number here);  */

        //But for the purpose of this exercise, here is a simple string result to inform us it's not valid.  */
        return ("Incorrect value passed to function.");
    }
};


//tests run as expected.  
console.log(getWeather("Scotland", "sunny"));
console.log(getWeather("Spain", "glorious"));
console.log(getWeather("Thailand", "cooking"));

//test written to check datatype sanitizing.
console.log(getWeather(50, "fail"));


/* An alternate version of this code could be (note, i would keep the data sanitising as a function of it's 
    own that I could call on the getWeather function externally, then pass it back):  

const getWeather = (country, getWeather) => console.log(`The weather in ${country} is ${getWeather}`); 