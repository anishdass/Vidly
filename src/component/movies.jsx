import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pages from "./common/pages";
import Paginate from "../utils/paginate";
import FilterBox from "./common/filterbox";
import MoviesTable from "./moviestable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
    searchString: "",
  };

  handleSearch = (query) => {
    this.setState({
      searchString: query.target.value,
      currentGenre: "All Genres",
      currentPage: 1,
    });
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

  getFilteredData = () => {
    const {
      pageSize,
      currentPage,
      currentGenre,
      movies,
      sortColumn,
      searchString,
    } = this.state;

    const searchedMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchString.toLowerCase())
    );

    const filteredMovies =
      currentGenre !== "All Genres"
        ? searchedMovies.filter((m) => m.genre.name === currentGenre)
        : searchedMovies;

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

    const { paginatedMovies, totalCount } = this.getFilteredData();

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

          <form
            className='d-flex'
            role='search'
            onSubmit={(e) => e.preventDefault()}>
            <input
              className='form-control me-2 rounded-pill'
              type='search'
              placeholder='Search a Film'
              aria-label='Search'
              onChange={this.handleSearch}
            />
          </form>

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
