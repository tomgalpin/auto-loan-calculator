import React from 'react';

class LoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      downPayment: "",
      duration: "",
      interestRate: "",
      isError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sendParentFormValues() {
    this.props.parentCallback(this.state)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  checkFormValues() {
    if (   
      this.state.price === "" ||
      this.state.downPayment === "" ||
      this.state.duration === "" ||
      this.state.interestRate === "" ||
      this.state.duration < 1 ||
      this.state.interestRate < 0.01
     ) {
      return true;
    } else {
      return false;
    }
  }

  triggerErrorMsg() {
    this.setState({
      isError: true
    })
  }

  hideErrorMsg() {
    this.setState({
      isError: false
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const isError = this.checkFormValues();

    if (isError) {
      this.triggerErrorMsg();
    } else {
      this.hideErrorMsg();
      this.sendParentFormValues();
    }
    
  }

  render() {
    const isError = this.state.isError ? "show-fast" : "hide-fast";

    return (
      <div className="loan-form-container component">
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="price">Price</label>
            <div className="form-container">
              <div className="symbol">$</div>
              <input 
                name="price" 
                type="number"
                min="0"
                max="100000" 
                value={this.state.price} 
                onChange={this.handleChange}/>
              </div>
          </div>
          <div className="input-container">
            <label htmlFor="downPayment">Down Payment</label>
            <div className="form-container">
              <div className="symbol">$</div>
              <input 
              name="downPayment" 
              type="number"
              min="0"
              max="100000" 
              value={this.state.downPayment} 
              onChange={this.handleChange}/>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="duration">Duration (Months)</label>
            <div className="form-container duration">
              <input 
              name="duration" 
              type="number"
              min="1"
              max="100000" 
              value={this.state.duration} 
              onChange={this.handleChange}/>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="interestRate">Interest Rate</label>
            <div className="form-container interest">
              <input 
              name="interestRate" 
              type="number"
              min="0"
              max="1000" 
              value={this.state.interestRate} 
              onChange={this.handleChange}/>
              <div className="symbol">%</div>
            </div>
          </div>
          <div className="input-container submit-button">
            <input type="submit" value="Calculate Loan" />
            <div className={`error-msg-container ${isError}`}>
              <p>Please make sure you have non-empty, valid numbers in your form fields.</p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoanForm;
