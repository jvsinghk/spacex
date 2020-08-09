import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import './App.css';

const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if ( this.state.filters[type] === value ) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }
 

  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(14).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    else {

      return (
        <div className="App">
          <h1 className="App-header">
            SpaceX Launch Programs
            </h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Filters</Card.Title>
                    <Card.Text className="header text-center">
                      Launch Year
                      <hr />
                    </Card.Text>

                    {uniqueLaunchYears.map(year => {
                      return <Button 
                        variant={ this.state.filters.launch_year === year.toString() ? "success" : "outline-success"} 
                        value={year} 
                        onClick={e => this.updateApiFilters('launch_year', e.target.value)}>
                        {year}
                         </Button>
                    })}

                    <Card.Text className="text-center">
                      Successful Launch
                      <hr />
                    </Card.Text>

                    <Button
                      variant={this.state.filters.launch_success === "true" ? "success" : "outline-success"}
                      onClick={e => this.updateApiFilters('launch_success', e.target.value)} value="true">
                      True
                    </Button>

                    <Button
                      variant={this.state.filters.launch_success === "false" ? "success" : "outline-success"}
                      onClick={e => this.updateApiFilters('launch_success', e.target.value)} value="false">
                      False
                    </Button>

                    <Card.Text className="text-center">
                      Successful Landing
                      <hr />
                    </Card.Text>

                    <Button 
                      variant={this.state.filters.land_success === "true" ? "success" : "outline-success"} 
                      onClick={e => this.updateApiFilters('land_success', e.target.value)} value="true">
                        True
                    </Button>
                    
                    <Button
                      variant={this.state.filters.land_success === "false" ? "success" : "outline-success"}
                      onClick={e => this.updateApiFilters('land_success', e.target.value)} value="false">
                      False
                    </Button>

                    </Card.Body>
                </Card>
              </Col>


              {data.map(details => {
                return (<Col xs={12} sm={12} md={3} lg={3}>
                  <RocketLaunchDetails details={details} />
                </Col>
                );
              })}

            </Row>
          </Container>
        </div>
      );
    }

  }
}

export default App;
