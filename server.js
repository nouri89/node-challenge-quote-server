// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
	response.send(
		"Nouri's Quote Server!  Ask me for /quotes/random, or /quotes  or /search?author or/search?term"
	);
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
	response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
	response.send(pickFromArray(quotes));
});

app.get("/search", function (req, res) {
	let searchedWord = req.query;
	if (Object.keys(searchedWord)[0] === "author") {
		let searchedAuthor = req.query.author;

		const searchResults = quotes.filter((q) => {
			return q.author.toLowerCase().includes(searchedAuthor.toLowerCase());
		});

		console.log(searchResults.length);
		console.log(quotes.length);

		if (searchResults.length > 0) {
			res.send(searchResults);
		} else {
			res.end(`search was not found!`);
		}
	} else if (Object.keys(searchedWord)[0] === "term") {
		let searchedWord = req.query.term;
		const searchResults = quotes.filter((q) => {
			return q.quote.toLowerCase().includes(searchedWord.toLowerCase());
		});

		console.log(searchResults.length);
		console.log(quotes.length);

		if (searchResults.length > 0) {
			res.send(searchResults);
		} else {
			res.end(`search was not found!`);
		}
	}
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

app.get("/json", (req, res) => {
	res.json({ message: "Hello" });
});

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT || 3000);
//process.env.PORT
