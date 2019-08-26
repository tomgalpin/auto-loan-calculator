import React, { Component } from 'react';
import './App.scss';
import LoanCalculator from './components/loanCalculator';

class App extends Component {
  render() {
    return(
      <div>
        <h1>Tom's Auto Loan Calculator</h1>
        <LoanCalculator />
      </div>
    )
  }
}

export default App;