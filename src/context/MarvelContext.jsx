// MarvelContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';

const MarvelContext = createContext();

export const MarvelProvider = ({ children }) => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const comicsPerPage = 20; // Cantidad de cómics por página

  useEffect(() => {
    // Calcular el número total de páginas
    const totalPagesCount = Math.ceil(comics.length / comicsPerPage);
    setTotalPages(totalPagesCount);
  }, [comics]);

  return (
    <MarvelContext.Provider value={{ comics, setComics, currentPage, setCurrentPage, totalPages, setTotalPages, comicsPerPage }}>
      {children}
    </MarvelContext.Provider>
  );
};

export const useMarvelContext = () => useContext(MarvelContext);












