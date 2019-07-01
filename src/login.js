import React, {Component} from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

import axios from 'axios';

import {User} from './index';

class Login extends Component {
    constructor() {
        super();
        
        this.state = {
            email: '',
            password: '',
            loggedInUser: {}
        };
    };

    onChange = (e) => {
        let {name, value} = e.target;
        console.log(name, value)
        this.setState({[name]: value});
        console.log(this.state)
     };

     login = async() => {
         const {email, password} = this.state;
         //if these are not empty
        if (email && password) {
            let loggedInUser = await axios.post('/api/login', {email, password}).then(res=>res.data).catch(err=>console.log(err));
            this.setState({loggedInUser});
            //this is the user we are grabbing from the database, and you can now do whatever you want with the user information
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
            <h3 className="sidebar-title" style={{textAlign: 'center'}}>Login</h3>
        <div className="checkout-form">

                <div className="row">
                    <div className="col-xs-12">
                        <span>Email</span>
                        <input 
                            name="email"
                            type="text" 
                            placeholder="Your email here..."
                            onChange={(e)=>{this.onChange(e)}}
                        />
                    </div>
                    <div className="col-xs-12">
                        <span>Password</span>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="Your password here..."
                            onChange={(e)=>{this.onChange(e)}}
                        />
                    </div>
        <div className="col-xs-4 col-md-2">
            <button onClick={()=>this.login()}>Sign In</button>
        </div>
        </div>

        </div>
        </div>
        </div>
        </div>
        </div> 
            </div>}
            </User.Consumer>
        );
    };
};

export default Login;