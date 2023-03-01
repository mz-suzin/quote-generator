const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const newPersonalQuoteBtn = document.getElementById('new-personal-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let personalQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote(props) {
    loading();
    // pick a random quote from apiQuotes array
    const quote = props[Math.floor(Math.random() * props.length)];

    console.log(quote);

    // Check if author field is blank
    if (!quote.author) {
        authorText.textContent = 'Unknown author';    
    } else {
        authorText.textContent = quote.author;
    }

    // Check if quote text is too long, ie. > 200
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getApiQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote(apiQuotes);
    } catch (error) {
        // catch error here
    }
}

// Get quotes from local Storage
async function getPersonalQuotes2() {
    const path = 'personalQuotes.txt';
    try {
        const response = await fetch(path);
        personalQuotes = await response.json();
    } catch (error) {
        // catch error here
    }
}

// Tweet quote
function tweetQuote () {
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // _blank opens the link in a new tab
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', function() {newQuote(apiQuotes)});
newPersonalQuoteBtn.addEventListener('click', function() {newQuote(personalQuotes)});
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getApiQuotes();
getPersonalQuotes2();

