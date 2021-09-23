import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default class LocationForm extends Component {
  formEvent = (event) =>{
    event.preventDefault();
    this.props.handleChange(event.target.value)
  }

  render() {
    return(
      <>
      <Form>
      <Form.Label>
        Enter a city name
      </Form.Label>
      <Form.Control onChange={this.formEvent} type="text" placeholder="city name"/>
      <Button onClick={this.props.getLocation} variant="primary" type="Submit">
        Explore!
      </Button>
      </Form>
      </>
    )
  }
}