import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiURL + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const { _id, ...body } = movie; // Destructure to exclude _id
    return http.put(`${apiEndpoint}/${_id}`, body); // Use template literal
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
