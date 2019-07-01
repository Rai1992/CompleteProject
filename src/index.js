import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import app from './app';
import account from './account';
import login from './login';
import about from './about';
import contact from './contact';

import MyAccounts from './Components/MyAccounts/MyAccounts';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export const User = React.createContext({});
const user = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordToConfirm: '',
    setUser: (loggedInUser) => {
        const {username, email, first_name, last_name} = loggedInUser;

        user.username = username;
        user.email = email;
        user.first_name = first_name;
        user.last_name = last_name;
       console.log(loggedInUser)
    },
    logOut: () => {
        user.username =  '';
        user.email =  '';
        user.first_name =  '';
        user.last_name =  '';
        user.password =  '';
        user.passwordToConfirm =  '';
    }
};

ReactDOM.render(
    <Router>
        <Switch>
            <User.Provider value={user}>
                
                <Route path="/" component={app} />
                <Route exact path="/account" component={account}/>
                <Route exact path="/login" component={login}/>
                <Route exact path="/Contact" component={contact} />
                <Route exact path="/About" component={about}/>
                <Route exact path="/myaccount" component={MyAccounts} />
            
            </User.Provider>
        </Switch>
    </Router>,
    document.getElementById('root')
);
