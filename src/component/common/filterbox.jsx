import React from 'react'

const FilterBox = (props) => {
  const { genres, currentGenre, onGenreChange } = props;
  return (
    <ul className='list-group'>
      {genres.map((genre) => (
        <li
          key={genre._id}
          onClick={() => onGenreChange(genre.name)}
          className={
            genre.name == currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default FilterBox;
