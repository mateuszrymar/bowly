# Live &#8594; https://bowly.netlify.app/

![Bowly-thumbnail](https://user-images.githubusercontent.com/118372766/225638230-815590d7-27e7-4bbe-8c15-a87effa6961e.png)

## To run the project locally:
  1. Download the latest release: https://github.com/mateuszrymar/bowly/releases/tag/v1.1.0
  2. Unpack to a directory of your choice.
  3. Load that directory in the code editor.
  4. In the project directory, run the terminal and run: 

### `npm install` & `npm run dev`

  5. Click the link displayed in the console to run the app in development mode.

## What is Bowly for? 
Bowly is a website that calculates results of ten-pin bowling games and displays them.
The goal for this project was to display data in an easy to understand way.

## Why I built the project this way
  - I wanted to display the data in a similar 10-frame layout, that most bowling scorecards use. This layout is easy to read and allows for checking results "by eye".
  - Considering User Experience, I decided to make two separate views: one for upload, one for display.
  - Since I decided to not use a framework on this task, Bowly is a multi-page website. SPAs in vanilla JS require dealing with state changes, which would complicate development with no tangible benefits. Multi-page approach was much simpler to implement.
  - I wanted to learn writing automated unit tests. It turned out, that they're easy to set up and help catch unobvious errors.

## Interesting features
  - The calculation portion of the app went under quite a lot of unit tests.
  - There are checks in place to ensure completely wrong inputs are not accepted. However, if any player's result is input correctly, it will be displayed despite being mixed with incorrect ones.
  - The user gets notified when something went wrong in most common cases.
  - Strikes and spares are shown in the table to improve readability.

## How I worked on this project
### Research
  - I started by researching ten-pin bowling scoring rules.
  - I researched example scorecards, bowling apps and websites.
### Design & Styling
  - To provide optimal UX, I decided that we need 2 views: one for upload, one for display.
  - UI design was made in Figma: https://www.figma.com/file/mp5YlcTgNQ3WuB4kXyXQpT/bowly?node-id=0%3A1&t=QzNN1qkgQMGBA13p-1
  - UI is loosely based on Apple's homepage: https://www.apple.com/
  - Classes are named in BEM convention. https://getbem.com/naming/
### Coding
  - I started by creating a non-functional mockup based on the design.
  - Next, I wrote separate modules and tested them manually.
  - Test-Driven Development approach was used on the calculation module. I tested particular functions alongside the whole module (integration test).
  - When writing TS code, I referanced Google's and AirBnB styleguides. https://google.github.io/styleguide/tsguide.html
### Testing
  - Unit tests were automated using Vitest.
  - Integration tests were a mix of automatic and manuall approach.
  - End-to-end tests were done manually.
### Version control
  - I used GitHub for version control.
  - GitFlow workflow was used: main, develop, feature & bugfix branches. https://www.atlassian.com/pl/git/tutorials/comparing-workflows/gitflow-workflow
    
## Challenges I was faced with
  - Calculating results without spaghetti code required a few attempts.
  - I learnt writing automated unit tests.

## Tech stack
  - Figma
  - Vite
  - Vitest
  - TypeScript

## If I had more time, I'd do this
  - I'd try to use SCSS to reduce the amount of CSS code.
