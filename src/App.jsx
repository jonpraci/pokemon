import './App.css'
import Footer from './Components/Layout/Footer';
import Pagination from './Components/Paginate';
import PokemonList from './Pages/PockemonList';

function App() {
  return (
    <>
    <div className="container-fluid app_wrapper">
    <PokemonList />
    <Pagination  />
  </div>
  <Footer />
  </>
  )
}

export default App
