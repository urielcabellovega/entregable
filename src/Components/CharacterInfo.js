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
    var colors = [];
    for (var type in types) {
      console.log(`${type} ${types[type].type.name}`);
      console.log("DDDDD" + color );
      
    switch(types[type].type.name){
    case 'normal'://
      colors[type]="rgb(115, 81, 89);";
      break;
    case 'fighting'://
      colors[type]="rgb(115, 81, 89)";
      break;
    case 'flying'://
      colors[type]="rgb(72, 103, 123)";
      break;
    case 'poison'://
      colors[type]="rgb(91,45,134)";
      break;
    case 'ground'://
      colors[type]="rgb(255, 235, 59)";
      break;
    case 'rock'://
      colors[type]="rgb(70, 24, 11)";
      break;
    case 'bug'://
      colors[type]="rgb(139, 195, 74)";
      break;
    case 'ghost'://
      colors[type]="rgb(49, 51, 106)";
      break;
    case 'steel':
      colors[type]="rgb(93, 115, 108)";///
      break;
    case 'fire'://
      colors[type]="rgb(251, 108, 108)";
      break;
    case 'water'://
      colors[type]="rgb(112, 183, 250)";
      break;
    case 'grass'://
      colors[type]="rgb(72, 208, 176)";
      break;
    case 'electric':
      colors[type]="rgb(226, 224, 45)";//
      break;
    case 'psychic':
      colors[type]="rgb(255, 235, 59)";//es igual
      break;
    case 'ice'://
      colors[type]="rgb(134, 210, 244)";
      break;
    case 'dragon'://
      colors[type]="rgb(68, 138, 148)";
      break;
    case 'dark'://
      colors[type]="rgb(3, 7, 6)";
      break;
    case 'fairy'://
      colors[type]="rgb(152, 24, 68)";
      break;
    default:
      colors[type]=Color;
  }

    }
    return(
      <>
        {
        types.map((type,index) => (
          <span id="type2" key={type.type.name} style={{backgroundColor : `${colors[index]}`}}>{type.type.name} </span>
        ))}
      </>       
      )
  }
  //console.log(abties);
  return (
    <div id="characterinfo" style={{backgroundColor : `${color}`}}>
      <div id="cont1">
      <div id="maininfo">
          
          <img id='pokemonimg'src={image} alt="" />
          
          <div id="maininfo1">

            <h3 className="up">{pokemondata.weight}<br/><span className="lcolor">Weight</span></h3>
            <div id="maininfo2">
              <h2>{pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</h2>
              <h3>#{pokemondata.id}</h3>
            </div>
            
            <h3 className="up">{pokemondata.height}<br/><span className="lcolor">Height</span></h3>
            
          </div>
          

      </div>
      <div id="cont2">
      <div id="type">
        <h2>Type: </h2>
        <div id="typee">
          {Color()}
        </div>
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
        <h2 id="titleh2">Movements</h2>    
        
        {moves.map((movee) => (
            <p id="moveees" key={movee.move.name}>{movee.move.name} </p> 
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