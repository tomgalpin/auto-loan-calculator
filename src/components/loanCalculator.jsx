import React from 'react';
import LoanForm from './loanForm';
import LoanResults from './loanResults';
import LoanAmortization from './loanAmortization';

class LoanCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        price: "",
        downPayment: "",
        duration: "",
        interestRate: ""
      },
      results: {
        totalPrincipal: "0",
        totalLoanAmt: "0",
        monthlyPayment: "0",
        totalInterest: "0"
      },
      amortization: {
        resultsArray: [],
        totalInterestPaid: "",
        isHidden: true
      }
    };
  }

  calcTotalPrincipal(totalLoanAmt, totalInterest) {
    /**
    * Calculate the Total Prinicipal Paid
    * @param {string} totalLoanAmt 
    * @param {string} totalInterest 
    * @return {float}
    */ 
    return (totalLoanAmt - totalInterest).toFixed(2);
  }

  calcTotalInterest(monthlyPayment, numMonths, principal) {
    /**
    * Calculate the Total Interest Paid
    * @param {string} monthlyPayment 
    * @param {number} numMonths 
    * @param {number} principal 
    * @return {float}
    */ 
    return ((monthlyPayment * numMonths ) - principal).toFixed(2);
  }
  calcMonthlyPayment(principal, toPower, interest) {
    /**
    * Calculate the Monthly Payment
    * @param {string} principal 
    * @param {number} toPower 
    * @param {string} interest 
    * @return {float}
    */ 
    return (( principal * toPower * interest ) / ( toPower -1)).toFixed(2);
  }

  calcTotalLoanAmt(numMonths, monthlyPayment) {
    /**
    * Calculate the Total Loan Amount
    * @param {number} numMonths 
    * @param {string} monthlyPayment 
    * @return {float}
    */ 
    return (numMonths * monthlyPayment).toFixed(2);
  }

  calcLoanResults(formValue) {
    /**
    * Parent function that calls the calcTotal functions to get the 
    * results from the loan form fields.
    * @param {obj} formValue 
    * @return {obj}
    */ 
    const principal = parseFloat( formValue.price - formValue.downPayment );
    const interest = parseFloat( formValue.interestRate / 100 / 12 );
    const numMonths = parseFloat( formValue.duration );
    const toPower = Math.pow( 1 + interest, numMonths );
    const monthlyPayment = this.calcMonthlyPayment(principal, toPower, interest);
    const totalLoanAmt = this.calcTotalLoanAmt(numMonths, monthlyPayment);
    const totalInterest = this.calcTotalInterest(monthlyPayment, numMonths, principal);
    const totalPrincipal = this.calcTotalPrincipal(totalLoanAmt, totalInterest);

    return {
      monthlyPayment: monthlyPayment,
      totalLoanAmt: totalLoanAmt,
      totalPrincipal: totalPrincipal,
      totalInterest: totalInterest
    }
  }

  setLoanResults() {
    /**
    * Sets the state of the Loan Results
    * @return {function} setState()
    */ 
    const loanResults = this.calcLoanResults(this.state.formValue);
    const monthlyPayment = loanResults.monthlyPayment;
    const totalInterest = loanResults.totalInterest;
    const totalPrincipal = loanResults.totalPrincipal;
    const totalLoanAmt = loanResults.totalLoanAmt;
    const duration = this.state.formValue.duration;
    const amortizationResults = this.calcAmortizationResults(totalPrincipal, totalInterest, duration, monthlyPayment);

    this.setState({
      results: {
        monthlyPayment: monthlyPayment,
        totalLoanAmt: totalLoanAmt,
        totalPrincipal: totalPrincipal,
        totalInterest: totalInterest
      }, 
      amortization: {
        resultsArray: amortizationResults,
        isHidden: false
      }
    });
  }

  calcAmortizationResults(totalPrincipal, totalInterest, duration, monthlyPayment) {
    /**
    * Calculates the Amortization values
    * Formula from:  https://m.wikihow.com/Calculate-Amortization
    * @param {string} totalPrincipal 
    * @param {string} totalInterest 
    * @param {string} duration 
    * @param {string} monthlyPayment 
    * @return {array} amortizationArray
    */
    const interestRate = this.state.formValue.interestRate / 100 / 12;

    let principal = totalPrincipal;
    let payThisMuch = parseFloat(monthlyPayment);
    let interestPayment = principal * interestRate;
    let principalPayment = payThisMuch - interestPayment;
    let endingPrincipal = principal - principalPayment;
    let amortizationArray = [];

    for (let i=0; i<duration; i++) {

      if (monthlyPayment > endingPrincipal) {
        payThisMuch = endingPrincipal;
        principalPayment = payThisMuch - interestPayment;
        endingPrincipal = 0;
      } else {
        interestPayment = principal * interestRate;
        principalPayment = payThisMuch - interestPayment;
        endingPrincipal = principal - principalPayment;
      }

      principal = endingPrincipal;

      let amortizationMonth = {
        monthlyPayment: payThisMuch.toFixed(2),
        principalPaid: principal.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        endingPrincipal: endingPrincipal.toFixed(2)
      };

      amortizationArray.push(amortizationMonth);
    }

    return amortizationArray;
  }

  formCallback = (formValues) => {
    /**
    * Parent callback function called by child component, LoanForm
    * @param {obj} formValues 
    * @return {function} setState()
    * @return {function} setLoanResults()
    */
    this.setState({
     formValue: formValues
    }, function() {
     this.setLoanResults()
    });
  }

  render() {
    const formResults = this.state.results;
    const amortizationTable = this.state.amortization;

    return (
      <div>    
        <LoanForm parentCallback={this.formCallback} />
        <LoanResults results={formResults}/>
        <LoanAmortization table={amortizationTable}/>
      </div>
    )
  }
}

export default LoanCalculator;
