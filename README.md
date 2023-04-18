# Give-Me-Space

## 07 Project 1: Interactive Front-End Application

For our project, we are collaborating on an application to help the user learn a bit of both astrology and astronomy! 

The two APIs we have leveraged are: **Horoscope Astrology** and **Planets Info by NewbAPI** which can both be found on RapidAPI. To tie the two together, we use the endpoint, "ruling_planet" from the Horoscope API, and pull a fact about the planet from the Planets Info API! 

With the data pulled from the form, we find the user's associated zodiac sign using their inputted birth month and day. 
The user’s zodiac sign will be put in as a query parameter in the Horoscope Astrology API, so that we can get the info specifically related to their zodiac sign. The different keys this returns are: ‘about’, ‘career’, ‘compatibility’, ‘date_range’, ‘element’, ‘health’, ‘love’, ‘man’, ‘name’, ‘nature’, ‘relationship’, ‘ruling_planet’, ‘strengths’, ‘symbol’, ‘weaknesses’, and ‘woman’. Of which we will be using: **list ones we will use**. 
We will also take the value of ‘ruling_planet’, and and pass it through a function to get the associated ID that the Plants Info API takes as one of their query parameters. The Planets Info API then provides us with some scientific information about the user’s ruling planet! 



### User Story
```md
AS AN individual without much understanding of myself
I WANT to learn about my horoscope and facts related to it
SO THAT I can understand myself better and impress my peers
```

### Acceptance Criteria
```md
GIVEN I am using Horoscope finder to discover more about me
WHEN I open the website “Give Me Space”,
THEN I am presented with a form asking for the inputs: name, day and month of birth.
WHEN I input my name and date of birth,
THEN I am redirected to a new page telling me what my horoscope sign is and a fact about it’s ruling planet, along with associated information such as: **WHAT ELSE**.
WHEN I would like to search again, 
THEN the *HOME* button in the upper left corner will take me back to the main page.
**GOTTA ADD REST OF FUNCTIONALITY WHEN DONE**

```


## Table of Contents

- [Deployment](#deployment)
- [Requirements](#requirements)
- [Usage](#usage)
- [Credits](#credits)
- [Citations](#citations)
- [License](#license)


## Deployment

Link to gitHub project: 
**https://https://github.com/kemcclen/Give-Me-Space**


## Requirements

Here are the requirements for the Project:
### Project Requirements
* Use a CSS framework ~~other than Bootstrap~~.
* Be deployed to GitHub Pages.
* Be interactive (i.e., accept and respond to user input).
* Use at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources).
* Does not use alerts, confirms, or prompts (use modals).
* Use client-side storage to store persistent data.
* Be responsive.
* Have a polished UI.
* Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
* Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

### Presentation Requirements
* Elevator pitch: a one minute description of your application
* Concept: What is your user story? What was your motivation for development?
* Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?
* Demo: Show your stuff!
* Directions for Future Development
* Links to the deployed application and the GitHub repository


## Usage

![Horoscope](./assets/icons/horoscope.png)


## Credits

- jaychan0125  - Joyce Chan
- julie-mac  - Julie Macpherson
- kemcclen  - Katharine McClenaghan
- matthew-millard  - Matthew Millard 
- shok1to  - Shoko Takahashi


## Citations

Maqsood, A., Moatar, T., Krishna, &amp; Zhang, S. (2023). Lectures. 


## License

Licensed under the MIT license.

---
