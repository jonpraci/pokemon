import {useContext} from 'react'
import { PockContext } from '../Context/PockemonContext';

const Pagination = () => {
    const { pokemons , paginate , postsPerPage }  = useContext(PockContext)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pokemons.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="navigation_wrapper">
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
             
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;