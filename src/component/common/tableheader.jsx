import React, { Component } from "react";

class TableHeader extends Component {
  Sort = (by) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.by === by)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.by = by;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.by || column.key}
              onClick={() => this.Sort(column.by)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
