import { createContext, useEffect, useState } from 'react';
export const PockContext = createContext();

const ContextProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [loadPokemon] = useState('https://pokeapi.co/api/v2/pokemon?limit=150&offset=20')
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [loading , setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('');
  const [clonepokemon , setClonepokemon] = useState([]);

  const fliterfun = (val) => {// function call select box it is on Header component to get selected value
    if(val == 'All Pokemons'){
      setLoading(true);
      setSearchValue('');
    }else{
      setSearchValue(val);
      setCurrentPage(1) 
    }
    
  }

  const searchfun = (val) => {
    setSearchValue(val)
  }

 
  // get all pokemons for ui based on the name i got it from getAllPokemons call
  const createPokemonObject = (results) => {
    // filter the array of pokemon names based on select box
   const filtredPokemon =  results.filter((ele) => {
      if (searchValue.trim() == '') {
        return ele
      } else if (ele.name.toLowerCase().includes(searchValue.trim().toLowerCase())) {
        return ele;
      }
    })
    // map on fitered data if i done
    filtredPokemon.map(async pokemon => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      const data = await res.json();
      // get the data in pokemons to use it for ui cards
       setPokemons(list => [...list , data]);
      //  cloned the data for select box maping 
       setClonepokemon(list => [...list , data]);
       setLoading(false);

    })
  }

  // get all pokemons name from the api to use it on 'createPokemonObject' api call
  const getAllPokemons = async () => {
    try {
      const res = await fetch(loadPokemon)
      const data = await res.json();
      createPokemonObject(data.results);
    } catch (error) {
      console.log(error.message)
    }
  }

  
  useEffect(() => {
    // clear all data from pokemons state
    setPokemons([]);
    // call the request
    getAllPokemons();
  }, [searchValue]);

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemons.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const [singlepoke, setSinglepoke] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [numberOfGame, setNumberOfGame] = useState([]);
  const [image, setImage] = useState(null);

  const fetchSinglePost = (name) => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(singlepoke => {
          return singlepoke.json()
        })
        .then(data => {
          // console.log(data)
          setSinglepoke(data)
          setPokemonType(data.types[0].type.name)
          setNumberOfGame(data.game_indices)
          setImage(data.sprites["front_default"])
        })
    } catch (error) {
      log(error.message)
    }
  }

  return (
    <>
        <PockContext.Provider value={{
        currentPosts,
        postsPerPage,
        pokemons,
        paginate,
        singlepoke,
        pokemonType,
        numberOfGame,
        image,
        fetchSinglePost,
        fliterfun,
        searchValue,
        clonepokemon,
        loading,
        searchfun
      }}>

        {children}
      </PockContext.Provider>
    </>
  )
}

export default ContextProvider;