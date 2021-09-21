import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      map: null,
      error: false
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
    const url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12&size=1000x1000&format=jpeg`;

    const response2 = await axios.get(url2);
    
    const map = response2.config.url
    console.log(map)
    this.setState({
      map,
      
    });
    console.log(response2)
    
  }
  
  // showMap = async (event) => {
    

  //   const url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=15&size=500x500&format=jpeg`;

  //   const response2 = await axios.get(url2);
  //   const map = response2.data
    
  //   console.log(response2)
  //   this.setState({
  //     map
      
  //   });
    
  // }

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
        {/* <City location={this.state.location}/> */}
      <Container>
        {this.state.location.place_id &&
          <img src={this.state.map} alt="map"/>
        }
      </Container>
      <Container>
        {this.state.error &&
          <h2>{this.state.error}</h2>
        }
      </Container>
      </>
    )
  }
}
