import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pages from "./common/pages";
import Paginate from "../utils/paginate";
import FilterBox from "./common/filterbox";
import MoviesTable from "./moviestable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { saveMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  handleAddMovies = () => {
    console.log(this.state.movies);
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (likedMovie) => {
    const movies = this.state.movies.map((movie) =>
      movie._id === likedMovie._id
        ? { ...likedMovie, liked: !movie.liked }
        : movie
    );
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, currentGenre, movies, sortColumn } =
      this.state;

    const filteredMovies =
      currentGenre !== "All Genres"
        ? movies.filter((m) => m.genre.name === currentGenre)
        : movies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const paginatedMovies = Paginate(sortedMovies, currentPage, pageSize);

    return { paginatedMovies, totalCount: filteredMovies.length };
  };

  render() {
    const { movies, pageSize, currentPage, currentGenre, sortColumn, genres } =
      this.state;

    const { paginatedMovies, totalCount } = this.getPagedData();

    if (movies.length === 0) return <p>There are no movies in the database.</p>;

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
          <Link
            to='/movies/new'
            className='btn btn-primary button-spacing no-underline'>
            Add new movie
          </Link>
          <p>Showing {paginatedMovies.length} movies in the database.</p>
          <MoviesTable
            movies={paginatedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pages
            itemsCount={totalCount}
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
