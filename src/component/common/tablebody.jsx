import React, { Component } from "react";
import Like from "./like";

class TableBody extends Component {
  render() {
    return (
      <tbody>
        {this.props.data.map((item) => (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.genre.name}</td>
            <td>{item.numberInStock}</td>
            <td>{item.dailyRentalRate}</td>
            <td>
              <Like
                liked={item.liked}
                onClick={() => this.props.onLike(item)}
              />
            </td>
            <td>
              <button
                onClick={() => this.props.onDelete(item)}
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
