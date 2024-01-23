import React, { useEffect, useState } from "react";
import axios from "axios";
import Characters from "./components/Characters";
import Register from "./pages/signUp/register";
import Login from "./pages/login/Login";
import Logo from "../public/Logo.png";
import NavBar from "./components/Navbar";

const App = () => {
  const [characters, setCharacters] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  //get Simpsons API data
  const getApiData = async () => {
    try {
      const results = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
      );
      results.data.forEach((item) => {
        item.uniqueId = Math.random();
      });
      setCharacters(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  //call the function for the api
  useEffect(() => {
    getApiData();
  }, []); //only runs once array dependency

  //DELETE FUNCTION
  const onDelete = (quote) => {
    const index = characters.findIndex((character) => {
      return character.quote === quote;
    });

    const _characters = [...characters];

    _characters.splice(index, 1);

    setCharacters(_characters);
  };

  //LIKE FUNCTION
  const onLikeToggle = (quote) => {
    const index = characters.findIndex((character) => {
      return character.quote === quote;
    });

    const _characters = [...characters];

    _characters[index].liked = !_characters[index].liked;

    setCharacters(_characters);
  };

  //SEARCH FUNCTION
  const onInput = (e) => {
    setSearchTerm(e.target.value);
  };

  //SORT FUNCTION
  const onSort = (e) => {
    setSortOrder(e.target.value);
  };

  //IF NO DATA SHOW LOADING
  if (!characters) return <h1>Characters Loading</h1>;

  //remove characters that are now in the search term
  const filtered = characters.filter((character) => {
    return character.character
      .toLowerCase()
      .includes(searchTerm ? searchTerm.toLowerCase() : "");
  });

  //calculate total likes
  let total = 0;
  filtered.forEach((character) => {
    if (character.liked) {
      total += 1;
    }
  });

  //sort the data
  if (sortOrder && sortOrder === "asc") {
    filtered.sort((item, nextItem) => {
      if (item.character > nextItem.character) return 1;
      if (item.character < nextItem.character) return -1;
      return 0;
    });
  } else if (sortOrder) {
    filtered.sort((item, nextItem) => {
      if (item.character > nextItem.character) return -1;
      if (item.character < nextItem.character) return 1;
      return 0;
    });
  }

  return (
    <>
      <div>
        <NavBar />
        <p>
          Welcome to the Simpsons App, please have a great time explroing, if
          you wish to add your own charcaters please sign up
        </p>
        <div>
          <img className="logo" src={Logo} alt="simpsons logo" />
        </div>
        <div className="herodiv">
          <h3>Total characters liked: {total}</h3>
          <button onClick={getApiData}>Get new data</button>
          <label htmlFor="filter">Filter: </label>
          <input id="filter" type="text" onInput={onInput} />
          <label htmlFor="sort">Sort</label>
          <select id="sort" onChange={onSort}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <Characters
        characters={filtered}
        onLikeToggle={onLikeToggle}
        onDelete={onDelete}
      />
      {mode === "login" ? <Login /> : mode === "sign up" ? <Register /> : <></>}
    </>
  );
};
export default App;
