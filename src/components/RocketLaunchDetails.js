import React from 'react';
import { Card } from 'react-bootstrap';

function RocketLaunchDetails({ details }) {
    const { flight_number, mission_name, mission_id, launch_year, launch_success, links, rocket } = details;
    const imgSrc = links.mission_patch_small;
    const land_success = rocket.first_stage.cores[0].land_success;

    return (<Card style={{ width: '18rem' }}>
        <div key={flight_number}>
            <div>
                <img src={imgSrc} alt="mission patch" />
            </div>
            <div>
                {mission_name} #{flight_number}
            </div>
            <div>
                Mission Id: {mission_id}
            </div>
            <div>
                Launch Year: {launch_year}
            </div>
            <div>
                Successful Launch: {launch_success ? "true" : "false"}
            </div>
            <div>
                Successful Landing: {land_success ? "true" : "false"}
            </div>
        </div>
    </Card>);
}

export default RocketLaunchDetails;

