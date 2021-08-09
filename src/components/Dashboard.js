import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Table,
    Button,
    InputGroup,
    FormControl,
} from 'react-bootstrap';
import MovieCard from "./MovieCard";
import Alert from "./Alert";
import { useUser } from 'reactfire'


export default (props) => {
    const [ tittle, setTittle ] = useState('');
    const [ response, setResponse ] = useState('');
    const [ error, setError  ] = useState('');
    const [ moviesList, setMoviesList ] = useState([]);
    const currentUser = useUser();

    const searchMovies = () => {
        axios(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&t=${tittle}`)
        .then(response => response.data).then(data => {
            console.log(data)
            if (data.Response === "True"){
                setResponse(data);
                setError('');
            } else {
                setError(data.Error);
                setResponse('');
            }
            
        }).catch(error => {
            setError(error);
        })
    }

    const getMovies = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BACKENDURL}getMovies`,
            params: {"user": currentUser.data.uid}
          })
          .then(response => {
            console.log(response.data);
            setMoviesList(response.data)
          })
          .catch(function (error) {
            setError(error);
          });
    }

    useEffect(() => {
        getMovies();
    }, []);
    
    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Seacrch: Batman"
                aria-label="Search movie"
                aria-describedby="basic-addon2"
                onChange={ (e) => setTittle(e.target.value) }

                />
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    onClick={searchMovies}>
                Search
                </Button>
            </InputGroup> 
            { response &&
                <MovieCard data={response}></MovieCard>
            }
            { error &&
                <Alert errorTitle="Not found" error={error}></Alert>
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Director</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moviesList.map((movie, index) =>{
                            return (
                                <tr key={movie._id}>
                                <td>{index+1}</td>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>
                                <td>{movie.director}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    );

}

