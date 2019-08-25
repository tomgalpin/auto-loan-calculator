import React from 'react';

class LoanAmortization extends React.Component {
  renderTableRows(array) {   
    return array.map( (rowObj, index) => {
      let month = index + 1;

      return (
          <tr key={index}>
            <td>{month}</td>
            <td>{rowObj.principalPaid}</td> 
            <td>{rowObj.principalPayment}</td>
            <td>{rowObj.endingPrincipal}</td>
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
              <th>Month</th>
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
