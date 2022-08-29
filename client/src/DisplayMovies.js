import { gql, useQuery } from '@apollo/client';

function DisplayMovies() {
  const GET_ALL_MOVIES = gql`
    query getAllMovies {
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
    </div>
  );
}

export default DisplayMovies;
