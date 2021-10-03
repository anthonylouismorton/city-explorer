import { Component } from 'react';
import Weatherday from './Weatherday';

export default class Forecast extends Component{
  render() {
    return (
        <Weatherday weather={this.props.weather}/>

    );
  }
}