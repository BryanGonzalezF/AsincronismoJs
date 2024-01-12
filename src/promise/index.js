const promise = new Promise(function (resolve, reject) {
  resolve('se logro');
});

const cow = 5; // --> valor inicial de las vacas

const countCows = new Promise(function (resolve, reject) {
  if (cow >= 10) {
    // --> solo si el numero de vacas es igual o mayor as 10, se llama el resolve
    resolve(`We have ${cow} cows on the farm`);
  } else {
    // --> de lo contrario se llama al reject
    reject('There is no cows on the farm');
  }
});

countCows
  .then((result) => {
    // --> con .then se obtiene el resultado de la promesa de acuerdo con el resolve
    console.log(result);
  })
  .catch((error) => {
    // --> con .catch podemos obtener la información de un futuro error que se presente
    console.log(error);
  })
  .finally(() => console.log('finally')); // --> con .finally podemos imprimir un mensaje que indica que ya se ejecutó la promesa

// Ejercicio

/* Enunciado
  
  En este desafío tienes la función delay la cual se espera que un tiempo específico retorne un mensaje

La función deberá recibir dos parámetros:

time: el tiempo de espera
message: el mensaje que debe imprimir después del tiempo de espera
La función delay debe retornar una promesa para poderlo usarlo de forma asíncrona.

Nota: Debes usar la función setTimeout con el namespace window para poder monitorear su uso en la ejecución de pruebas, ejemplo:


  */

function delay(time, message) {
  return new Promise(function (resolve, reject) {
    window.setTimeout(() => {
      resolve(message);
    }, time);
  });
}
