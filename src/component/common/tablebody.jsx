import React, { Component } from "react";
import Like from "./like";

class TableBody extends Component {
  render() {
    return (
      <tbody>
        {this.props.movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                liked={movie.liked}
                onClick={() => this.props.onLike(movie)}
              />
            </td>
            <td>
              <button
                onClick={() => this.props.onDelete(movie)}
                className='btn btn-danger btn-sm'>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
