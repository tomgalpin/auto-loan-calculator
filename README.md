# Tom's Auto Loan Calculator React Practice:
A simple App using React and an API

## Calculations From:  
- https://www.wikihow.com/Calculate-Auto-Loan-Payments
- https://m.wikihow.com/Calculate-Amortization

## Deploy
- Live @:  
  - From:  https://github.com/gitname/react-gh-pages

## Areas of Improvement:
1. More robust error handling in form input fields
2. A slider for some of the form input fields

## Guidelines
1. Responsive Auto Loan Calculator.
2. Use the following inputs:  
  - Car Price
  - Downpayment
  - Loan Duration
  - Interest Rate
3. Return the following:
  - Estimated monthly payment
  - Total interest paid (over the duration of the loan)
  - Amortization schedule

## Structure
    .
    ├── /public 
    │     └── favicon.ico
    │     └── index.html
    │     └── manifest.json
    │     └── robots.txt
    ├── /src     
    │     ├── /components
    │     │     ├── loanForm.jsx
    │     │     └── loanResults.jsx
    │     ├── /styles                    
    │     │     ├── reset.css 
    │     │     ├── variables.scss   
    │     │     ├── mixins.scss
    │     │     ├── loan-form.scss 
    │     │     └── loan-results.scss
    │     ├── App.scss
    │     ├── App.test.js
    │     ├── serviceWorker.js
    │     └── index.jsx
    ├── package.json
    └── README.md


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Runs the testing suite.
