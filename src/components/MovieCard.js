import axios from "axios";
import React from "react";
import { useUser } from 'reactfire'

import {
    Button,
    Row,
    Card,
    Col,
    Badge,
    Container,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

export default (props) => {
    const currentUser = useUser();
    
    const addToFavs = () => {
        console.log(currentUser.data.uid)
        var data = {
            "user": currentUser.data.uid,
            "title": props.data.Title,
            "year": props.data.Title,
            "director": props.data.Director,
        }

        console.log(props)

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKENDURL}movies`,
            data: data
          })
          .then(function (response) {
            window.location.reload();

          })
          .catch(function (error) {
              console.log(error);
          });
    }

    return (
        <Container>
            <Card border="secondary" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.data.Poster} />
                <Card.Body>
                    <Card.Title>{props.data.Title} ({props.data.Year})</Card.Title>
                    <Row >
                        <Col xs lg="2" md lg sm={{ offset: .5 }}>
                        <Badge bg="secondary" text="dark">
                            {props.data.Rated}
                        </Badge>{' '}
                        </Col >
                        <Col xs lg="2" md lg sm={{ offset: 1.5 }}>
                            
                        <Badge bg="secondary" text="dark">
                        <b>IMDB Rate:</b> {props.data.imdbRating}
                        </Badge>{' '}
                        </Col>
                    </Row>
                    
                    <Card.Text>
                    {props.data.Plot}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><b>Cast:</b> {props.data.Actors}</ListGroupItem>
                    <ListGroupItem><b>Relased:</b> {props.data.Released}</ListGroupItem>
                    <ListGroupItem><b>Awards:</b> {props.data.Awards}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="outline-warning" onClick={addToFavs}>Add to favs</Button>{' '}
                </Card.Body>
            </Card>
        </Container>
    )                
}
