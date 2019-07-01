import React, {Component} from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

class Contact extends Component {
    render() {
        return (
    <div>
        <div className="contact-area ptb-70 bg-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-wrap">
                            <h2 className="contact-title">Contact Us</h2>
                            <p>Email us if you have any questions or inquiries regarding our services or any issues you are facing and we will be happy to answer your questions and get your case resolved.</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <span><i className="fa fa-location-arrow" />Coventry</span>
                                </div>
                                <div className="col-md-6">
                                    <span><i className="fa fa-phone" />123 456-7890</span>
                                </div>
                                <div className="col-md-6">
                                    <span><i className="fa fa-envelope" />raib11@uni.coventry.ac.uk</span>
                                </div>
                                <div className="col-md-6">
                                    <span><i className="fa fa-clock-o" />24hrs Online Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* contact-area end*/}
    </div>
    )
        ;
    }
}

export default Contact;