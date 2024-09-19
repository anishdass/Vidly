import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pages from "./common/pages";
import Paginate from "../utils/paginate";
import FilterBox from "./common/filterbox";
import MoviesTable from "./moviestable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { log } from "joi-browser";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
    searchString: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({
      movies,
      genres,
    });
  }

  handleSearch = ({ target: { value } }) => {
    this.setState({
      searchString: value,
      currentGenre: "All Genres",
      currentPage: 1,
    });
  };

  handleDelete = (movie) => {
    this.setState({
      movies: this.state.movies.filter((m) => m._id !== movie._id),
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie, liked: !movie.liked };
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
      movies,
      pageSize,
      currentPage,
      currentGenre,
      sortColumn,
      searchString,
    } = this.state;

    let filteredMovies = movies;

    if (searchString)
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().includes(searchString.toLowerCase())
      );

    if (currentGenre !== "All Genres")
      filteredMovies = filteredMovies.filter(
        (m) => m.genre.name === currentGenre
      );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedMovies = Paginate(sortedMovies, currentPage, pageSize);

    return { paginatedMovies, totalCount: filteredMovies.length };
  };

  render() {
    const { pageSize, currentPage, sortColumn, currentGenre, genres } =
      this.state;
    const { paginatedMovies, totalCount } = this.getFilteredData();

    if (totalCount === 0) return <p>There are no movies in the database.</p>;

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
          <p>Showing {totalCount} movies in the database.</p>

          <form className='d-flex mb-3' onSubmit={(e) => e.preventDefault()}>
            <input
              className='form-control me-2 rounded-pill'
              type='search'
              placeholder='Search a Film'
              value={this.state.searchString}
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
