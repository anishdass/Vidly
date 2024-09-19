export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471810", name: "All Genres" },
  { _id: "5b21ca3eeb7f6fbccd471811", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471812", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471813", name: "Thriller" },
];

export function getGenres() {
  console.log(genres.filter((g) => g));
  return genres.filter((g) => g);
}
