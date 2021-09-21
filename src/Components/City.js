import { Component } from 'react';

export default class City extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <>
      {this.props.location.map((location, idx) =>
        <Form.Text
          key = {idx}
          location = {this.state.location.display_name}
          lat = {this.state.location.lat}
          lon = {this.state.location.lon}
          />
        )};
      </>
    )
  }
}