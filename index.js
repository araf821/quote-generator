const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// A global variable array for storing all our quotes.
let quotes = [];

function generateNewQuote() {
  loading();
  // Generating a random number from 0 to the length of our quotes array
  const randomNumber = Math.floor(Math.random() * quotes.length);
  // Set the index as the random number to get a random quote from the array.
  const quote = quotes[randomNumber];

  // Check is an author is given
  if (!quote.author) authorText.textContent = "Unknown";
  else authorText.textContent = quote.author;

  // Check quote length to determine styling
  if (quote.text.length > 75) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
  complete();
}

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Function to fetch the json for our quotes array
async function getQuotes() {
  loading();

  // The URL from which we'll be getting our quotes.
  const apiURL = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiURL);
    quotes = await res.json();
    generateNewQuote();
  } catch (err) {
    console.log(err);
  }
}

// Function for our tweet button - enables the user to tweet out the quote
function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  // Below code opens the link in a new black tab.
  window.open(tweetURL, "_blank");
}

// Event listeners for our buttons
newQuoteBtn.addEventListener("click", generateNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
