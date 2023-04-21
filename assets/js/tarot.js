var cards = Array.from(document.querySelectorAll('[data-js="card-inner"]'))
var cardsContent = Array.from(document.querySelectorAll('[data-js="card-back-content"]'))
var viewSavedReadingBtn = document.querySelector('[data-js="view-saved-reading-btn"]')
var saveReadingBtn = document.querySelector('[data-js="save-reading-btn"]')
var homeBtn = document.querySelector('[data-js="tarot-home"]');

// Renders API data to Tarot cards
function renderData(data) {
	var i = 0
	cardsContent.forEach(card => {
		var cardBodyEl = card.querySelector('[data-js="card-back-body"]')

		var cardNameEl = cardBodyEl.querySelector('[data-js="card-back-name"]')
		var cardName = data.res[i].name
		cardNameEl.innerHTML = `<h3>${cardName}</h3>`

		var cardDescEl = cardBodyEl.querySelector('[data-js="card-back-desc"]')
		var cardDesc = data.res[i].desc
		cardDescEl.innerHTML = `${cardDesc}`

		i++
	})
}

// Fetch Tarot cards API on page load
window.addEventListener('load', function () {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'fe8e9ba566msh17124e256018f62p16f611jsn1710ab6c8e63',
			'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com',
		},
	}

	var tarotCardsURL = 'https://horoscope-astrology.p.rapidapi.com/threetarotcards'

	fetch(tarotCardsURL, options)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					console.log(data)
					renderData(data)
				})
			} else {
				console.log(`Error: ${response.statusText}`)
			}
		})
		.catch(function (err) {
			console.error(err)
		})
})

// Cards Event Handler - will flip the clicked card.
cards.forEach(card => {
	card.addEventListener('click', function (event) {
		card.classList.toggle('is-flipped')
		console.log(card)
	})
})

// Save data to local storage, replacing and current previous data.
function saveToLocalStorage(data) {
	console.log(JSON.stringify(data))
	localStorage.setItem('Reading', JSON.stringify(data))
}

// Flip cards back to front
function flipCardsBack() {
	cards.forEach(card => {
		card.classList.remove('is-flipped')
	})
	flipCards()
}

// Flip cards
function flipCards() {
	cards.forEach(card => {
		card.classList.add('is-flipped')
	})
}

// Event handler for the "View Last Reading" button
viewSavedReadingBtn.addEventListener('click', function (event) {
	var previousReading = JSON.parse(localStorage.getItem('Reading'))
	console.log(previousReading)
	flipCardsBack()
	renderData(previousReading)
})

// Event handler for the "Save Reading" button
saveReadingBtn.addEventListener('click', function (event) {
	var currentReading = document.querySelectorAll('[data-js="card-back-content"]')
	var currentReadingArr = []
	currentReading.forEach(card => {
		var cardName = card.querySelector('[data-js="card-back-name"]').innerHTML
		var cardDesc = card.querySelector('[data-js="card-back-desc"]').innerHTML
		var cardObj = {
			name: cardName,
			desc: cardDesc,
		}
		currentReadingArr.push(cardObj)
	})
	saveToLocalStorage({ res: currentReadingArr })
	flipCards()
})

homeBtn.addEventListener('click', homePage);

function homePage() {
	location.href = "../../index.html";
}