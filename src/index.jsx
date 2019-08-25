import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import LoanCalculator from './components/loanCalculator';

class App extends React.Component {

  render() {
    return(
      <div>
        <h1>Tom's Auto Loan Calculator</h1>
        <LoanCalculator />
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('auto-loan-app')
);
