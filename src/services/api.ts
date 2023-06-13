//      ./src/services/api.ts

import axios from 'axios';

const baseURL = 'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/';

export const getMovies = () => axios.get(baseURL);
export const saveMovie = (id:string,movie:any) => axios.get(`${baseURL}/${id}`,movie);