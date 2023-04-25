
import "./Catalog.css"
import {useState} from "react";
import {useEffect} from "react";

fetch('https://itunes.apple.com/search?term=rock&limit=10')
  .then(response => response.json())
  .then(data => {
    console.log(data.results);
    // Store the data in state and render it in your component
  })
  .catch(error => {
    console.error(error);
  });

  function Catalog() {
    const [songs, setSongs] = useState([]);
  
    useEffect(() => {
      fetch('https://itunes.apple.com/search?term=rock&limit=10')
        .then(response => response.json())
        .then(data => {
          setSongs(data.results);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div class="catalog">
        <h1>Catalog</h1>
        <ul>
          {songs.map(song => (
            <li key={song.trackId}>
              <img src={song.artworkUrl100} alt={song.trackName} />
              <h2>{song.trackName}</h2>
              <p>{song.artistName}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default Catalog