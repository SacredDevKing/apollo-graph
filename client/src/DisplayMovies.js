import { useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

function DisplayMovies() {
  const [movieSearch, setMovieSearch] = useState('');

  const GET_ALL_MOVIES = gql`
    query GetAllMovies {
      movies {
        id
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
    query GetMovie($title: String!) {
      movie(title: $title) {
        title
        releaseYear
        genre
        awards
        language
      }
    }
  `;

  const [fetchMovie, { data: movieSearchData }] =
    useLazyQuery(GET_MOVIE_BY_TITLE);
  const { error, loading, data } = useQuery(GET_ALL_MOVIES);

  if (error) return 'Something went wrong';
  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>MOVIES LIST</h1>
      {data.movies.map((movie) => {
        return (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Year: {movie.releaseYear}</p>
            <p>Year: {movie.releaseYear}</p>
            <p>Genre: {movie.genre}</p>
            <p>Awards: {movie.awards}</p>
            <p>Language(s): {movie.language}</p>
          </div>
        );
      })}

      <div>
        <input
          type='text'
          placeholder='Interstellar...'
          onChange={(e) => setMovieSearch(e.target.value)}
        />
        {/* Send graphQL variables */}
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                title: movieSearch,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>MovieName: {movieSearchData.movie.title}</h1>
              <h1>Release Year: {movieSearchData.movie.releaseYear}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayMovies;
