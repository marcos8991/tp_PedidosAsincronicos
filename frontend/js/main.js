window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let $ = id => document.getElementById(id);
  
  if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
    let favorites = [];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    $('favorites').style.display = 'none';
  } else {
    $('favorites').style.display = 'inline';
  }


  // Aqui debemos agregar nuestro fetch
  const apiCall = async () => {
    try {
      let response = await fetch("http://localhost:3031/api/movies");
      let peliculas = await response.json();
    
      console.log(peliculas);  

      // Codigo que debemos usar para mostrar los datos en el frontend
      let data = peliculas.data;

    data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const verMas = document.createElement("a");     
        verMas.textContent = "VER MAS"           
        verMas.setAttribute("class", "botonVerMas");
        verMas.href = ("formulario.html?id=" + movie.id)

        const star = document.createElement('button');
        star.innerHTML = '<i class="far fa-star"></i>'
        star.setAttribute("class", "favoritos");
        star.setAttribute("class", "botonVerMas");
        star.setAttribute("id", "favoritosOn" + movie.id);
        star.onclick = function () {
        $('favoritosOn' + movie.id).hidden = true;
        $('favoritosOff' + movie.id).hidden = false;
        const favorite = JSON.parse(localStorage.getItem('favorites'));
        favorite.push(movie.id);
        localStorage.setItem('favorites', JSON.stringify(favorite));
        console.log(favorite);
        $('favorites').style.display = 'inline';
      }

        const star2 = document.createElement('button');
        star2.innerHTML = '<i class="fas fa-star"></i>'
        star2.setAttribute("class", "favoritos");
        star2.setAttribute("class", "botonVerMas");
        star2.setAttribute("id", "favoritosOff" + movie.id);
        star2.hidden = true;
        star2.onclick = function () {
        $('favoritosOff' + movie.id).hidden = true;
        $('favoritosOn' + movie.id).hidden = false;
        const favorite = JSON.parse(localStorage.getItem('favorites'));
        let newFavorite = favorite.filter(fav => fav !== movie.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorite));
      }

      let favoritosOn = JSON.parse(localStorage.getItem('favorites'));

      if(favoritosOn.includes(movie.id)){
          star.hidden = true;
          star2.hidden = false;  
      }      

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(verMas);
        card.appendChild(star);
        card.appendChild(star2);
      });
    } catch(error) {
      console.log(error);
    }
  }; 
    apiCall();
};