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
    return (totalLoanAmt - totalInterest).toFixed(2);
  }

  calcTotalInterest(monthlyPayment, numMonths, principal) {
    return ((monthlyPayment * numMonths ) - principal).toFixed(2);
  }
  calcMonthlyPayment(principal, toPower, interest) {
    return (( principal * toPower * interest ) / ( toPower -1)).toFixed(2);
  }

  calcTotalLoanAmt(numMonths, monthlyPayment) {
    return (numMonths * monthlyPayment).toFixed(2);
  }
  calcAmortInterest(monthlyPayment, principal) {
    return 
  }

  calcLoanResults(formValue) {
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
    const loanResults = this.calcLoanResults(this.state.formValue);
    const monthlyPayment = loanResults.monthlyPayment;
    const totalInterest = loanResults.totalInterest;
    const totalPrincipal = loanResults.totalPrincipal;
    const totalLoanAmt = loanResults.totalLoanAmt;
    const duration = this.state.formValue.duration;
    const amortizationResults = this.getAmortizationResults(totalPrincipal, totalInterest, duration, monthlyPayment);

    this.setState({
      results: {
        monthlyPayment: monthlyPayment,
        totalLoanAmt: totalLoanAmt,
        totalPrincipal: totalPrincipal,
        totalInterest: totalInterest
      }, 
      amortization: {
        resultsArray: amortizationResults,
        totalInterestPaid: "23",
        isHidden: false
      }
    });
  }

  getAmortizationResults(totalPrincipal, totalInterest, duration, monthlyPayment) {
    /**
      Formula from:  https://m.wikihow.com/Calculate-Amortization

      1. month
      2. principal (goes down)
      3. interest payment (goes down)
      4. principal payment (goes up)
      5. ending principal (goes down)

      calculate total interest paid at end of table

      2.  principal = totalPrincipal
      3.  interest payment = principal * (monthly interest rate)
      4.  principal payment = monthly payment - interest payment
      5.  ending principal = principal - principal payment 

    **/
    const interestRate = this.state.formValue.interestRate/ 12;

    // console.log(101, interestRate);

    let principal = totalPrincipal;
    let amortizationArray = [];

    for (let i=0; i<duration; i++) {
      // let monthsToGo = i + 1;
      let interestPayment = principal * interestRate;
      let principalPayment = monthlyPayment - interestPayment;
      let endingPrincipal = principal - principalPayment;

      principal = endingPrincipal;

      // console.log("interestpay:  ", interestPayment);
      // console.log("principalPayment:  ", principalPayment);
      // console.log("endingPrincipal:  ", endingPrincipal);
      // console.log("monthlyPayment:  ", monthlyPayment);

      let amortizationMonth = {
        // month: monthsToGo,
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
