import React, { Component } from "react";
import {ErrorFile} from "./ErrorFile"


class RegisterForm extends Component {
    constructor () {
        super();
        this.state = {
          firstName:'',
          lastName:'',
          zipCode:'',
          email: '',
          userName:'',
          password: '',
          confirmPassword:'',
          formErrors: {email:true, userName: true, password: true, confirmPassword:true},
          emailValid: null,
          userNameValid:null,
          passwordValid: null,
          cnfpwdValid:null,
          valid: false
         
        }
      }
    
      handleUserInput = (event) =>{
          var inputName = event.target.name;
          var inputValue = event.target.value;
          this.setState({[inputName]:inputValue},
            () => {this.validateField(inputName, inputValue)})
        
      }
       isEmailValid(emailAdress) {
        var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
        return EMAIL_REGEXP.test(emailAdress)
    }
    isValidUserName=(name)=>(name.match(/^([a-z][A-Z]+)$/i)?true:false);
   
    isValidPassword=(password)=>(password.match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)?true:false)
   
      validateField(inputName, inputValue) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let userNameValid = this.state.userNameValid;
        let passwordValid = this.state.passwordValid;
        let cnfpwdValid = this.state.cnfpwdValid;

       switch(inputName) {
          
            case 'email':
            emailValid = this.isEmailValid(inputValue);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
          
            break;
            case 'userName':
            userNameValid=this.isValidUserName(inputValue)
            fieldValidationErrors.userName = userNameValid ? '' : ' is invalid it has to contain only alphabets and minimum length must be greater than 1';
            
            break;
          case 'password':
            passwordValid =this.isValidPassword(inputValue)
            if(passwordValid)
            {
              fieldValidationErrors.password=passwordValid
              passwordValid=true
            }
            else
            {
              fieldValidationErrors.password = 'Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit ';
              passwordValid=false;
            }
           
          break;
          case 'confirmPassword':
          if(this.state.confirmPassword ===  this.state.password)
          {
          fieldValidationErrors.confirmPassword =  '';
          cnfpwdValid=true;
          }
          else{
            fieldValidationErrors.confirmPassword =  ' is not match';
            cnfpwdValid=false;
          }
          
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        userNameValid: userNameValid,
                        passwordValid: passwordValid,
                        cnfpwdValid: cnfpwdValid

                      }, this.validateForm);

                      
      }
      validateForm() {
        var x=this.state.emailValid && this.state.userNameValid && this.state.passwordValid && this.state.cnfpwdValid
        this.setState({ valid : x });
      }
    
      
      handleSubmit= ()=>{
        alert('Sucessfully registered')

      }
  render() {
    return (
      <div>
        <form name="registerForm" onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <p>Join the community and improve your game with <b> ANGULAR </b></p>

          <fieldset>
          <div className="input-container">
		    	<i className="fa fa-user iconPos"></i>
          <input type="text" 
          placeholder="First Name"
          id="name" name="firstName"
          ref="firstName"
          value={this.state.firstName}
          onChange={this.handleUserInput}
          />
            </div>

            <div className="input-container">
			      <i className="fa fa-user iconPos"></i>
            <input type="text" id="lastName" 
            name="lastName" 
            placeholder="Last Name"
            ref="lastName"
            value={this.state.lastName}
            onChange={this.handleUserInput}
            
            />
            </div>
            <div className="input-container">
			      <i className="fa fa-map-marker iconPos"></i>
            <input type="password"
             id="zipCode"
            name="zipCode"
            placeholder="Zip Code"
            ref="zipCode"
            value={this.state.zipCode}  
            onChange={this.handleUserInput}
               />
            </div>
            <div className="input-container">
			      <i className="fa fa-envelope iconPos"></i>
            <input type="email" id="email"
             name="email" placeholder="Email"
             ref="email" value={this.state.email}
             onChange={this.handleUserInput} required
             className={(this.state.emailValid!==null &&!this.state.emailValid )? "error" : ""}

             />
            </div>
            <div className="input-container">
		      	<i className="fa fa-user iconPos"></i>
            <input type="text" id="userName"
             name="userName" placeholder="UserName"
             ref="userName" value={this.state.userName} 
             onChange={this.handleUserInput} required
            className={(this.state.userNameValid!==null&&!this.state.userNameValid)? "error" : ""}

                          />
            </div>
            <div className="input-container">
		      	<i className="fa fa-unlock iconPos"></i>
            <input type="password" id="password" 
            name="password" placeholder="Password"
            ref="password" value={this.state.password}
            onChange={this.handleUserInput} required
            className={(this.state.passwordValid!==null && !this.state.passwordValid)? "error" : ""}

            />
            </div>
            <div className="input-container">
            <i className="fa fa-lock iconPos"></i>
            <input type="password" id="confirmPassword"
             name="confirmPassword" placeholder="Confirm Password"
             ref="confirmPassword" value={this.state.confirmPassword}
             onChange={this.handleUserInput} required
             className={(this.state.cnfpwdValid!==null && !this.state.cnfpwdValid)? "error" : ""}
            />
            </div>
          </fieldset>
          <p>By registering you agree to our terms and privacy policy</p>
          <div >
          <ErrorFile formErrors={this.state.formErrors}  />
          </div>
          <button type="submit" disabled={!this.state.valid}>Sign Up</button>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
