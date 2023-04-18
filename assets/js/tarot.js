var cards = Array.from(document.querySelectorAll('[data-js="card-inner"]'))
var cardsContent = Array.from(document.querySelectorAll('[data-js="card-back-content"]'))

// Renders API data to Tarot cards
function renderData(data) {
	var i = 0
	cardsContent.forEach(card => {
		var cardBodyEl = card.querySelector('[data-js="card-back-body"]')

		var cardNameEl = cardBodyEl.querySelector('[data-js="card-back-name"]')
		var cardName = data.res[i].name
		cardNameEl.innerHTML = `${cardName}`

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
