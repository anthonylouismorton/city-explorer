import { Component } from 'react';
import Movie from './Movie';

export default class Movies extends Component{
  render() {
    return (
        <Movie movie={this.props.movie}/>
    );
  }
}