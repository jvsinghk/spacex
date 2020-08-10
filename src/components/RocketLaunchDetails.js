import React from 'react';
import { Card } from 'react-bootstrap';
import './RocketLaunchDetails.css'

function RocketLaunchDetails({ details }) {
    const { flight_number, mission_name, mission_id, launch_year, launch_success, links, rocket } = details;
    const imgSrc = links.mission_patch_small;
    const land_success = rocket.first_stage.cores[0].land_success;

    return (<Card className="Rocket-details-card">
        <div key={flight_number}>
            <div>
                <img src={imgSrc} alt="mission patch" className="Rocket-mission-image"/>
            </div>
            <div className="Rocket-mission-name-flight-number">
                {mission_name} #{flight_number}
            </div>
            <div className="Rocket-details-label">
                Mission Id: {mission_id}
            </div>
            <div className="Rocket-details-label">
                Launch Year: {launch_year}
            </div>
            <div className="Rocket-details-label">
                Successful Launch: {launch_success ? "true" : "false"}
            </div>
            <div className="Rocket-details-label">
                Successful Landing: {land_success ? "true" : "false"}
            </div>
        </div>
    </Card>);
}

export default RocketLaunchDetails;

