import React, { useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      title
      releaseYear
      genre
      awards
      language
    }
  }
`;

// Grab single movie query
const GET_MOVIE_BY_TITLE = gql`
  query Movie($title: String!) {
    movie(title: $title) {
      id
      title
      releaseYear
      genre
      awards
      language
    }
  }
`;

function DisplayMovies() {
  const [movieSearched, setMovieSearched] = useState('');
  const { error, loading, data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_TITLE);

  if (error) return 'Something went wrong';
  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return (
    <div>
      <label>Search for movie to get more info... </label>

      <input
        type='text'
        placeholder='Interstellar...'
        onChange={(event) => {
          setMovieSearched(event.target.value);
        }}
      />
      <button
        onClick={() => {
          fetchMovie({
            variables: {
              title: movieSearched,
            },
          });
        }}
      >
        Fetch Data
      </button>
      <div>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.title}</h1>
              <p>Release Year: {movieSearchedData.movie.releaseYear}</p>
              <p>Genre: {movieSearchedData.movie.genre}</p>
              <p>Awards: {movieSearchedData.movie.awards}</p>
              <p>Language(s): {movieSearchedData.movie.language}</p>
            </div>
          )}
          {movieError && <h1> There was an error fetching the data</h1>}
          <h1>All Movies</h1>
          {movieData &&
            movieData.movies.map((movie) => {
              return <h3 key={movie.id}>Movie Title: {movie.title}</h3>;
            })}
        </div>
      </div>
    </div>
  );
}

export default DisplayMovies;
