import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CharacterCard = ({ pokemonUrl }) => {
  const [types,setTypes] = useState([]); 
  const [pokemon, setPokemon] = useState("aaaaaaaaaaaaaaa");
  const [pokemondata, setPokemondata] = useState({});
  const [image, setImage] = useState(""); 
  const [basehealth,setBasehealth]=useState("");
  const [attack,setAttack]=useState("");
  const [defense,setDefense]=useState("");
  const [speed,setSpeed]=useState("");
  const [id,setId]=useState(1);
  const [color,setColor]=useState("red");
  /*console.log("URL");
  console.log(pokemonUrl);
  console.log(pokemonUrl[34]);
  console.log(pokemonUrl[35]);
  console.log(parseInt(pokemonUrl[34]+pokemonUrl[35]));*/
  useEffect(() => {
    axios.get(pokemonUrl)
    .then((res) => {
      console.log(res.data)
      setPokemondata(res.data)
      setId(res.data.id)
      setPokemon(res.data.name)
      setTypes(res.data.types)
      console.log(res.data.types[0].type.name)
      setImage(res.data.sprites.other.dream_world.front_default); //sprites.other.dream_world.front_default)
      setBasehealth(res.data.stats[5].base_stat)
      setAttack(res.data.stats[4].base_stat)
      setDefense(res.data.stats[3].base_stat)
      setSpeed(res.data.stats[0].base_stat)
      
    });
    
  }, [pokemonUrl]);
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((res) => {
      console.log("Species")
      console.log(res.data.color.name)
      if(res.data.color.name=="green")setColor("rgb(72,208,176)")
      else if(res.data.color.name=="red")setColor("rgb(251,108,108)")
      else if(res.data.color.name=="blue")setColor("rgb(112,183,250)")
      else if(res.data.color.name=="brown")setColor("rgb(115,81,89)")
      else if(res.data.color.name=="yellow")setColor("rgb(255,235,59)")
      else if(res.data.color.name=="purple")setColor("rgb(91,45,134)")
      else if(res.data.color.name=="white")setColor("rgb(139,195,74)")
      else setColor(res.data.color.name)
    });
    
  }, [pokemon]);
  
  
  //setTypes(pokemon.types);
  //console.log("característica");
  //console.log(pokemon.types[0]);
  return (
    <li className="ol" style={{backgroundColor : `${color}`}}>
      <Link to={`/characters/${pokemondata.id}`} className="character-card">
      <div>
       <h3>{pokemon[0].toUpperCase() + pokemon.substring(1)}</h3><br/>
      <p>Type: </p>
      {types.map((type) => (
          <p key={type.type.name}>{type.type.name},</p>
      ))}<br/>
      <p>Base health: {basehealth}</p><br/>
      <p>Attack: {attack}</p> <br/>
      <p>Defense: {defense}  </p><br/>
      <p>Speed: {speed}  </p> 
      <br/> 
      </div>   
      <img id="imgcharactercard" src={image} alt="" />  
      </Link>
    </li>
  );
};

export default CharacterCard;
//<h3>{pokemon.forms[0].name}</h3><img src={character.image} alt="" />{/*//usar bascksticks*/}