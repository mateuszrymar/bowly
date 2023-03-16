# Live &#8594; https://bowly.netlify.app/

## What is Bowly for? 
Bowly is a website that calculates results of ten-pin bowling games and displays them.
The goal for this project was to display data in an easy to understand way.

## Interesting features
  - The calculation portion of the app went under quite a lot of unit tests.
  - There are checks in place to ensure completely wrong inputs are not accepted. However, if any player's result is input correctly, it will be displayed despite being mixed with incorrect ones.
  - The user gets notified when something went wrong in most common cases.
  - Strikes and spares are shown in the table to improve readability.

## How I worked on this project
### Research
  - I started by researching ten-pin bowling scoring.
  - I researched example scorecards, bowling apps and websites.
### Design
  - To provide optimal UX, I decided that we need 2 views: one for upload, one for display.
  - UI design was made in Figma: https://www.figma.com/file/mp5YlcTgNQ3WuB4kXyXQpT/bowly?node-id=0%3A1&t=QzNN1qkgQMGBA13p-1
  - UI is loosely based on Apple's homepage: https://www.apple.com/
### Coding
  - I started by creating a non-functional mockup based on the design.
  - Next, I wrote separate modules and tested them manually.
  - Test-Driven Development approach was used on the calculation module. I tested particular functions alongside the whole module (integration test).
### Testing
  - Unit tests were automated using Vitest.
  - Integration tests were performed automatically and manually.
  - End-to-end tests were done manually.
    
## Challenges I was faced with
  - Calculating results without spaghetti code required a few attempts.
  - I learnt writing automated unit tests.

## Why I built the project this way
  - I wanted to display the data in a similar 10-frame layout, that most bowling scorecards use. This layout is easy to read and allows for checking results "by eye".
  - I decided two separate views: one for upload, one for display, makes for an optimal User Experience.
  - Since I decided to not use a framework on this task, there are 2 
  - I learnt writing automated unit tests.
  - I wanted to practice unit testing. It turned out, that they're easy to set up and allow to catch tricky errors.

## If I had more time, I'd do this
  - I'd try to use SCSS to reduce the amount of CSS.
