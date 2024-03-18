import { useMarvelContext } from './context/MarvelContext';
import { useMarvelCharactersEffect } from './hooks/UseEffect';
import { useNavbarRef } from './hooks/UseRef';
import {Nav} from './components/navbar'
import { Footer } from './components/footer';


export const App = () => {
  const { comics, currentPage, totalPages, setCurrentPage, comicsPerPage } = useMarvelContext();

  useMarvelCharactersEffect(); 
  
  const navRef = useNavbarRef();
  const startIndex = (currentPage - 1) * comicsPerPage;
  const endIndex = startIndex + comicsPerPage;
  const currentComics = comics.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollToNavbar();
  };
  
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setTimeout(scrollToNavbar, 100); // Agregar un retraso antes de desplazarse
  };
  
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setTimeout(scrollToNavbar, 100); // Agregar un retraso antes de desplazarse
  };

  const scrollToNavbar = () => {
    navRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
    <nav className="nav" ref={navRef}>
    <Nav/>
    </nav>
    <div className="app-container">
      <h2 className="title">Comics de Marvel</h2>
      <div className="comic-list">
        {comics.slice((currentPage - 1) * comicsPerPage, currentPage * comicsPerPage).map((comic) => (
          <div key={comic.id} className="comic-item" onClick={() => window.open(comic.urls[0].url, "_blank")}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <p>{comic.title}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};














