import { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import SingleMovie from "./SingleMovie";

class MainSection extends Component {
  state = {
    isLoading: true,
    hasError: false,
    movies: [],
    errorMsg: "",
  };
  fetchMovies = async () => {
    try {
      const seriesName = this.props.seriesName;
      const apiUrl = "http://www.omdbapi.com/?apikey=7cf04ae9&type=movie";
      const searchUrl = "&s=" + seriesName;
      const fetchUrl = apiUrl + searchUrl;
      const re = await fetch(fetchUrl);
      if (!re.ok) {
        throw new Error("resp not ok " + re.status);
      }
      const allMovies = await re.json();
      const movies = [];
      if (allMovies.Search) {
        const moviesFound = allMovies.Search.length;
        for (let i = 0; i < (moviesFound < 6 ? moviesFound : 6); i++) {
          movies.push(allMovies.Search[i]);
        }
        this.setState({ movies });
      }
    } catch (error) {
      this.setState({ hasError: true, errorMsg: error.message });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidMount() {
    this.fetchMovies();
  }
  render() {
    return (
      <section>
        <h4 style={{ fontSize: "1.5rem" }}>{this.props.seriesName}</h4>
        {/* --------------------------------------------------------------------------- */}
        {/* Usare Alert qui mi da un errore per qualche motivo! */}
        {/* {this.state.hasError && <Alert variant="danger">Fetch error</Alert>} */}
        {/* --------------------------------------------------------------------------- */}
        {this.state.hasError && (this.state.errorMsg ? <p>{this.state.errorMsg}</p> : <p>Fetch error</p>)}
        {this.state.isLoading && <Spinner animation="border" style={{ color: "#E50914" }} />}
        {this.state.movies.length === 0 && !this.state.hasError && !this.state.isLoading && <p>No movies found.</p>}
        <Container fluid>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 no-gutters text-center">
            {this.state.movies.map(movie => (
              <SingleMovie key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </Container>
      </section>
    );
  }
}

export default MainSection;