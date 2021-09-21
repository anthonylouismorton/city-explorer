import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
    }
  }

  getLocation = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    const response = await axios.get(url);
    const location = response.data[0]
    this.setState({
      location,
     
  });
  }
  

  render(){
    return(
      <>
      <Form>
        <Form.Label>
          Enter a city name
        </Form.Label>
        <Form.Control onChange={(event) => this.setState({searchQuery: event.target.value})} type="text" placeholder="city name"/>
        <Button onClick={this.getLocation} variant="secondary" type="Submit">
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
      </>
    )
  }
}
