import React from "react";

//Parent: MoviesTable
const Like = (data) => {
  let classes = "fa fa-heart";
  if (!data.liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={data.onClick}
      className={classes}
      aria-hidden='true'></i>
  );
};

export default Like;
