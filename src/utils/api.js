import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzhkODJhNWJlMmI5ZWM3ODY1MjgwYTFlMjhkYTdkMyIsInN1YiI6IjY0OGE4OGE3NDJiZjAxMDBlNDljOTgwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._UQeFJXl8I1tiWc1tyI7n03QgDQQOaKAs4Hh9ANbtW0';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzhkODJhNWJlMmI5ZWM3ODY1MjgwYTFlMjhkYTdkMyIsInN1YiI6IjY0OGE4OGE3NDJiZjAxMDBlNDljOTgwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._UQeFJXl8I1tiWc1tyI7n03QgDQQOaKAs4Hh9ANbtW0',
  },
};
export const fetchDataFromApi = (url) => {
  const data = axios.get(BASE_URL + url, options);

  return data;
  //   fetch(BASE_URL + url, options)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response + 'ass'))
  //     .catch((err) => console.error(err));
};
