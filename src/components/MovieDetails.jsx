

 
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CommentArea from "./CommentArea";

const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });

  const params = useParams();

  const navigate = useNavigate();

  //   const [hasError, setHasError] = useState(false)
  //   const [errorMsg, setErrorMsg] = useState('')
  
  

  const fetchMovie = async () => {
    try {
      const apiUrl = "http://www.omdbapi.com/?apikey=7cf04ae9&i=";
      const movieId = params.movieId;
      const fetchUrl = apiUrl + movieId;
      const re = await fetch(fetchUrl);
      if (!re.ok) {
        throw new Error("resp not ok " + re.status);
      }
      const movie = await re.json();
      setMovie(movie);
    } catch (error) {
      setError({ hasError: true, errorMsg: error.message });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <Container>
      {/* --------------------------------------------------------------------------- */}
      {/* Usare Alert qui mi da un errore per qualche motivo! */}
      {/* {this.state.hasError && <Alert variant="danger">Fetch error</Alert>} */}
      {/* --------------------------------------------------------------------------- */}
      {error.hasError && (error.errorMsg ? <p>{error.errorMsg}</p> : <p>Fetch error</p>)}
      {isLoading && <Spinner animation="border" style={{ color: "#E50914" }} />}
      {!movie && !error.hasError && !isLoading && <p>No movies found.</p>}
      {movie && (
        <>
          <h1 style={{ fontSize: "1.5rem" }}>{movie.Title}</h1>
          <p>{movie.Plot}</p>
          <CommentArea movieId={params.movieId} />
        </>
      )}
    </Container>
  );
};

export default MovieDetails;