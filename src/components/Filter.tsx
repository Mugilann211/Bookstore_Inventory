import React from "react";

interface FilterProps {
  genres: string[];
  onFilterChange: (filter: { genre?: string; author?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ genres, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div>
      <select name="genre" onChange={handleChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <input name="author" placeholder="Filter by author" onChange={handleChange} />
    </div>
  );
};

export default Filter;