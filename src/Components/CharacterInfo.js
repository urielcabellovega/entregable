import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterInfo = () => {
  const { id } = useParams();
  const [moves,setMoves]=useState([])
  const [abties,setAbties]=useState([]);
  const [types,setTypes] = useState([]); 
  const [pokemon, setPokemon] = useState("");
  const [pokemondata, setPokemondata] = useState({});
  const [color, setColor] = useState();
  const [color2, setColor2] = useState("");
  const [image, setImage] = useState(""); 
  const [basehealth,setBasehealth]=useState("");
  const [attack,setAttack]=useState("");
  const [defense,setDefense]=useState("");
  const [speed,setSpeed]=useState("")

    useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => {
      console.log("res.data")
      console.log(res.data)
      setMoves(res.data.moves)
      setAbties(res.data.abilities)
      setPokemondata(res.data)
      setPokemon(res.data.name)
      setTypes(res.data.types)
      setImage(res.data.sprites.other.dream_world.front_default); //sprites.other.dream_world.front_default)
      setBasehealth(res.data.stats[5].base_stat)
      setAttack(res.data.stats[4].base_stat)
      setDefense(res.data.stats[3].base_stat)
      setSpeed(res.data.stats[0].base_stat)
      
    });
  }, [id]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((res) => {
      console.log("Species")
      console.log(res.data)
      console.log(res.data.color.name)
      if(res.data.color.name=="green")setColor("rgb(72,208,176)")
      else if(res.data.color.name=="red")setColor("rgb(251,108,108)")
      else if(res.data.color.name=="blue")setColor("rgb(112,183,250)")
      else if(res.data.color.name=="brown")setColor("rgb(115,81,89)")
      else if(res.data.color.name=="yellow")setColor("rgb(255,235,59)")
      else if(res.data.color.name=="purple")setColor("rgb(91,45,134)")
      else setColor(res.data.color.name)
    });
    
  },);

  const Color = () =>{
    console.log("LC");
    var color;
    for (var type in types) {
      console.log(`${type} ${types[type].type.name}`);
      if(types[type].type.name==='grass') color="red";
      console.log("DDDDD" + color );//arreglar
      return(<span key={types[type].type.name}>{types[type].type.name}</span>)
      
    //if(type =='normal')
      //color =´blue´
    /*case 'fighting':
      return 'https://cdn2.bulbagarden.net/upload/6/67/FightingIC_Big.png';
    case 'flying':
      return 'https://cdn2.bulbagarden.net/upload/c/cb/FlyingIC_Big.png';
    case 'poison':
      return 'https://cdn2.bulbagarden.net/upload/3/3d/PoisonIC_Big.png';
    case 'ground':
      return 'https://cdn2.bulbagarden.net/upload/8/8f/GroundIC_Big.png';
    case 'rock':
      return 'https://cdn2.bulbagarden.net/upload/c/ce/RockIC_Big.png';
    case 'bug':
      return 'https://cdn2.bulbagarden.net/upload/c/c8/BugIC_Big.png';
    case 'ghost':
      return 'https://cdn2.bulbagarden.net/upload/7/73/GhostIC_Big.png';
    case 'steel':
      return 'https://cdn2.bulbagarden.net/upload/d/d4/SteelIC_Big.png';
    case 'fire':
      return 'https://cdn2.bulbagarden.net/upload/2/26/FireIC_Big.png';
    case 'water':
      return 'https://cdn2.bulbagarden.net/upload/5/56/WaterIC_Big.png';
    case 'grass':
      return 'https://cdn2.bulbagarden.net/upload/7/74/GrassIC_Big.png';
    case 'electric':
      return 'https://cdn2.bulbagarden.net/upload/4/4a/ElectricIC_Big.png';
    case 'psychic':
      return 'https://cdn2.bulbagarden.net/upload/6/60/PsychicIC_Big.png';
    case 'ice':
      return 'https://cdn2.bulbagarden.net/upload/6/6f/IceIC_Big.png';
    case 'dragon':
      return 'https://cdn2.bulbagarden.net/upload/4/48/DragonIC_Big.png';
    case 'dark':
      return 'https://cdn2.bulbagarden.net/upload/5/56/DarkIC_Big.png';
    case 'fairy':
      return 'https://cdn2.bulbagarden.net/upload/d/df/Picross_FairyIC.png';
    default:
      return 'https://cdn2.bulbagarden.net/upload/3/3c/UnknownIC_Big.png';
  ))*/
    }
  }
  //console.log(abties);
  return (
    <div id="characterinfo" style={{backgroundColor : `${color}`}}>
      <div id="cont1">
      <div id="maininfo">
          
          <img id='pokemonimg'src={image} alt="" />
          <br/>
          <h2>{pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</h2>
          <h3>Height: {pokemondata.height}</h3>
          <h3>#{pokemondata.id}</h3>
          <h3>Weight: {pokemondata.weight}</h3>

      </div>
      <div id="cont2">
      <div id="type">
        <h2>Type: </h2>
        {Color()}
      </div>
      <div id="abilities">
          <h2>Abilities: </h2>
          {abties.map((abilityy) => (
            <span key={abilityy.ability.name}>{abilityy.ability.name}  </span>
          ))}
      </div>
      </div>
      <div id="statbase">
        <h3>Stats Base</h3>
        <p>Base health: {basehealth}</p>
        <p>Attack: {attack}</p> 
        <p>Defense: {defense}  </p>
        <p>Speed: {speed}  </p> 
          </div>
      </div>
      <div id="movements">
        <br/>
        <h2>Moves</h2>    
        {moves.map((movee) => (
            <p key={movee.move.name}>{movee.move.name} </p> 
          ))} 
        <br/>
      </div>
    </div>
  );
};

export default CharacterInfo;

/*<div id="movements">
        <h2>Moves</h2>    
        {moves.map((movee) => (
            <p key={movee.move.name}>{movee.move.name} </p> 
          ))} 
      </div>*/