import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default class Movie extends Component{
  render() {
    return (
      <Container className="weatherReport">
        {this.props.movie.map( (movieData,idx) => 
          <Card key={idx}>
            <Card.Title>Movie: {movieData.title}</Card.Title>
            <Card.Text>Overview: {movieData.overview}</Card.Text>
            <Card.Text>Vote Average: {movieData.average_votes}</Card.Text>
            <Card.Text>Vote Count: {movieData.total_votes}</Card.Text>
            <Card.Text>Vote Popularity: {movieData.popularity}</Card.Text>
            <Card.Text>Released On: {movieData.released_on}</Card.Text>
            <Card.Img src={movieData.image_url}/>
          </Card>
        )}
     </Container>
    );
  }
}