import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleMovie = props => {
  return (
    <div className={"col mb-2 px-1 d-flex flex-column"}>
      <div>
        {props.movie.Poster !== "N/A" ? (
          <img className="img-fluid object-fit-cover" src={props.movie.Poster} alt="movie poster" />
        ) : (
          <p className="h6 my-auto ">{props.movie.Title}</p>
        )}
      </div>
      <Link to={"/movie-details/" + props.movie.imdbID}>
        <Button variant="danger">Details</Button>
      </Link>
    </div>
  );
};

export default SingleMovie;