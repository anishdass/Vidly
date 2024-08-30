import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pages from "./common/pages";
import Paginate from "../utils/paginate";
import FilterBox from "./common/filterbox";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id != movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      currentGenre,
      movies: allMovies,
      genres,
    } = this.state;
    const filtered =
      currentGenre != "All Genres"
        ? allMovies.filter((m) => m.genre.name == currentGenre)
        : allMovies;
    const paginatedMovies = Paginate(filtered, currentPage, pageSize);

    if (filtered.count == 0) return <p>There are no movies in the database</p>;

    return (
      <div className='row'>
        <div className='col-3'>
          <FilterBox
            genres={genres}
            currentGenre={currentGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className='col'>
          <p>Showing {paginatedMovies.length} movies in the database.</p>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className='btn btn-danger btn-sm'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pages
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
