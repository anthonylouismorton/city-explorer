import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import '../App.css';


export default class City extends Component {

  render() {
    console.log(this.props.map)
    return(
      <>
      <Col>
        <Card>
          <Card.Title>City Information</Card.Title>
          <Card.Subtitle>City Info: {this.props.location.display_name}</Card.Subtitle>
          <Card.Body>
          <Card.Img src={this.props.map}/>
          </Card.Body>
          <Card.Text>Lat: {this.props.location.lat} Lon: {this.props.location.lon}</Card.Text>
        </Card>
      </Col>
      </>
    )
  }
}