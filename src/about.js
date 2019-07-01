import React, {Component} from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div >

    <div className="mission-area mb-70">
            <div className="container">
            <div className="row">
            <div className="col-xs-12">
            <div className="tab-content">
            <div role="tabpanel" className="tab-pane active clear" id="vision">
            <div className="mission-content">
            <h2>About Us</h2>
        <p>Established on January 2019 in Coventry, we are a company focused on providing a safe and secure platform where our members can sell their items and buy what interests them. While other big companies charge fees on every succesful transaction that is made by their members, we do not believe that this is the best way to help our members. What we do believe in is helping our members get the best deals as well as the most money for their product. Therefore, we only charge the most minimal fee of £1per month and this is just to ensure we have enough revenue to keep this site up and running. All we ask in return is you do your business honestly.</p> 
        <p>Thank you</p>

        </div>
        <div className="mission-img">
            <img src="img/3.jpg"  />
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        {/* mission-area end */}
            </div>
        );
    }
}

export default About;