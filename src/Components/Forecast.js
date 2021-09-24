import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default class Forecast extends Component{
  render() {
    return (
      <Container className="weatherReport">
        {this.props.weather.map( (weatherData,idx) => 
          <Card className="weatherCards" key={idx}>
            <Card.Title>{weatherData.datetime}</Card.Title>
            <Card.Text>{weatherData.description}</Card.Text>
          </Card>
        )}
     </Container>
    );
  }
}