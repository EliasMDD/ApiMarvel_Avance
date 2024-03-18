// MarvelAPI.jsx

import axios from 'axios';
import md5 from 'md5';

const API_PUBLIC_KEY = '62d9d65d122d4ca1e5192ff39d201835';
const API_PRIVATE_KEY = '15906c3c145a59ccfdeaa6e3d55cdfca288d6797';
const API_BASE_URL = 'https://gateway.marvel.com/v1/public';

export const MarvelApi = async (offset, limit) => { // Recibimos el offset y el límite como parámetros
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);
  const response = await axios.get(`${API_BASE_URL}/comics`, {
    params: {
      apikey: API_PUBLIC_KEY,
      ts: timestamp,
      hash: hash,
      offset: offset, // Pasamos el offset
      limit: 80 // Pasamos el límite de cómics por página
    }
  });
  return response.data.data.results; // Devolvemos los cómics
};





