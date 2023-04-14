var form = document.querySelector('[data-js="form"]')
var nameInput = form.querySelector('[data-js="user-name"]')
var signInput = form.querySelector('[data-js="star-sign"]')
var errorMessageEl = form.querySelector('[data-js="error-message"]')

// Fetch information from horoscope API based on the user's sign
function getSignInfo(userSign) {
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
	var about = document.createElement('p')
	about.innerHTML = `<b>About:</b> ${signInfo}`
	aboutEl.appendChild(about)
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
	planetName.innerHTML = `<b>Planet name:</b> ${data.name}`
	planetInfoEl.appendChild(planetName)

	var planetDescription = document.createElement('p')
	planetDescription.innerHTML = `<b>Description:</b> ${data.description}`
	planetInfoEl.appendChild(planetDescription)
}

// Display form error messages
function showErrorMessage() {
	var errorMessage = document.createElement('small')
	errorMessage.innerText = '* Please enter your name and star sign.'
	errorMessage.classList.add('error-message')
	errorMessageEl.appendChild(errorMessage)
}

// Remove form error messages
function clearErrorMessage() {
	errorMessageEl.innerHTML = ''
}

// Event Handlers
form.addEventListener('submit', event => {
	event.preventDefault()
	clearErrorMessage()

	var userName = nameInput.value.trim()
	var userSign = signInput.value.toLowerCase()

	if (!userName || !userSign) {
		showErrorMessage()
		return
	}
	clearErrorMessage()
	getSignInfo(userSign)
	nameInput.value = ''
	signInput.value = ''
})
