import React from 'react';
import Axios from 'axios';

const Listing = (props) => {
  const {
    available, 
    city, 
    condition,  
    list_id,
    list_name, 
    price, 
    seller,
    contact_info,
    user_email
  } = props;
  
  const removeListing = (id) => {
    Axios.delete(`/api/delete-listing/${id}`).catch(err=>console.log(err))
  };

  return (
    <section
      style={{
        width: '600px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid black',
        borderBottom: '0px solid black'
      }}
    >
      <span
        style={{
          margin: '5px'
        }}
      >{`${list_id}`}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>Name:</b> {`${list_name}`}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>Seller:</b> {`${seller}`}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>Condition:</b> {`${condition}`}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>Price:</b> 	&pound;{` ${price}`}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>City:</b> {`${city}`}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>Available:</b> {available ? (<>Yes</>) : (<>No</>)}</span>
      <span
        style={{
          margin: '5px'
        }}
      ><b>Seller Contact:</b> {`${contact_info}`}</span>
      <br />
      {user_email === contact_info ? (
        <button
        onClick={()=>{removeListing(list_id)}}
      >Delete</button>
      ) : (<></>)}
    </section>
  )
};

export default Listing;