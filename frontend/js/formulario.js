window.onload = () => {

    let query = new URLSearchParams(location.search);
    let id = query.get('id');

    let $ = id => document.getElementById(id);

    if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
        $('favorites').style.display = 'none';
      } else {
        $('favorites').style.display = 'inline';
      }

        // const titulo = document.createElement("h1");
        // titulo.textContent = "Editar Pelicula";
        // titulo.setAttribute("class", "main");

        const apiCall = async (id) => {
            try {
              let response = await fetch("http://localhost:3031/api/movies/" + id);
              let pelicula = await response.json();
            
              console.log(pelicula);  
              let data = pelicula.data;
        
              $('title').value = data.title;
              $('rating').value = data.rating;
              $('awards').value = data.awards;
              $('release_date').value = moment(data.release_date).format('YYYY-MM-DD');
              $('length').value = data.length;

            
            } catch(error) {
              console.log(error);
            }
          };                
      
      
            $('botonEditar').addEventListener('click', () => {
              let updatedData = {
                  title: $('title').value,
                  rating: $('rating').value,
                  awards: $('awards').value,
                  release_date: $('release_date').value,
                  length: $('length').value
              }
      
              let config = {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedData)
              }
      
              fetch('http://localhost:3031/api/movies/update/' + id, config).then(respuesta => {
                  return respuesta.json()
              }).then(info => {
                  console.log(info)
                  alert("Pelicula editada con éxito")     
              }).catch(error => console.log(error))
          })

            $('botonCrear').addEventListener('click', () => {
              let createData = {
                  title: $('title').value,
                  rating: $('rating').value,
                  awards: $('awards').value,
                  release_date: $('release_date').value,
                  length: $('length').value
              }
      
              let config = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(createData)
              }
      
              fetch('http://localhost:3031/api/movies/create', config).then(respuesta => {
                  return respuesta.json()
              }).then(info => {
                  console.log(info)
                  alert("Pelicula guardada con éxito")
              }).catch(error => console.log(error))
          })
      
          $('botonEliminar').addEventListener('click', () => {
              let deleteMovie = confirm('¿Está seguro de eliminar esta película?');
      
              if (deleteMovie) {
                  let config = {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }
      
                  fetch('http://localhost:3031/api/movies/delete/' + id, config).then(respuesta => {
                      return respuesta.json()
                  }).then(info => {
                      console.log(info)
                      alert("Pelicula eliminada con éxito")
                  }).catch(error => console.log(error))
              }      
          });    
         apiCall(id);  
};