import React from 'react';
import Listing from './listing';

import {Link} from 'react-router-dom';
import axios from 'axios';
import { User } from '.';

import './App.css';


function App(props) {
    const [listings, setListings] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(false);
    const [loggedOut, setLoggedOut] = React.useState(false);

    React.useEffect(()=>{
        fetchListings();
    });

    const fetchListings = async() => {
        if (listings.length > 0) {
            const data = await axios.get('/api/get-all-listings').then(res=>res.data);
            
            setListings([...data]);
            setFirstLoad(true);

        } else {
            const data = await axios.get('/api/get-all-listings').then(res=>res.data);
            if ([...listings] === [...data] && firstLoad) {
            } else {
                setListings([...data]);
                setFirstLoad(true)
            };
        };
    };

    const resetLoggedOut = () => {
        setLoggedOut(true);
        setTimeout(()=>{setLoggedOut(false)}, 250)
    };

    return (
        <User.Consumer>
        {user=>
    <div>
        <div>
        <header>
        <div className="header-bottom">
            <div className="container">
                <div className="row">
                <div className="col-md-3 col-xs-8">
                    <div className="logo">
                        <Link to="/"><img src="img/logo.png"  /></Link>
                    </div>
                </div>
                    <div className="col-md-9 hidden-sm hidden-xs">
                                <div className="mainmenu text-right">
                                <nav>

                            {user.email ? (
                                <ul id="navigation" style={{fontStyle: 'italic'}}>
                                <li><Link to="/">Home </Link></li>
                                <li><Link to="/myaccount">MyAccount</Link></li>
                                <li><Link to="/About">About Us</Link></li>
                                <li><Link to="/Contact">Contact Us</Link></li>
                                <li 
                                    className="sign-out"
                                    onClick={()=>{
                                        axios.delete('/api/logout').catch(err=>console.log(err))
                                        user.logOut()
                                        resetLoggedOut();
                                    }}    
                                >Sign out</li>

                            </ul>
                            ) : (
                                <ul id="navigation" style={{fontStyle: 'italic'}}>
                                <li><Link to="/">Home </Link></li>
                                <li><Link to="/myaccount">MyAccount</Link></li>
                                <li><Link to="/About">About Us</Link></li>
                                <li><Link to="/Contact">Contact Us</Link></li>
                                <li><Link to="/Account">Sign Up</Link></li>
                                <li><Link to ="/login" >Log In </Link> </li>
                            </ul>
                            )}

                            </nav>
                            </div>
                    </div>
                    <div className="col-xs-4 hidden-lg hidden-md">
                        <div className="responsive-menu-wrap floatright" />
                    </div>
                </div>
            </div>
        </div>
        </header>
        
        {props.history.location.pathname === '/' ? (
        <div
        style={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20vh'
        }}
        >
            <div
                style={{
                    width: 'fit-content',
                    borderBottom: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {listings.map(listing=> {
                    console.log(listing)
                    return (
                    <Listing 
                        key={listing.list_name}
                        list_id={listing.list_id}
                        list_name={listing.list_name}
                        seller={listing.seller}
                        condition={listing.condition}
                        price={listing.price}
                        city={listing.city}
                        available={listing.available}
                        contact_info={listing.contact_info}
                        user_email={user.email}
                    />
                )})}
            </div>
        </div>
        ) : (<>{console.log(props.history)}</>)}


        </div>
    </div>
    }
    </User.Consumer>
    );
}

export default App;