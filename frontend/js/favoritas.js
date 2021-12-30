window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let $ = id => document.getElementById(id);
  
  // Aqui debemos agregar nuestro fetch
  if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
    $('favorites').style.display = 'none';
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const h1 = document.createElement("h1");
    h1.textContent = 'Aún no hay peliculas en favoritas';

    container.appendChild(card);
    card.appendChild(h1);
  } else {
    $('favorites').style.display = 'inline';
  } 

  const apiCall = async () => {
    try {
      let response = await fetch("http://localhost:3031/api/movies");
      let peliculas = await response.json();

      let favorites = JSON.parse(localStorage.getItem('favorites'));
      let data = peliculas.data.filter(movie => favorites.includes(movie.id));
      
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);     
    });

    } catch(error) {
      console.log(error);
    }
}; 
apiCall();
};