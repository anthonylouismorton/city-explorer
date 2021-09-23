import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';




export default class Forecast extends Component{
  render() {
    return (
      <Container className="weatherReport">
        {this.props.weather.map( (weatherData,idx) => {
          return(
          
          <div key={idx}>
            <Card.Title>{weatherData.datetime}</Card.Title>
            console.log(weatherData.datetime);
            <Card.Text>{weatherData.description}</Card.Text>
          </div>
          
          );
        })}
     </Container>
    );
  }
}