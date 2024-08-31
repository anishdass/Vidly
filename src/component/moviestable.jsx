import React, { Component } from "react";
import TableHeader from "./common/tableheader";
import TableBody from "./common/tablebody";

class MoviesTable extends Component {
  columns = [
    { by: "title", label: "Title" },
    { by: "genre.name", label: "Genre" },
    { by: "numberInStock", label: "Stock" },
    { by: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    return (
      <table className='table'>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody movies={movies} onLike={onLike} onDelete={onDelete} />
      </table>
    );
  }
}

export default MoviesTable;
