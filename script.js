'use strict';

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#qoute');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const dotLoader = document.querySelector('.dot-loader');

let quotes = [];

function showLoadingSpinner() {
	dotLoader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!dotLoader.hidden) {
		dotLoader.hidden = true;
		quoteContainer.hidden = false;
	}
}

function newQuote() {
	showLoadingSpinner();
	const randomNum = Math.floor(Math.random() * quotes.length);
	const quote = quotes[randomNum];

	if (quote.text.length > 120) quoteText.classList.add('long-quote');
	else quoteText.classList.remove('long-quote');

	quoteText.textContent = quote.text;
	authorText.textContent = quote.author ?? 'Unknow';
	removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes() {
	showLoadingSpinner();
	const API_URL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

	try {
		const data = await (await fetch(API_URL)).json();
		quotes = await data;
		newQuote();
	} catch (error) {
		console.log('whoops, no quote', error.message);
	}
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
