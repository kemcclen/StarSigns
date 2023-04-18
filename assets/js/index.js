
var zodiacSignIcons = {
	aquarius: './assets/icons/aquarius.png',
	pisces: './assets/icons/pisces.png',
	aries: './assets/icons/aries.png',
	taurus: './assets/icons/taurus.png',
	gemini: './assets/icons/gemini.png',
	cancer: './assets/icons/cancer.png',
	leo: './assets/icons/leo.png',
	virgo: './assets/icons/virgo.png',
	libra: './assets/icons/libra.png',
	scorpio: './assets/icons/scorpio.png',
	sagittarius: './assets/icons/sagittarius.png',
	capricorn: './assets/icons/capricon.png',
}

var form = document.querySelector('[data-js="form"]')
var nameInput = form.querySelector('[data-js="user-name"]')
var errorMessageEl = form.querySelector('[data-js="error-message"]')

// Get users Zodiac sign depending on their birth month and day
var getZodiacSign = function () {
	var birthMonth = form.querySelector('[data-js="birth-month"]').value
	var birthDay = form.querySelector('[data-js="birth-day"]').value
	var zodiacSigns = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn']

	var signDates = [
		{ month: 1, day: 20 },
		{ month: 2, day: 19 },
		{ month: 3, day: 21 },
		{ month: 4, day: 20 },
		{ month: 5, day: 21 },
		{ month: 6, day: 21 },
		{ month: 7, day: 23 },
		{ month: 8, day: 23 },
		{ month: 9, day: 23 },
		{ month: 10, day: 23 },
		{ month: 11, day: 22 },
		{ month: 12, day: 22 },
	]

	for (var i = 0; i < signDates.length; i++) {
		if (birthMonth == signDates[i].month && birthDay >= signDates[i].day) {
			return zodiacSigns[i]
		} else if (birthMonth == signDates[i + 1].month && birthDay < signDates[i + 1].day) {
			return zodiacSigns[i]
		}
	}
}

// Fetch information from horoscope API based on the user's sign
function getSignInfo(userSign, userName) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'fe8e9ba566msh17124e256018f62p16f611jsn1710ab6c8e63',
			'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com',
		},
	}
	var signURL = `https://horoscope-astrology.p.rapidapi.com/sign?s=${userSign}`

	fetch(signURL, options)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					console.log(data)

					var signInfo = data.about
					renderSignInfo(signInfo)

					var planetName = data.ruling_planet
					getPlanet(planetName)

					var cardContainerEl = document.querySelector('[data-js="card-container"]')
					cardContainerEl.classList.remove('display-none')

					var welcomeMessageEl = document.querySelector('[data-js="welcome-message"]')
					welcomeMessageEl.innerHTML = `<h2>Hi ${userName.charAt(0).toUpperCase() + userName.slice(1)}, your zodiac sign is ${userSign.charAt(0).toUpperCase() + userSign.slice(1)}.</h2>`
				})
			} else {
				console.log(`Error: ${response.statusText}`)
			}
		})
		.catch(function (err) {
			console.error(err)
		})
}

// Render star sign information
var renderSignInfo = function (signInfo) {
	var aboutEl = document.querySelector('[data-js="about"]')
	aboutEl.innerHTML = `<h3>About:</h3> ${signInfo}`
}

// Fetch planet information from API
var getPlanet = function (planetName) {
	var id = getPlanetId(planetName)

	var options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'fe8e9ba566msh17124e256018f62p16f611jsn1710ab6c8e63',
			'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com',
		},
	}
	var planetURL = `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/${id}`
	fetch(planetURL, options)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					console.log(data)
					renderPlanetInfo(data)
				})
			} else {
				console.log(response.statusText)
			}
		})
		.catch(function (err) {
			console.error(err)
		})
}

// Get the planet id number based on the planet's name.
var getPlanetId = function (planetName) {
	var planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
	var index = planets.findIndex(planet => planet === planetName)
	var id = index + 1
	return id
}

// Render planet info to page
var renderPlanetInfo = function (data) {
	var planetInfoEl = document.querySelector('[data-js="planet-info"]')

	var planetName = document.createElement('p')
	planetName.innerHTML = `<h3>Planet name:</h3> ${data.name}`
	planetInfoEl.appendChild(planetName)

	var planetDescription = document.createElement('p')
	planetDescription.innerHTML = `<h3>Description:</h3> ${data.description}`
	planetInfoEl.appendChild(planetDescription)
}

// Display form error messages
function showErrorMessage() {
	var errorMessage = document.createElement('small')
	errorMessage.innerText = '* Please enter your first name.'
	errorMessage.classList.add('error-message')
	errorMessageEl.appendChild(errorMessage)
}

// Remove form error messages
function clearErrorMessage() {
	errorMessageEl.innerHTML = ''
}

// Add the class of display none to block element
function displayNone(element) {
	element.classList.add('display-none')
}

// Event Handlers
form.addEventListener('submit', event => {
	event.preventDefault()
	clearErrorMessage()

	var userName = nameInput.value.trim()
	var userSign = getZodiacSign()
	userSign = userSign.toLowerCase()

	if (!userName) {
		showErrorMessage()
		return
	}
	clearErrorMessage()
	getSignInfo(userSign, userName)
	nameInput.value = ''
	displayNone(form.parentElement)
})
