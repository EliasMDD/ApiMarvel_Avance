// UseEffect.jsx

import { useEffect } from 'react';
import { MarvelApi } from '../actions/MarvelAPI';
import { useMarvelContext } from '../context/MarvelContext';

export const useMarvelCharactersEffect = () => {
  const { setComics, setCurrentPage, setTotalPages, comicsPerPage } = useMarvelContext();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const comicsData = await MarvelApi();
        setComics(comicsData); // Actualizar el estado de los cómics con los datos obtenidos de la API
        
        // Calcular el total de páginas
        const totalPages = Math.ceil(comicsData.length / comicsPerPage);
        setTotalPages(totalPages);

        setCurrentPage(1); // Restablecer la página actual después de cargar nuevos cómics
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    fetchComics();
  }, [setComics, setCurrentPage, setTotalPages, comicsPerPage]);
};







  