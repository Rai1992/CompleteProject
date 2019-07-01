import React from 'react';

import {BrowserRouter as Link} from 'react-router-dom';

import axios from 'axios';
import { User } from '../..';

function MyAccount() {
  const [list_name, setListName] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [available, setAvailable] = React.useState();
  const [city, setCity] = React.useState('');
  const [category, setCategory] = React.useState('');
  
  const addListing = async(email, username) => {
    //if a string is empty it will default to false when tested if true or not
    if (
      list_name &&
      condition &&
      city &&
      price &&
      username &&
      email &&
      category
    ) {
      await axios.post(
        '/api/create-listing',
        {
          list_name,
          condition,
          city,
          price,
          available: `${available}`,
          username, 
          email,
          category
        }).then(()=>{alert('Added!')}).catch(err=>alert(err));
    } else {
      alert('Leave None Empty')
    }
  };

  return (
    <User.Consumer>
      {user=>
      <div>

      <div className="account-area ptb-70 bg-2">
              <div className="container">
              <div className="row">
              <div className="col-md-12 ">
              <h3 className="sidebar-title" style={{textAlign: 'center'}}>Add a listing</h3>
          <div className="checkout-form">
              
              <div className="row">
              <div className="col-xs-6">
              <span>List Name<span className="star">*</span></span>
                <input 
                  placeholder="list name"
                  onChange={(e)=>{
                    setListName(e.target.value);
                  }}
                />
              </div>
              <div className="col-xs-6">
              <span>Condition<span className="star">*</span></span>
                <input 
                  placeholder="condition"
                  onChange={(e)=>{
                    setCondition(e.target.value);
                  }}
                />
              </div>
              <div className="col-xs-6">
              <span>Price<span className="star">*</span></span>
                <input
                  placeholder="price"
                  onChange={(e)=>{
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="col-xs-6">
              <span>City<span className="star">*</span></span>
                <input 
                  placeholder="City"
                  onChange={(e)=>{
                    setCity(e.target.value);
                  }}
                />
              </div>

              <div className="col-xs-6">
                  <span>Category<span className="star">*</span></span>
                  <input 
                    placeholder="category"
                    onChange={(e)=>{setCategory(e.target.value)}}
                  />
              </div>
              
              <div className="col-xs-6">
              <span>Availablity<span className="star">*</span></span>
                <input 
                  type="checkbox"
                  onChange={(e)=>{
                    setAvailable(e.target.checked);
                  }}
                  style={{
                    textAlign: 'center',
                    padding: '20px'
                  }}
                />
              </div>
              
      
              <div className=" col-md-2 col-xs-4">
              <button onClick={()=>addListing(user.email, user.username)}>Add Listing</button>
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
};

export default MyAccount;
/*



*/