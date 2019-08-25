import React from 'react';

function LoanResults(props) {
  return (
    <div className="loan-results-container component">
      <div>
        <p>Monthly Payment</p>
        <p>${props.results.monthlyPayment}</p>
      </div>
      <div>
        <p><span>Total Loan Amount: </span>${props.results.totalLoanAmt}</p>
        <p><span>Total Principal: </span>${props.results.totalPrincipal}</p>
        <p><span>Total Interest: </span>${props.results.totalInterest}</p>
      </div>
    </div>
  )
}

export default LoanResults;
