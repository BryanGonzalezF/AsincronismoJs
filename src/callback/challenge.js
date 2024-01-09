// llamado al XMLHttpRequest
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// API es en mayuscula porque es una referencia que no va a cambiar
const API = 'https://api.escuelajs.co/api/v1';

// urlApi: no confundir y colocar API
function fetchData(urlApi, callback) {
  // referencia a new XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // petición 'obtener' con true para habilitarlo
  xhttp.open('GET', urlApi, true);

  // escuchar diferentes estados de la solicitud y conocer cuando está disponible la información
  xhttp.onreadystatechange = function (event) {
    // si el estado es igual a 4 significa que ha sido completada la llamada
    if (xhttp.readyState === 4) {
      // 200 significa que el servidor respondio de forma correcta
      if (xhttp.status === 200) {
        /* dentro de xhttp..responseText recibimos lo que entrega el servidor
        en texto y se hace la transformacion a JSON
        */
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error('Error' + urlApi);
        return callback(error, null);
        // algo falla nos devuelve null porque no se esta regresando ningún dato
      }
    }
  };
  xhttp.send();
}

/* Se invoca el metodo fetchData() pasandole como argumentos la variable API concatenada con la cadena 'products' para acceder a la URL de la API deseada,
y una función anónima que recibe 2 párametros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API)
*/
fetchData(`${API}/products`, function (error1, data1) {
  if (error1) return console.error(error1); // se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error

  /* Se invoca de nuevo la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como párametro
  la url de la API apuntando al atributo del primer objeto de areglo data1 y nuevamente una función anónima
  */
  fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
    if (error2) return console.error(error2); // si en este punto se identifica un error se manda a imprimir y se detiene el proceso

    /* Se invoca nuevamente la función fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación
    'categories' y el atributo Id de categoria del objeto data2 de la funcion anterior

    -- en este caso puntial se hace uso de Optional Caining el cual hace una evaluación de las propiedades de un objeto y en vez de arrojar 
    un error devuelve undefined en caso de que la propiedad no exista o sea null

    -- igual que las anteriores se envia una funcion anónima con dos argumentos, un objeto de error y un objeto de datos
    */
    fetchData(
      `${API}/categories/${data2?.category?.id}`,
      function (error3, data3) {
        if (error3) return console.error(error3); // se valida si existe error, en caso de que exista se detiene el proceso y se imprime el error

        // Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en el metodo invocado inicialmente
        console.log(data1[0]);

        // Se imprime el titulo del objeto que se consultó en la sengunda invocación de la función
        console.log(data2.title);

        // Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó en la segunda invocación del método
        console.log(data3.name);
      }
    );
  });
});
