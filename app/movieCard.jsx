"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardText, Spinner } from 'react-bootstrap';

const MovieCard = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Failed to load movie data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div>
      {movieData && movieData.data.length > 0 ? (
        <div className="row">
          {movieData.data.map((movie, index) => (
            <div key={index} className="col-md-4">
              <Card className='bg-transparent text-white text-center movieImage'>
                <img className="card-img-top" src={movie.foto} alt={`Poster of ${movie.judul}`} />
                <div className='bg-dark p-2 m-1'>
                  <CardText>{movie.judul}</CardText>
                  <CardText>Rating: {movie.rating}</CardText>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No movies available.</p>
      )}
    </div>
  );
};

export default MovieCard;
