
// //busqueda de viajes Rudy
// document.getElementById('buscarTiquetes').addEventListener('click', function() {
//     const origen = 'Bogotá (BOG)';
//     const destino = 'Bucaramanga (BGA)';
//     const fechaSalida = '24 Abril 2024';
//     const fechaLlegada = '(opcional)';
//     const pasajeros = 1;

//     console.log("Realizando búsqueda de tiquetes con los siguientes datos:");
//     console.log("Origen:", origen);
//     console.log("Destino:", destino);
//     console.log("Fecha de Salida:", fechaSalida);
//     console.log("Fecha de Llegada:", fechaLlegada);
//     console.log("Pasajeros:", pasajeros);
//     document.getElementById('buscarTiquetes').addEventListener('click', function() {
//         const origen = document.getElementById('origen').value;
//         const destino = document.getElementById('destino').value;
//         const fechaSalida = document.getElementById('fechaSalida').value;
//         const pasajeros = document.getElementById('pasajeros').value;

//         const datosBusqueda = {
//             origen: origen,
//             destino: destino,
//             fechaSalida: fechaSalida,
//             pasajeros: pasajeros
//         };

//         fetch('https://ejemplo.com/buscarTiquetes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(datosBusqueda)
//         })
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('resultados').innerText = JSON.stringify(data);
//         })
//         .catch(error => {
//             console.error('Ha ocurrido un error:', error);
//         });
//     });

//pruebas

// async function getAccessToken() {
//     const clientId = 'QrAza9FwVp78wbGYyKyeEdxWwuaxGhSI';
//     const clientSecret = 'Wrax6AGD97hZs7ss';
  
//     const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         'grant_type': 'client_credentials',
//         'client_id': clientId,
//         'client_secret': clientSecret,
//       }),
//     });
  
//     const data = await response.json();
//     return data.access_token; // Devuelve el token
//   }
  
//   async function getFlightOffers() {
//     const accessToken = await getAccessToken();
//   true
//     const response = await fetch('https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=M7A25F95&adults=1&checkInDate=2024-11-22&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
  
//     const data = await response.json();
//     console.log(data); // Muestra la respuesta de la API en la consola
    
//     return data;
//   }
  
//   getFlightOffers();





// fetch('https://test.api.amadeus.com/v1/shopping/flight-dates?origin=NYC&destination=PAR&oneWay=false&nonStop=false', {
//     method: 'GET',
//     headers: {
//       'x-magicapi-key': 'cm33wbmpc0001mg034s38nj38',
//       'Content-Type': 'application/json'
    
//     }
// })
//   .then(response => response.json())
//   .then(result => console.log(result))
  
// Seccion Ofrtas y destinos 1er Parte




/////////////////////////////// pruebass  2  ///////////////////////////////////////////


   



   