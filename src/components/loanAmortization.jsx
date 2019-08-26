import React from 'react';

class LoanAmortization extends React.Component {
  renderTableRows(array) {
    /**
    * Render Loam Amortization Table rows
    * @param {array} array 
    * @return {string} num
    */  
    return array.map( (rowObj, index) => {
      let month = index + 1;

      return (
          <tr key={index}>
            <td className="month column">{month}</td>
            <td className="monthly-payment column">$ {rowObj.monthlyPayment}</td>
            <td className="interest-payment column">$ {rowObj.interestPayment}</td> 
            <td className="principal-payment column">$ {rowObj.principalPayment}</td>
            <td className="principal-left column">$ {rowObj.endingPrincipal}</td>
          </tr>
        )
    });
  }

  render() {
    const hiddenClass = this.props.table.isHidden ? "hide" : "show";
    const amortizationArray = this.props.table.resultsArray;

    return (
      <div className={`loan-table-container component ${hiddenClass}`}>
        <table className="table table-condensced table-bordered">
          <thead>
            <tr>
              <th className="month column">Month</th>
              <th>Monthly Payment</th> 
              <th>Interest Payment</th> 
              <th>Principal Payment</th>
              <th>Principal Left</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows(amortizationArray)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default LoanAmortization;
