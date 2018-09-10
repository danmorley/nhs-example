import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './action-plan-form.css';
import { signUpForActionPlan } from '../services/RequestHandler';

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
        "Firstname": this.state.username.split(' ')[0],
        "Lastname": this.state.username.split(' ')[0],
        "Email": this.state.email,
        "Postcode": this.state.postcode,
        "ActionPlanOptIn": this.state.optActionPlan,
        "OneYouEmailOptIn": this.state.optOneYou
      };
      
      sessionStorage.setItem(APF_KEY, JSON.stringify(items));

      let that = this;

      signUpForActionPlan()
        .then((response) => {
          that.setState(prevState => ({
            showSection: !prevState.showSection
          }))
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  
  render() {
    const tsAndCs = this.props.tsAndCs;
    const opt1 = this.props.opt1;
    const opt2 = this.props.opt2;
    
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
                  {opt1}
                </p>
              </div>
              <div className="col-sm-6 actionplan-form__opt-section-col">
                <input onChange={this.handleChange} checked={this.state.optOneYou} type="checkbox" className="actionplan-form__checkbox" id="optOneYou" name="optOneYou" />
                <label htmlFor="optOneYou">Opt in <span></span></label>
                <p>
                  {opt2}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="actionplan-form__opt-section-text"> 
                  {tsAndCs}
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

ActionPlanContactForm.propTypes = {
  opt1: PropTypes.string.isRequired,
  opt2: PropTypes.bool.isRequired,
  tsAndCs: PropTypes.bool.isRequired
};

export default ActionPlanContactForm;