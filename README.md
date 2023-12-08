# Quizzical
A quiz app with questions fetched from the [Open Trivia Database](https://opentdb.com/). This is a Scrimba bootcamp solo project with some additional features of my own. The app is built with React.js, using the context API.

## In this document
1. [App URL](#app-url)
2. [App screenshots](#app-screenshots)
3. [Technologies used](#technologies-used)
4. [Stumbling and learning points](#stumbling-and-learning-points)

## App URL
[https://quizzical-ajo-b.netlify.app/](https://quizzical-ajo-b.netlify.app/)

## App screenshots
![Settings page](/src/assets/settings.png)
*Settings page*

![Quiz page](/src/assets/quiz.png)
*Quiz page*

## Technologies used
1. [React.js](https://react.dev/)
2. [Open Trivia Database](https://opentdb.com/)
3. [html-entities](https://www.npmjs.com/package/html-entities)

## Stumbling and learning points
### Decoding HTML entities
Working with this project, I encountered HTML entities for the first time. The quiz data needed decoding before being displayed to the user, which I solved using the `html-entities` library.

### Navigation without routing
This app contains three pages and the navigation between them is handled merely with conditional rendering. To ensure a good UX, all navigation to the quiz page is blocked until the data is loaded and ready to be rendered.

### Conditional styling
Conditional styling plays a crucial part in this app. Depending on the quiz status – is the game still on or has the user finished the quiz – the styling should vary, right and wrong answers should be highlighted only after the quiz is over, etc. Furthermore, the user can switch between light and dark mode, which adds an extra layer to the conditional styling.