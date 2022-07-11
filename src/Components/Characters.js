import axios from "axios";
import "./Characters.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CharacterCard from "./CharacterCard";

const Characters = () => {
  const userName = useSelector((state) => state.userName);
  const navigate = useNavigate();

  const [link,setLink]=useState("");
  const [offset,setOffset]=useState(0);
  const [array,setArray] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [limit, setLimit] = useState(10);
  const [characterName,setCharacterName]=useState("");
  const [blocktype, setBlocktype] = useState([]);
  const [nummber,setNummber]=useState([0]);
  const [pokemonsnumber, setPokemonsnumber] = useState(0);
  const [pagesnumber,setPagesnumber] = useState(0);
  useEffect(() =>{
    setArray([1,2,3,4,5,6]);
    setNummber(0);
  }, []);
 
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)//poner más pokemons
      .then((res) => {
        setPokemons(res.data.results)
        setPokemonsnumber(1126)
        setPagesnumber((1126/limit)+1);
      }
      );
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => setTypes(res.data.results));
  }, [offset]);

 
  const part = (nummber) => {
    nummber=(nummber-1)*10;
    axios.get(link).then((res) => setPokemons(res.data.pokemon.slice(nummber,nummber + limit)));

  }

  const changearray= (retroceder) => {
    const arraydos=array;
    if (retroceder){
      if(arraydos[0]!=1)
      {
        for (var i = 0; i < 6; i++) {
          arraydos[i]=arraydos[i] - 6
        }
        setArray(arraydos);
        const number= (array[0]-1)*10;
        if(pokemons[0].url) setOffset(number);
        else 
        {
          part(arraydos[0]);
        }
      }
      
    }
    else{
      for (var i = 0; i < 6; i++) {
          arraydos[i]=arraydos[i] + 6
        }
      if(arraydos[0]<=1126/limit)//COMPLETAR
      {
        setArray(arraydos);
        const number= (array[0]-1)*10;
        
        if(pokemons[0].url) setOffset(number);
        else 
        {
          part(arraydos[0]);
        }
        
        console.log("arraydos");
        console.log(arraydos);
      }
      
    }
    
    
  }

  const convertnumber = (number) => {
   
    number=(number-1)*10;
    setOffset(number);
    console.log("ddddd");
    console.log(number);
    
  };

  const submit = (e) => {
    e.preventDefault();
    // En la pokedex, esto funcionará
    navigate(`/characters/${characterName}`);
  };

  const handleLocation = (e) => {
    // e.target.value es la url de la location
    axios.get(e.target.value).then((res) => {
      setPokemons(res.data.pokemon.slice(0,limit))
      setLink(e.target.value);
      setArray([1,2,3,4,5,6]);
      setPokemonsnumber(res.data.pokemon.length);
      setPagesnumber(((res.data.pokemon.length)/limit)+1)
    });
    //setPokemons     .pokemon.url
    //console.log("blocktype");
    //console.log(blocktype);
    //setPokemons(blocktype);
    
  };
console.log("Pages number");
console.log(pagesnumber);
console.log("offset");
console.log(offset);

  return (
    <div className="Characters">
      <h1 id="pokedex">Pokedex</h1>
      <p className="welcome-message">Welcome {userName}!, here you can find your favorite pokemon</p>

      <div className="select">
        <select onChange={handleLocation}>
          {types.map((type) => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
       
      <form className="input-container" onSubmit={submit}>
        <label htmlFor="character-name">Busca por nombre</label>
        <input
          type="text"
          id="character-name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Pokémon name/id..."
        />
        <button>Buscar</button>
      </form>
      <ul className="pokemons-list">
        
        {  
          pokemons.map((pokemon,index) => (
            
            <CharacterCard
              // en la pokedex, la condición es diferente
              pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))}
          
        </ul>
        <div className="Pagination">{/*arreglar */}
            { 
              array[0] !=1 ? <button class="button" onClick={() =>changearray(true)}>
                  &laquo;
                </button>: null}
                {/*arreglar linea de abajom*/}
             {array[0]>=pagesnumber ? null :<button class="button" style={{backgroundColor: array[0]-1 === offset/10 ? "hsl(144, 48%, 60%)" : "hsl(233, 61%, 64%)" }}  onClick={() =>{
              pokemons[0].url ? convertnumber(array[0]) : part(array[0]);
              }}>
              {array[0]}
            </button>}
            {array[1]>=pagesnumber ? null :<button  class="button" style={{backgroundColor: array[1]-1 === offset/10 ? "hsl(144, 48%, 60%)" : "hsl(233, 61%, 64%)"}} onClick={() =>{
              pokemons[0].url ? convertnumber(array[1]) : part(array[1]);
              console.log(offset);
              }}>
              {array[1]}
            </button>}
            {array[2]>=pagesnumber ? null : <button class="button" style={{backgroundColor: array[2]-1 === offset/10 ? "hsl(144, 48%, 60%)" : "hsl(233, 61%, 64%)"}} onClick={() =>{
              pokemons[0].url ? convertnumber(array[2]) : part(array[2])
              }}>
              {array[2]}
            </button>}
            {array[3]>=pagesnumber? null :<button class="button" style={{backgroundColor: array[3]-1 === offset/10 ? "hsl(144, 48%, 60%)" : "hsl(233, 61%, 64%)"}} onClick={() =>{
              pokemons[0].url ? convertnumber(array[3]) : part(array[3])
              }}>
              {array[3]}
            </button> }
            {array[4]>=pagesnumber ? null :<button class="button" style={{backgroundColor: array[4]-1 === offset/10 ? "hsl(144, 48%, 60%)" : "hsl(233, 61%, 64%)"}} onClick={() =>{
              pokemons[0].url ? convertnumber(array[4]) : part(array[4])
              }}>
              {array[4]}
            </button>}
            {array[5]>=pagesnumber ?null :<button class="button" style={{backgroundColor: array[5]-1 === offset/10 ? "hsl(144, 48%, 60%)" : "hsl(233, 61%, 64%)"}} onClick={() =>{
              pokemons[0].url ? convertnumber(array[5]) : part(array[5])
              }}>
              {array[5]}
            </button>}
            
            {array[5]<pagesnumber ? <button class="button" onClick={() =>changearray(false)}>
              &raquo;
            </button> : null}
            
        </div>
        </div>
        );
};

export default Characters;
