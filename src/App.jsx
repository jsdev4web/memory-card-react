import './App.css'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [img, setImg] = useState([])
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState([])
  const [best , setBest] = useState(0)


  //fetch 12 pokemon names
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results.map(p => p.name)) // Extract names
      });

  }, []);

  //fetch images for the pokeon
  useEffect(() => {
    pokemon.sort(() => Math.random() - .75) //every render it sorts
    if(pokemon.length > 0) { //run when names available
    Promise.all(  
      
    pokemon.map(name => 
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        
        .then(data => data.sprites.front_default) //extract the images url
        )
      ).then(images => {
        setImg(images); //set the arrary of URLs
        })
        

      }
    }, [pokemon]) //dependency on pokemon state
    
    
  //log results
  useEffect(() => {
    console.log(pokemon)
    console.log(img)
    console.log(clicked)
  }, [pokemon, img, clicked]) // log when name or images is updated

  const myRef = useRef(null)

  //I stopped here trying to click a div and reorder img and text together
  function handleClick(e){
    e.preventDefault();
    setCount(count + 1)
    console.log(e.target)




    img.sort(() => Math.random() - .75)
    setClicked([...clicked, e.target.src])



    console.log("clicked")

    clicked.forEach(function(item) {
      if (item === e.target.src){
        console.log("match")
        setCount(0)
        setClicked("")
      }
    })


    if(count > best){
      setBest(count)
    }
  }


 
      
  
  return (
    <>
      <div>Best Score So Far: {best}</div>
      <div>Pokemon Game Count: {count}</div>
      
        <div className='pokemon-cards'>
        {img.map((url, index) => (
          <div className="divs" onClick={handleClick}>
            <img key={index} className="pixels" src={url}  alt={`Pokemon ${index + 1}`}/>
            
          </div>
        ))} 

      </div>
    </>
  )

}

export default App
