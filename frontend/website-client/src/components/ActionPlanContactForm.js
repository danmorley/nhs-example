import React, { Component } from 'react';
import classNames from 'classnames';
import './action-plan-form.css';

const APF_KEY = 'apf_contact';
class ActionPlanContactForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      requiredChecked: false,
      showSection: true,
      username: '',
      email: '',
      postcode: '',
      optActionPlan: false,
      optOneYou: false
		};
    
    this.showConfirmation = this.showConfirmation.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}
  
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

     this.setState({
       [name]: value
     });
  }
  
  showConfirmation(e) {  
    let form = document.querySelector('#ap-form');
    
    if (form.checkValidity()) {      
      e.preventDefault() ;
      let items = {
        "name": this.state.username, 
        "email": this.state.email, 
        "postcode": this.state.postcode,
        "optActionPlan": this.state.optActionPlan,
        "optOneYou": this.state.optOneYou
      };
      
      sessionStorage.setItem(APF_KEY, JSON.stringify(items));
      
      this.setState(prevState => ({
        showSection: !prevState.showSection
      }))
    }
  }
  
  render() {
    return ( 
      <div className="actionplan-form">
        <form id="ap-form" className={classNames({"actionplan-form__page-closed":!this.state.showSection})}>
          <section className="actionplan-form__field-section">    
            <h2 className="actionplan-form__header">
              YOUR ACTION PLAN
            </h2>
            <div className="row">
              <div className="col-sm-6">
                <p>
                  <label className="actionplan-form__label" htmlFor="username">NAME</label>
                  <input required onChange={this.handleChange} value={this.state.username} className="actionplan-form__input" type="text" name="username" id="username" placeholder="Enter first name" />
                </p>
              </div>
              <div className="col-sm-6">
                <p>
                  <label className="actionplan-form__label" htmlFor="email">EMAIL ADDRESS</label>
                  <input required type="email" onChange={this.handleChange} value={this.state.email}  className="actionplan-form__input" name="email" id="email" placeholder="Enter email" />
                </p>
              </div>
              <div className="col-sm-6">
                <p>
                  <label className="actionplan-form__label" htmlFor="postcode">POSTCODE</label>
                  <input onChange={this.handleChange} value={this.state.postcode} className="actionplan-form__input" type="text" name="postcode" id="postcode" placeholder="Enter postcode" />
                </p>
              </div>     
            </div>     
          </section>
          
          <section className="actionplan-form__opt-section">
            <div className="row">
              <div className="col-sm-6 actionplan-form__opt-section-col">
                <input onChange={this.handleChange} checked={this.state.optActionPlan} className="actionplan-form__checkbox" id="option1" type="checkbox" name="optActionPlan" />
                <label htmlFor="option1">Opt in <span></span></label>
                <p>
                  to receive action plan and reminders via email
                </p>
              </div>
              <div className="col-sm-6 actionplan-form__opt-section-col">
                <input onChange={this.handleChange} checked={this.state.optOneYou} type="checkbox" className="actionplan-form__checkbox" id="optOneYou" name="optOneYou" />
                <label htmlFor="optOneYou">Opt in <span></span></label>
                <p>
                  to receive emails from One You
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="actionplan-form__opt-section-text"> 
                  Welcome to our website. If you continue to browse and use this website, you are agreeing 
                  to comply with and be bound by the following terms and conditions of use, which together with
                  our privacy policy govern GOV.co.uk{"'"}s relationship with you in relation to this website.  
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col push-right">
                <button className="button-cta" type="submit" disabled={!this.state.optActionPlan} onClick={this.showConfirmation} ><span>Confirm</span></button>
              </div>
            </div>
          </section>
        </form>
        
        {/* Confirmation section - hidden until Confirm button is clicked */}
        
        <div className={classNames({"actionplan-form__page-closed":this.state.showSection})}>
          <section className="actionplan-form__thankyou-content">   
            <h2>THANK YOU FOR YOUR DETAILS</h2>
            <h3>PLEASE CHECK YOUR INBOX FOR YOUR ACTION PLAN</h3>
          </section>
          <section className="actionplan-form__thankyou-footer">         
          </section>  
        </div>
      </div>
    )
  } 
}

export default ActionPlanContactForm;