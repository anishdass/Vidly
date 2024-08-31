import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pages from "./common/pages";
import Paginate from "../utils/paginate";
import FilterBox from "./common/filterbox";
import MoviesTable from "./moviestable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { by: "title", order: "asc" },
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
    this.setState({ currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;

    const {
      pageSize,
      currentPage,
      currentGenre,
      movies: allMovies,
      sortColumn,
      genres,
    } = this.state;

    const filteredMovies =
      currentGenre != "All Genres"
        ? allMovies.filter((m) => m.genre.name == currentGenre)
        : allMovies;

    console.log(sortColumn.by);
    console.log(sortColumn.order);
    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.by],
      [sortColumn.order]
    );
    console.log(sorted);

    const paginatedMovies = Paginate(sorted, currentPage, pageSize);

    if (sorted.count == 0) return <p>There are no movies in the database</p>;

    return (
      <div className='row'>
        <div className='col-3'>
          <FilterBox //Filterbox Section
            genres={genres}
            currentGenre={currentGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className='col'>
          <p>Showing {paginatedMovies.length} movies in the database.</p>
          <MoviesTable //MoviesTable Section
            movies={paginatedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pages //Pagination section
            itemsCount={filteredMovies.length}
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
