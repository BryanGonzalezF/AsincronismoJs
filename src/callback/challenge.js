// llamado al XMLHttpRequest
const XMLHttpRequest = require('xmlhttprequest');

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
      }

      // algo falla nos devuelve null porque no se esta regresando ningún dato
    } else {
      const error = new Error('Error' + urlApi);
      return callback(error, null);
    }
  };
  xhttp.send();
}
