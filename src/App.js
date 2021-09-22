import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Forecast from './Components/Forecast';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      map: null,
      error: false,
      weather: ''
    }
  }

  getLocation = async (event) => {
    event.preventDefault();
    try{
    const url1 = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    const response = await axios.get(url1);

    const location = response.data[0]
    
    this.setState({
      location,
      error: false
    });
    }
    catch(error){
      this.setState({error: true})
      console.log(error)
    }
    const url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=11&size=500x500&format=jpeg`;

    await axios.get(url2);
    
    const map = url2
    
    this.setState({
      map,
      
    });
    const url3 = `http://localhost:3001/weather?searchQuery=${this.state.searchQuery}&lon=${this.state.location.lon}&lat=${this.state.location.lat}`;

    const response3 = await axios.get(url3);
    
    const weather = url3;
    console.log(response3)
    this.setState({
      weather: weather.data
    })
    
  }

  render(){
    return(
      <>
      <Form>
        <Form.Label>
          Enter a city name
        </Form.Label>
        <Form.Control onChange={(event) => this.setState({searchQuery: event.target.value})} type="text" placeholder="city name"/>
        <Button onClick={this.getLocation} variant="primary" type="Submit">
          Explore!
        </Button>
        {this.state.location.place_id &&
          <Form.Text> city: {this.state.location.display_name}</Form.Text>
        }
        {this.state.location.place_id &&
          <Form.Text> lat: {this.state.location.lat}</Form.Text>
        }
        {this.state.location.place_id &&
          <Form.Text> lon: {this.state.location.lon}</Form.Text>
        }
      </Form>
        {this.state.location.place_id &&
        <Container>
          <img src={this.state.map} alt="map"/>
        </Container>
        }
        {/* {this.state.location.place_id &&
        <Container>
          <img src={this.state.weather} alt="map"/>
        </Container>
        } */}
      
      <Container>
        {this.state.error &&
          <h2>an error occured</h2>
        }
      </Container>
      <Forecast />
      </>
    )
  }
}
