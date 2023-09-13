import { ListGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const CommentArea = props => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
 
  

  const fetchComments = async () => {
    try {
      const apiUrl = "https://striveschool-api.herokuapp.com/api/movies/";
      const movieId = props.movieId;
      const fetchUrl = apiUrl + movieId + "/comments";
      const re = await fetch(fetchUrl, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTkyZGMwMzRmZjAwMTQwM2Y0ZmUiLCJpYXQiOjE2OTQwODcyMzMsImV4cCI6MTY5NTI5NjgzM30.h3t3Ck-2duA_c0NU-bVjwedissVciuKWnFsJSrFYRM8",
        },
      });
      if (!re.ok) {
        throw new Error("resp not ok " + re.status);
      }
      const comments = await re.json();
      setComments(comments);
    } catch (error) {
        setError({ hasError: true, errorMsg: error.message });
        setError(prevError => ({
            ...prevError,
            hasError: true,
            errorMsg: error.message
          }));
          
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [props.movieId]);
  

  return (
    <div className="text-center">
      <h2>CommentArea</h2>
      {error.hasError && (error.errorMsg ? <p>{error.errorMsg}</p> : <p>Fetch error</p>)}
      {isLoading && <Spinner animation="border" style={{ color: "#E50914" }} />}
      {comments.length === 0 && !error.hasError && !isLoading && <p>No one reviewed this movie yet.</p>}
      {comments.length !== 0 && (
        <ListGroup>
          {comments.map(comment => {
            return <ListGroup.Item key={comment.elementId}>{comment.comment}</ListGroup.Item>;
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default CommentArea;