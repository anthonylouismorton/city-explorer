import 'bootstrap/dist/css/bootstrap.min.css';

import {Component} from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Forecast from './Forecast';
import LocationForm from './LocationForm'
import City from './City'
import Movie from './Movie'

let server = 'http://localhost:3005'

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      map: null,
      error: false,
      weather: [],
      movie: [],
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
    
    
    const url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=11&size=500x500&format=jpeg`;

    let mapData = await axios.get(url2);
    let renderMap = mapData.config.url
    this.setState({
      map: renderMap
      
    });

    let weatherURL=`${process.env.REACT_APP_SERVER_API_URL}/weather?searchQuery=${this.state.searchQuery}&lon=${this.state.location.lon}&lat=${this.state.location.lat}`

    const response2 = await axios.get(weatherURL);
    console.log(response2.data)
    this.setState({
      weather: response2.data
    });

    let movieURL=`${process.env.REACT_APP_SERVER_API_URL}/movies?searchQuery=${this.state.searchQuery}`
    const movieResponse = await axios.get(movieURL);
    console.log(movieResponse.data)
    this.setState({
      movie: movieResponse.data
    })
    }
    catch(error){
      this.setState({error: true})
    }
  }
  handleChange = (userSearchQuery) => {
    this.setState({searchQuery: userSearchQuery})
  }
  render(){
    return(
      <>
      <LocationForm handleChange={this.handleChange} searchQuery={this.state.searchQuery} location={this.state.location} getLocation={this.getLocation}/>
      {this.state.location.place_id &&
          <City map ={this.state.map} location={this.state.location}></City>
      }
      {this.state.location.place_id &&
      <Forecast weather={this.state.weather} />
      }
      {this.state.location.place_id &&
      <Movie movie={this.state.movie} />
      
      }
      <Container>
        {this.state.error &&
          <h2>{this.state.error}</h2>
        }
      </Container>
      
      </>
    )
  }
}
