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
              {items.map(item => (
                  <li key={item.flight_number}>
                      Mission Name: {item.mission_name} | Launch Year: {item.launch_year}
                  </li>
              ))}
            </ul>  

          </div>
        );
        }
        
    }
}

export default App;
