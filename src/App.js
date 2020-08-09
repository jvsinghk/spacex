import React, {Component} from 'react';

class App extends Component {

  constructor(props){   
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }

  }

  componentDidMount() {
      fetch("https://api.spacexdata.com/v3/launches?limit=100")
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(`received data:`, json);
          this.setState({
            isLoaded: true,
            items: json
          });
        });
    }

  render() {

        var { isLoaded, items } = this.state;

        if(!isLoaded){
           return <div>Loading...</div>;
        }

        else {

          return (
          <div className="App">
            
            <ul>
              {items.map(item => { 
console.log(item.rocket.first_stage.cores[0].land_success);
return (
                  <li key={item.flight_number}>
                      Flight Number: {item.flight_number} |
                      Mission Id: {item.mission_id} | 
                      Mission Name: {item.mission_name} | 
                      Launch Year: {item.launch_year} | 
                      Successful Launch: {item.launch_success ? "true" : "false"} |
                      Successful Landing: {item.rocket.first_stage.cores[0].land_success ? "true" : "false"} |
                      Image : <img src={item.links.mission_patch_small} alt="mission patch"/>
                  </li>
              ); } )}
            </ul> 

          </div>
        );
        }
        
    }
}

export default App;
