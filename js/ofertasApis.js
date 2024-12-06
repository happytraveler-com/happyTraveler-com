// 1er Cards de ofertas sobre turismos y actividades
async function getAccessToken() {
    const clientId = '2zXUElxiKVaDoKtRzBX4jMXGBseQdU5a';
    const clientSecret = 'KRTOtpYIlF4C2lG4';
  
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': clientId,
        'client_secret': clientSecret,
      }),
    });
  
    const data = await response.json();
    return data.access_token; // Devuelve el token
  }
  
  async function getFlightOffers() {
    const accessToken = await getAccessToken();
  
    const response = await fetch('https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    // console.log(data); // Muestra la respuesta de la API en la consola
    const only99 = data.data.slice(0, 99);
    agregarActividades(only99); // Llamada a la función de agregar actividades
  }

 // getFlightOffers();

  
// Variables para la paginacion
let currentPage = 1;
const itemsPerPage = 3;
let totalPages = 0;
const actividades = []; // Lista de actividades validas

// Funcion para agregar actividades a la lista después de la verificacion
function agregarActividades(actividadesData) {
  actividadesData.forEach(actividad => {
    const { id, name, description, pictures: [imagenGet] } = actividad;

    // Validacion de campos
    if ([id, name, description, imagenGet].some(field => !field)) {
      return;
    }

    // Almacenar actividad si pasa la validacion
    actividades.push(actividad);
  });

  totalPages = Math.ceil(actividades.length / itemsPerPage);
  mostrarActividadesPagina(); // Mostrar la primera página
}

// funcion para mostrar actividades en la página actual
function mostrarActividadesPagina() {
  const selectTuristPlaces = document.querySelector('#resultsturists');
  selectTuristPlaces.innerHTML = ''; // Limpiar contenido antes de agregar las tarjetas

  // Calcular inicio y fin de la página 
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const actividadesPagina = actividades.slice(start, end);

  // iterar las actividades de la pagina actual
  actividadesPagina.forEach(actividad => {
    const { id, name, description, pictures: [imagenGet] } = actividad;
    const precioRandom = Math.floor(Math.random() * (100 - 30 + 1)) + 30;

    selectTuristPlaces.innerHTML += `
      <div class="col" id="${id}">
  <div class="card h-100 d-flex flex-column">
     <div class="img-container" style="height: 250px; overflow: hidden;">
      <img src="${imagenGet}" class="card-img-top w-100 h-100" alt="imagen de sitios turísticos">
    </div>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text fs-6 pt-3">Precio: <strong>${precioRandom} USD</strong></p>
      <p class="card-text fs-6">Para conocer más sobre este sitio dale:</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary w-100 turistSelect">Click Aquí</button>
    </div>
  </div>
</div>

    `;
  });

  // Agregar  cada boton de la tarjeta
  document.querySelectorAll('.turistSelect').forEach(button => {
    button.addEventListener('click', (event) => {
      const cardElement = event.target.closest('.col');
      obtenerID(cardElement.id);
    });
  });

  actualizarBotonesPaginacion();
}

// funcion para actualizar botones de paginacion
function actualizarBotonesPaginacion() {
  const paginacionBotones = document.getElementById('paginacionBotones');
  paginacionBotones.innerHTML = `
    <button class="btn btn-primary me-2" onclick="cambiarPagina(-1)" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
    <button class="btn btn-primary" onclick="cambiarPagina(1)" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
  `;
}


function cambiarPagina(incremento) {
  currentPage += incremento;
  mostrarActividadesPagina();
}



// Obtener id de cada Card
async function obtenerID(turismos) {

 const accessToken = await getAccessToken();
 

 fetch(`https://test.api.amadeus.com/v1/shopping/activities/${turismos}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
 })
 .then(response => response.json())
 .then(result =>  mostrarModal(result.data))
}

const modal = new bootstrap.Modal('#modal', {});



function mostrarModal(cards) {
  
  const { id , name, description, pictures: [imagenCard]} = cards;
   
   // Añadir contenido al modal
   const modalTitle = document.querySelector('.modal .modal-title');
   const modalBody = document.querySelector('.modal .modal-body');

  modalTitle.textContent = name;
  modalBody.innerHTML = `
    <img class="img-fluid" src="${imagenCard}" alt="actividad ${name}" />
    <h3 class="my-3">Descripcion</h3>
    <p>${description}</p>
    
  `;

  const modalFooter = document.querySelector('.modal-footer');
   limpiarHTML(modalFooter);

     //Botones de cerrar y Agendar
     const btnAgendar = document.createElement('BUTTON');
     btnAgendar.classList.add('btn', 'btn-danger', 'col');
     btnAgendar.textContent = 'Agendar';


     const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function() {
          modal.hide();
        }

        modalFooter.appendChild(btnAgendar);
        modalFooter.appendChild(btnCerrarModal);

         // Muestra el modal
         modal.show();

}

///////////////////////  2 oferta sobre Hoteles y alojamiento //////////////////////////
async function fetchHotels() {
  const hotelData = await fetch('https://priceline-com-provider.p.rapidapi.com/v2/hotels/downloadHotels?language=es-ES&limit=100', {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '57992f2980mshb06bec18fa30e35p17e6aejsne84f97e8a0b1',
      'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  });
  const data = await hotelData.json();
  mostrarHoteles(data["getSharedBOF2.Downloads.Hotel.Hotels"].results.hotels);
}


let paginaActual = 1; 
const cantidadPorPagina = 3; 
const selectTituloH2 = document.querySelector('#secondOfferh2');

function mostrarHoteles(hoteles) {
  
  const h2HotelesSpan = document.createElement('SPAN');
   h2HotelesSpan.textContent = 'Hoteles y Alojamiento';
    selectTituloH2.appendChild(h2HotelesSpan);


  const selectHotels = document.querySelector('#resulthotels');
  const hotelesArray = Object.values(hoteles);
  
  function renderPage() {
    selectHotels.innerHTML = ''; // Limpiar el contenido de la página actual
    
    const inicio = (paginaActual - 1) * cantidadPorPagina;
    const fin = inicio + cantidadPorPagina;
    const pageHotels = hotelesArray.slice(inicio, fin);

    pageHotels.forEach(hotel => {
      const { hotelid_ppn, hotel_name, property_description, thumbnail, hotel_address, country, city, star_rating, review_rating, review_count } = hotel;
      const precioRandom2 = Math.floor(Math.random() * (300 - 70 + 1)) + 70;
      
      // Validar campos
      if ([hotelid_ppn, hotel_name, property_description, thumbnail, hotel_address, country, city, star_rating, review_rating, review_count].some(field => !field)) {
        return;
      }
      
      // Inyectar  la tarjeta en el dom HTML
      selectHotels.innerHTML += `
        <div class="col" id="${hotelid_ppn}">
          <div class="card h-100 d-flex flex-column">
            <div class="img-container" style="height: 250px; overflow: hidden;">
              <img src="${thumbnail}" class="card-img-top w-100 h-100" alt="imagen de sitios turísticos">
            </div>
            <div class="card-body">
              <h5 class="card-title">${hotel_name}</h5>
              <p class="card-text fs-6 pt-3">Precio: <strong>${precioRandom2} USD</strong></p>
              <p class="card-text fs-6">Lugar: ${hotel_address} / ${city} / ${country}</p>
              <p class="card-text fs-6">Review: ${star_rating} ⭐ / ${review_rating} 👍 / ${review_count} 👥</p>
              <p class="card-text fs-6">Para conocer más sobre este sitio dale:</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary w-100 hotelSelect">Click Aquí</button>
            </div>
          </div>
        </div>
      `;
    });

    // Configurar el  botón de selección de hotel
    document.querySelectorAll('.hotelSelect').forEach(button => {
      button.addEventListener('click', (event) => {
        const cardElement = event.target.closest('.col');
        obtenerID2(cardElement.id);
      });
    });
  }

  // Renderizar los botones de paginación y limpiar
  function renderPaginationButtons() {
    const paginationDiv = document.getElementById('paginacionBotones2');
    paginationDiv.innerHTML = '';

    // Botón de anterior
    const prevButton = document.createElement('button');
    prevButton.className = 'btn btn-primary me-2';
    prevButton.textContent = 'Anterior';
    prevButton.disabled = paginaActual === 1;
    prevButton.addEventListener('click', () => {
      if (paginaActual > 1) {
        paginaActual--;
        renderPage();
        renderPaginationButtons();
      }
    });
    
    // Botón de siguiente
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-primary';
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = paginaActual * cantidadPorPagina >= hotelesArray.length;
    nextButton.addEventListener('click', () => {
      if (paginaActual * cantidadPorPagina < hotelesArray.length) {
        paginaActual++;
        renderPage();
        renderPaginationButtons();
      }
    });

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
  }

  renderPage(); // Mostrar la primera página de hoteles
  renderPaginationButtons(); // Mostrar los botones de paginación
}



   function obtenerID2(id) {
    
    fetch(`https://priceline-com-provider.p.rapidapi.com/v2/hotels/downloadHotels?language=es-ES&hotelid_ppn=${id}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '086f4ed0d2msh5e770a819e77bdbp19514bjsn9d837264928d',
        'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com',
        'Content-Type': 'application/json'
      
      }
  })
    .then(response => response.json())
    .then(res =>  mostrarModal2(res["getSharedBOF2.Downloads.Hotel.Hotels"].results.hotels.hotel_0));
   }


   const modal2 = new bootstrap.Modal('#modal2', {});
  

  
   function mostrarModal2(cards2) {
    

     const { hotelid_ppn, hotel_name, property_description, thumbnail} = cards2;
    console.log(hotel_name);

      // Añadir contenido al modal 2
const modalTitle2 = document.querySelector('.modal .title2');
const modalBody2 = document.querySelector('.modal .body2');

modalTitle2.textContent = hotel_name;
modalBody2.innerHTML = `
<img class="img-fluid w-100 h-100" src="${thumbnail}" alt="actividad ${hotel_name}" />
<h3 class="my-3">Descripcion</h3>
<p>${property_description}</p>

`;

const modalFooter2 = document.querySelector('.footer2');
limpiarHTML(modalFooter2);

//Botones de cerrar y Agendar
const btnAgendar2 = document.createElement('BUTTON');
btnAgendar2.classList.add('btn', 'btn-danger', 'col');
btnAgendar2.textContent = 'Agendar';


const btnCerrarModal2 = document.createElement('BUTTON');
  btnCerrarModal2.classList.add('btn', 'btn-secondary', 'col');
  btnCerrarModal2.textContent = 'Cerrar';
  btnCerrarModal2.onclick = function() {
    modal2.hide();
  }

  modalFooter2.appendChild(btnAgendar2);
  modalFooter2.appendChild(btnCerrarModal2);

   // Muestra el modal
   modal2.show();

   }


    //////////////// 3 er oferta  secciones de vuelos ///////////////////////////////////////

     

    async function obtenerFlights() {
      const response =  await fetch('https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete?originSkyId=LOND&destinationSkyId=NYCA&originEntityId=27544008&destinationEntityId=27537542&date=2024-12-27&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US', {
          method: 'GET',
    headers: {
      'x-rapidapi-key': '57992f2980mshb06bec18fa30e35p17e6aejsne84f97e8a0b1',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          'Content-Type': 'application/json'
    }
      });
  
      const datosVuelos = await response.json();
      console.log(datosVuelos)
      const results99 = datosVuelos.data.itineraries.slice(0, 99);
      obtenerItinerarios(datosVuelos.data.destinationImageUrl, results99);
  
  }
  
      
  function obtenerItinerarios(imgFlight, itinerarios) {
      const selectTituloFlights = document.querySelector('#secondOfferh3')
       const h2fligthsSpan = document.createElement('SPAN');
       h2fligthsSpan.textContent = 'Seccion de Vuelos';
       selectTituloFlights.appendChild(h2fligthsSpan);
  
    const selectFlightsResults = document.querySelector('#resultsflights');
    const divBotonesPaginacion = document.querySelector('#paginacionBotones3');
    const tarjetasPorPagina = 3;
    let paginaActual2 = 1;
  
    // Función para renderizar las tarjetas por página
    function renderizarPagina() {
        // Limpiar contenido anterior
        selectFlightsResults.innerHTML = '';
  
        // Calcular el índice inicial y final de las paginas 
        const inicio2 = (paginaActual2 - 1) * tarjetasPorPagina;
        const fin2 = inicio2 + tarjetasPorPagina;
  
        // Obtener las tarjetas de la página actual e iterar sobre ellos
        const tarjetasPagina = itinerarios.slice(inicio2, fin2);
  
        tarjetasPagina.forEach(itinerario => {
            const { id } = itinerario;
            const { name: aeropuertoOrigen, city: ciudadOrigen, country: paisOrigen } = itinerario.legs[0].origin;
            const { name: aeropuertoDestino, city: ciudadDestino, country: paisDestino } = itinerario.legs[0].destination;
            const { formatted } = itinerario.price;
            const { name: aerolinea, logoUrl } = itinerario.legs[0].carriers.marketing[0];
            const { departure, arrival, durationInMinutes, flightNumber } = itinerario.legs[0].segments[0];
  
            const itinerarioData = {
                id,
                aeropuertoOrigen,
                ciudadOrigen,
                paisOrigen,
                aeropuertoDestino,
                ciudadDestino,
                paisDestino,
                formatted,
                aerolinea,
                logoUrl,
                departure,
                arrival,
                durationInMinutes,
                flightNumber
            };
  
            // Introducir los datos ala card de bootstrap
            selectFlightsResults.innerHTML += `
                <div class="col" id="${id}">
                    <div class="card h-100 d-flex flex-column">
                        <div class="img-container" style="height: 250px; overflow: hidden;">
                            <img src="${imgFlight}" class="card-img-top w-100 h-100" alt="imagen de aerolineas">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"> 🌍🛫 ${ciudadOrigen} ——> 🛬🌎 ${ciudadDestino}</h5>
                            <p class="card-text fs-6 pt-3">Precio: <strong>${formatted}</strong></p>
                            <p class="card-text fs-6">Para conocer más sobre este sitio dale:</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary w-100 itinerarioSelectCard" data-itinerario='${JSON.stringify(itinerarioData)}'>Click Aquí</button>
                        </div>
                    </div>
                </div>
            `;
        });
  
        //  Se Agregan  eventos a los botones de la tarjeta
        const botones = document.querySelectorAll('.itinerarioSelectCard');
        botones.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const itinerario = JSON.parse(event.target.dataset.itinerario);
                mostrarModalFlights(itinerario);
            });
        });
    }
  
    // Una Funcion para actualizar los botones de paginación
    function actualizarBotonesPaginacion2() {
        divBotonesPaginacion.innerHTML = `
            <button class="btn btn-primary me-2" id="btnAnterior" ${paginaActual2 === 1 ? 'disabled' : ''}>Anterior</button>
            <button class="btn btn-primary" id="btnSiguiente" ${paginaActual2 * tarjetasPorPagina >= itinerarios.length ? 'disabled' : ''}>Siguiente</button>
        `;
  
        document.querySelector('#btnAnterior').addEventListener('click', () => {
            if (paginaActual2 > 1) {
                paginaActual2--;
                renderizarPagina();
                actualizarBotonesPaginacion2();
            }
        });
  
        document.querySelector('#btnSiguiente').addEventListener('click', () => {
            if (paginaActual2 * tarjetasPorPagina < itinerarios.length) {
                paginaActual2++;
                renderizarPagina();
                actualizarBotonesPaginacion2();
            }
        });
    }
  
    // Inicializar renderizado de pagina y botones
    renderizarPagina();
    actualizarBotonesPaginacion2();
  }
  
  
     const modal3 = new bootstrap.Modal('#modal3', {});
  
        
       function mostrarModalFlights(itinerario) {
          const {id, aeropuertoOrigen, ciudadOrigen, paisOrigen, aeropuertoDestino, ciudadDestino,  paisDestino, formatted,
            aerolinea,  logoUrl,departure, arrival, durationInMinutes, flightNumber} = itinerario;
             console.log(flightNumber)
  
            // Formateamos la hora para utilizarla
            const formatDate = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formatTime = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  
            const departureDate = new Date(departure);
            const arrivalDate = new Date(arrival);
            
            // se utiliza mas abajo
            const departureFormattedDate = formatDate.format(departureDate);   // devuelve en formato dia/mes/año o algo parecido.
            const arrivalFormattedDate = formatDate.format(arrivalDate);
            
            // se utiliza mas abajo
            const departureTime = formatTime.format(departureDate); //  devuelve asi como en hora  18:00
            const arrivalTime = formatTime.format(arrivalDate);
                
               /// Formateamos para obtener en lugar de minutos las horas de cada  vuelo
               const duracionHoras = Math.round(durationInMinutes / 60);
  
               
  
            // Añadir contenido al modal 3
  const modalTitle3 = document.querySelector('.modal .title3');
  const modalBody3 = document.querySelector('.modal .body3');
  
  modalTitle3.textContent = ` ${ ciudadOrigen} •——————• ${ciudadDestino} `;
  modalBody3.innerHTML = `
  <h4 class="pt-3">Aerolinea: ${aerolinea}</h4>
  <img class="img-fluid w-100 h-100" src="${logoUrl}" alt="logo de  ${aerolinea}" />
  <h3 class="my-3">Descripcion</h3>
  
  <p class="pt-2">Aeropuertos: <strong> ${ aeropuertoOrigen}</strong> ➡ <strong>${ aeropuertoDestino}</strong> </p>
   <p>Paises: <span>  ${ paisOrigen}</span> /  <span>${ paisDestino}</span> </p>
   <p>Salida: <strong> ${ departureTime} </strong> | ${ departureFormattedDate } ——— Llegada:  <strong>${ arrivalTime}</strong> | ${ arrivalFormattedDate}</p>
   <p>Duracion: <strong> ${ duracionHoras}  </strong> Horas </p>
   <p>Vuelo N°: <strong> ${ flightNumber}  </strong></p>
   
  
  `;
  
  const modalFooter3 = document.querySelector('.footer3');
  limpiarHTML(modalFooter3);
  
  //Botones de cerrar y Agendar
  const btnAgendar3 = document.createElement('BUTTON');
  btnAgendar3.classList.add('btn', 'btn-danger', 'col');
  btnAgendar3.textContent = 'Agendar';
  
  
  const btnCerrarModal3 = document.createElement('BUTTON');
    btnCerrarModal3.classList.add('btn', 'btn-secondary', 'col');
    btnCerrarModal3.textContent = 'Cerrar';
    btnCerrarModal3.onclick = function() {
      modal3.hide();
    }
  
    modalFooter3.appendChild(btnAgendar3);
    modalFooter3.appendChild(btnCerrarModal3);
  
     // Muestra el modal
     modal3.show();
    
    }
  


    ///////////// controlador de acciones sobre cual se muestra primero//////////////////
   async function controladorMuestra() {
      await getFlightOffers();
     await fetchHotels();
     await obtenerFlights()
    }
    
    controladorMuestra()


   /// limpiar repitos 
function limpiarHTML(selector) {
  while(selector.firstChild) {
     selector.removeChild(selector.firstChild);
  }
}