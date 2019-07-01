import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

import axios from 'axios';
import { User } from '.';

class Account extends React.Component {
    constructor() {
        super();
        
        this.state = {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            passwordToConfirm: '',
            loggedInUser: {}
        };
    };

    onChange = (e) => {
        let {name, value} = e.target;
  
        this.setState({[name]: value});
     };

     register = async() => {
        const {username, email, first_name, last_name, password, passwordToConfirm} = this.state;

        //if the passwords and the confirm your passwords are matching and the username, first_name, last_name, and password are not empty, then create a call to our server.
        if (password === passwordToConfirm && username && first_name && last_name && password) {
            const user = await axios.post('/api/register', {username, email, first_name, last_name, password}).then(res=> res.data).catch(err=> console.log(err));
            this.setState({loggedInUser: user});
        } 
     };
    
     reroute = () => {
        this.props.history.push('/')
     };
     
    render() {
        return (
            <User.Consumer>
                {user=>
        <div>

            {this.state.loggedInUser ? (<>{user.setUser(this.state.loggedInUser)}</>) : (<></>)}
            {user.email ? (<>{this.reroute()}</>) : (<></>)}


      <div className="account-area ptb-70 bg-2">
              <div className="container">
              <div className="row">
              <div className="col-md-12 ">
              <h3 className="sidebar-title" style={{textAlign: 'center'}}>Register Your Account</h3>
          <div className="checkout-form">
              
              <div className="row">
              <div className="col-xs-6">
              <span>First Name <span className="star">*</span></span>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    name="first_name"
                    onChange={(e)=>{this.onChange(e)}}
                />
              </div>
              <div className="col-xs-6">
              <span>Last Name <span className="star">*</span></span>
          <input 
            type="text" 
            placeholder="Last Name" 
            name="last_name"
            onChange={(e)=>{this.onChange(e)}}
          />
              </div>
              <div className="col-xs-6">
              <span>Username <span className="star">*</span></span>
          <input 
            type="text" 
            placeholder="Your username here..." 
            name="username"
            onChange={(e)=>{this.onChange(e)}}
          />
              </div>
              <div className="col-xs-6">
              <span>Email Address <span className="star">*</span></span>
          <input 
            type="email" 
            placeholder="Your email here..." 
            name="email"
            onChange={(e)=>{this.onChange(e)}}
          />
              </div>
              <div className="col-xs-6">
              <span>Password <span className="star">*</span></span>
          <input 
            type="password" 
            placeholder="Your password here..." 
            name="password"
            onChange={(e)=>{this.onChange(e)}}
          />
              </div>
              <div className="col-xs-6">
              <span>Repeat Password <span className="star">*</span></span>
          <input 
            type="password" 
            placeholder="Your password here..." 
            name="passwordToConfirm"
            onChange={(e)=>{this.onChange(e)}}
          />
              </div>
              <div className=" col-md-2 col-xs-4">
              <button onClick={()=>this.register()}>Register</button>
              </div>
              </div>
              
              </div>
              </div>
              </div>
              </div>
              </div>
      
      </div>
      }
      </User.Consumer>
      );
    }
}

export default Account;
