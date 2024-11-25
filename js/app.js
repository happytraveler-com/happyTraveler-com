document.addEventListener("DOMContentLoaded", () => {
   const radios = document.querySelectorAll('[name="fechatipo"]');
        radios.forEach(radio => {
            radio.addEventListener('change', selectFechas); 
        });

        selectFechas();
})


const userSelections  = {};
const formularioIndexHTML =  document.querySelector('#formularioFlightsIndex');



function selectFechas() {
    // selectores
    const fechaTipo = document.querySelector('[name="fechatipo"]:checked').value;
    const fechaLlegada = document.querySelector('#fechaLlegadaDiv');
    const rowSelector  =  document.querySelector('#rowchange1');


    if (fechaTipo === 'soloida') {
       fechaLlegada.style.display = "none"; // Oculta la fecha de llegada
         rowSelector.classList.add('lalo15');
     
        const fechaSalidabox = document.querySelector('#fechaSalida').value = ""; 
           
         resetInputs()
        // selecciona datos del origen select
         selectOrigenIndex.addEventListener('change', (e) => {
            const skyOrigenID = e.target.value;
            const entityOrigenID = e.target.options[e.target.selectedIndex].getAttribute('data-entity');
     
            userSelections.skyOrigenID = skyOrigenID; 
            userSelections.entityOrigenID = entityOrigenID; 
            })
     
            // selecciona datos del destino select//////////
            selectDestinoIndex.addEventListener('change', (e) => {
                const skyDestinoID = e.target.value;
                const entityDestinoID = e.target.options[e.target.selectedIndex].getAttribute('data-entity');
        
                userSelections.skyDestinoID = skyDestinoID;
                userSelections.entityDestinoID = entityDestinoID;
        
                 })


                 //// fecha de salida///////////
                    const fechaDeSalidaInput = document.querySelector('#fechaSalida');
                 fechaDeSalidaInput.addEventListener('change', e => {
                 const fechaDeSalida = e.target.value;
                 userSelections.fechaDeSalida = fechaDeSalida;
                  })

            /// pasajeros

            const selectPasajeros = document.querySelector('#pasajerosSelectID');
            selectPasajeros.addEventListener('change', e => {
              const pasajeros  = e.target.value;

               userSelections.pasajeros = pasajeros;

            })

                
    } else {
       fechaLlegada.style.display = "block"; // Muestra la fecha de llegada
       rowSelector.classList.remove('lalo15');
      
       const fechaSalidabox = document.querySelector('#fechaSalida').value = ""; 
       resetInputs()
      
      
      // selecciona origen de ida y regreso
       selectOrigenIndex.addEventListener('change', (e) => {
        const skyOrigenID = e.target.value;
        const entityOrigenID = e.target.options[e.target.selectedIndex].getAttribute('data-entity');
 
        userSelections.skyOrigenID = skyOrigenID; 
        userSelections.entityOrigenID = entityOrigenID; 
        })
 
     // selecciona destino de ida y regreso
     selectDestinoIndex.addEventListener('change', (e) => {
         const skyDestinoID = e.target.value;
         const entityDestinoID = e.target.options[e.target.selectedIndex].getAttribute('data-entity');
 
         userSelections.skyDestinoID = skyDestinoID;
         userSelections.entityDestinoID = entityDestinoID;
 
          })
  
 
      // seleccionar fechas de ida y regreso
 
              // salida de ida y regreso
       const fechaDeSalidaInput = document.querySelector('#fechaSalida');
       fechaDeSalidaInput.addEventListener('change', e => {
         const fechaDeSalida = e.target.value;
         userSelections.fechaDeSalida = fechaDeSalida;
       })
    
       //llegada  de ida y regreso
       const fechaDeLlegadaInput = document.querySelector('#fechaLlegada');
       fechaDeLlegadaInput.addEventListener('change', e => {
         const fechaDeLlegada = e.target.value;
         userSelections.fechaDeLlegada = fechaDeLlegada;
       })
       
      
         // pasajeros select de ida y regreso
         const selectPasajeros = document.querySelector('#pasajerosSelectID');
              selectPasajeros.addEventListener('change', e => {
                const pasajeros  = e.target.value;
 
                 userSelections.pasajeros = pasajeros;
 
              })
 



    }

     

}

function resetInputs() {
   // selects 
 const origenbox = document.querySelector('#origenSelectID')
 const destinobox = document.querySelector('#destinoSelectID')
 const fechaLlegadabox = document.querySelector('#fechaLlegada').value = ""; 
 const pasejerosbox = document.querySelector('#pasajerosSelectID')

 if (origenbox) origenbox.selectedIndex = 0; 
 if (destinobox) destinobox.selectedIndex = 0; 
 if (pasejerosbox) pasejerosbox.selectedIndex = 0;
   
 Object.keys(userSelections).forEach(key => delete userSelections[key]);
}




formularioIndexHTML.addEventListener('submit', (e) => {
    e.preventDefault();      
   obtenerFormularioDatos(userSelections);
   
  })
  
  


const obtenerFormularioDatos = (userSelections) => {
    console.log(userSelections);


    if(userSelections.hasOwnProperty('fechaDeSalida') && userSelections.hasOwnProperty('fechaDeLlegada')) {
        const { skyOrigenID, skyDestinoID, entityOrigenID, entityDestinoID, fechaDeSalida,fechaDeLlegada,pasajeros} = userSelections;
      
        // ida y vuelta 
    fetch(`https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete?originSkyId=${skyOrigenID}&destinationSkyId=${skyDestinoID}&originEntityId=${entityOrigenID}&destinationEntityId=${entityDestinoID}&date=${fechaDeSalida}&returnDate=${fechaDeLlegada}&cabinClass=economy&adults=${pasajeros}&sortBy=best&currency=USD`, {
      method: 'GET',
	headers: {
		'x-rapidapi-key': '6cc738814amshae27cb61f49c6e5p14f672jsn5bf915cf4613',
		'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      'Content-Type': 'application/json'
	}
   })

    .then( resp1 => resp1.json())
    .then( result1 =>  {
      
      if (result1.data.itineraries.length === 0 ) {
        mostrarToast("No se encontraron resultados. Intente otra ubicación.");
       } else {
         let itineraries1 = result1.data.itineraries.length > 99 ? result1.data.itineraries.slice(0, 99) : result1.data.itineraries;
         mostrarVuelosIdayVuelta(itineraries1,pasajeros);
       }

    })
    .catch(error  => mostrarToast('Ocurrio un error intente con otro pais'))



    } else {
      const { skyOrigenID, skyDestinoID, entityOrigenID, entityDestinoID, fechaDeSalida,pasajeros} = userSelections;
      
      // solo ida
   fetch(`https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete?originSkyId=${skyOrigenID}&destinationSkyId=${skyDestinoID}&originEntityId=${entityOrigenID}&destinationEntityId=${entityDestinoID}&date=${fechaDeSalida}&cabinClass=economy&adults=${pasajeros}&sortBy=best&currency=USD`, {
      method: 'GET',
	headers: {
		'x-rapidapi-key': '6cc738814amshae27cb61f49c6e5p14f672jsn5bf915cf4613',
		'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      'Content-Type': 'application/json'
	}
   })

      
    .then( resp2 => resp2.json())
    .then( result2 => {
      // let itineraries1 = result2.data.itineraries;
      //  let itineraries2 = result2.data.itineraries.slice(0,99)
      //  console.log()
        
      
    if (result2.data.itineraries.length === 0) {
      mostrarToast("No se encontraron resultados. Intente otra ubicación.");  
       } else {
         let itineraries2 = result2.data.itineraries.length > 99 ? result2.data.itineraries.slice(0, 99) : result2.data.itineraries;
         mostrarVuelosSoloIda(itineraries2, pasajeros);
       }
 
      })
      .catch(error  => mostrarToast('Ocurrio un error intente con otro pais'));

    }

}

 
const contenidoCardsPromos = document.querySelector('#vuelosResultsIndex');
 

const mostrarVuelosSoloIda = (itinerariosIda, pasajerosOnly) => {
  console.log(itinerariosIda);
  
  limpiarHTML1()

  const resultsDivFlights = document.querySelector('#resultsOffersFligts');


  const itemsxPageOnly = 5; // Numero de tarjetas por página
const paginasTotalOnly = Math.ceil(itinerariosIda.length / itemsxPageOnly);

let paginaActualOnly = 1; // Pagina inicia


const renderPaginaOnly = (page) => {

  resultsDivFlights.innerHTML = ''; // Limpiar contenido existente
  const starOnly = (page - 1) * itemsxPageOnly;
  const endOnly = starOnly + itemsxPageOnly;

  const itemsToRenderOnly = itinerariosIda.slice(starOnly, endOnly);
  
  itemsToRenderOnly.forEach(itinerarioIda => {
      const {id: idIda } = itinerarioIda;
      const {name: airportOrigenIda, city: cityOrigenIda, country: countryOrigenIda } = itinerarioIda.legs[0].origin;
      const {name: airportDestinoIda, city: cityDestinoIda, country: countryDestinoIda } = itinerarioIda.legs[0].destination;
      const { departure: departureIda , arrival: arrivalIda , durationInMinutes: duracionIda}  = itinerarioIda.legs[0];
      const {formatted: precioIda} = itinerarioIda.price
       const {name: aerolineaIda , logoUrl: logoIda } = itinerarioIda.legs[0].carriers.marketing[0];
        const {flightNumber: flightNumberIda} = itinerarioIda.legs[0].segments[0];


        // Convertir precio y multiplicarlo segun las personas que se eligen
      const precioConvertedOnly = Number(precioIda.replace(/[^\d.-]/g, "").trim()) * Number(pasajerosOnly);


        // FORMATEAR HORA Y FECHA  DE  DEPARTURE Y ARRIVAL Y DURACION DEL VUELO
         // Formateamos la hora para utilizarla
         const formatDateIda = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
         const formatTimeIda = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

         const departureDateIda = new Date(departureIda);
         const arrivalDateIda = new Date(arrivalIda);
         
         // se utiliza mas abajo
         const departureFormattedDateIda = formatDateIda.format(departureDateIda);   // devuelve en formato dia/mes/año o algo parecido.
         const arrivalFormattedDateIda = formatDateIda.format(arrivalDateIda);
         
         // se utiliza mas abajo
         const departureTimeIda = formatTimeIda.format(departureDateIda); //  devuelve asi como en hora  18:00
         const arrivalTimeIda = formatTimeIda.format(arrivalDateIda);
             
            /// Formateamos para obtener en lugar de minutos las horas de cada  vuelo
            const duracionHorasIda = Math.round(duracionIda / 60);
      

      const objFlightIda = {
        idIda, 
        airportOrigenIda,
        cityOrigenIda,
        countryOrigenIda,
        airportDestinoIda,
        cityDestinoIda,
        countryDestinoIda,
        departureFormattedDateIda,
        arrivalFormattedDateIda,
        departureTimeIda,
        arrivalTimeIda,
        duracionHorasIda,
        precioConvertedOnly,
        aerolineaIda,
        logoIda,
        flightNumberIda,
        pasajerosOnly
      }


      resultsDivFlights.innerHTML += `
      
       
       
        <div class="card">
         <div class="row g-0">
           <!-- Información del vuelo -->
           <div class="col-md-9">
             <div class="card-body">
               <p class="text-success">La mejor oferta</p>
               <!----------------- Vuelo IDA -------------->
               <div class="d-flex align-items-center mb-3">
                 
                   <div class="d-flex flex-column align-items-start divAeorlinea">
                       <img src="${logoIda}" alt="Logo Aerolinea" class="flight-section img-fluid">
                       <p class="flex-grow-1">${aerolineaIda}</p>
                   </div>
                  
                  <div class="ms-5">
                   <p class="mb-1"><strong>${departureTimeIda}</strong> | ${departureFormattedDateIda}  ➔ <strong>${arrivalTimeIda}</strong> | ${arrivalFormattedDateIda}   </p>
                   <p class="text-muted mb-1"> ${cityOrigenIda} | ${airportOrigenIda}, ${countryOrigenIda} → ${cityDestinoIda} | ${airportDestinoIda}, ${countryDestinoIda}</p>
                  </div>
                  <div style="margin-left: 60px;">
                   <p class="mb-1"><strong>${duracionHorasIda}</strong> Horas</p>
                   <p class="text-muted mb-1">Vuelo N° - ${flightNumberIda}</p>
                  </div>
               </div>
             </div>
           </div>
           <!-- Sección de precio -->
           <div class="col-md-3 d-flex align-items-center justify-content-center price-section">
             <div class="text-center">
               <p class="priceCard">${precioConvertedOnly} USD</p>
               <p class="subtitle">Tarifa Estandar:  ${pasajerosOnly} personas</p>
              <button class="btn btn-primary btn-sm">Agendar </button>
             </div>
           </div>
         </div>
       </div>
       
      `;




      });

}

const renderPaginationOnly = () => {
  const paginationDivOnly = document.createElement('DIV');
  paginationDivOnly.classList.add('pagination', 'justify-content-center', 'mt-3');

  // Boton Anterior
  const prevButtonOnly = document.createElement('BUTTON');
  prevButtonOnly.classList.add('page-item', 'page-link');
  prevButtonOnly.textContent = '«';
  prevButtonOnly.disabled = paginaActualOnly === 1;
  prevButtonOnly.addEventListener('click', () => {
    if (paginaActualOnly > 1) {
      paginaActualOnly--;
      updatePaginationOnly();
    }
  });
  paginationDivOnly.appendChild(prevButtonOnly);

  // Numeros de pagina
  for (let i = 1; i <= paginasTotalOnly; i++) {
    const pageButtonOnlyWay = document.createElement('BUTTON');
    pageButtonOnlyWay.classList.add('page-item', 'page-link');
    pageButtonOnlyWay.textContent = i;
    if (i === paginaActualOnly) {
      pageButtonOnlyWay.classList.add('active');
    }
    pageButtonOnlyWay.addEventListener('click', () => {
      paginaActualOnly = i;
      updatePaginationOnly();
    });
    paginationDivOnly.appendChild(pageButtonOnlyWay);
  }

  // Boton Siguiente
  const nextButtonOnly = document.createElement('BUTTON');
  nextButtonOnly.classList.add('page-item', 'page-link');
  nextButtonOnly.textContent = '»';
  nextButtonOnly.disabled = paginaActualOnly === paginasTotalOnly;
  nextButtonOnly.addEventListener('click', () => {
    if (paginaActualOnly < paginasTotalOnly) {
      paginaActualOnly++;
      updatePaginationOnly();
    }
  });
  paginationDivOnly.appendChild(nextButtonOnly);

  resultsDivFlights.appendChild(paginationDivOnly);
};

// funcion para actualizar tarjetas y paginacion
const updatePaginationOnly = () => {
  renderPaginaOnly(paginaActualOnly);
  renderPaginationOnly();
};

// Inicializar
updatePaginationOnly();
    
  
 
}




const mostrarVuelosIdayVuelta = (itinerariosIdayVuelta, pasajeros) => {
  console.log(itinerariosIdayVuelta);
  //console.log(Number(pasajeros));

  limpiarHTML1()
  const resultsDivFlights = document.querySelector('#resultsOffersFligts');

  const itemsxPageRound = 5; // Número de tarjetas por página
  const paginasTotalRound = Math.ceil(itinerariosIdayVuelta.length / itemsxPageRound);

  let paginaActualRound = 1; // Pagina inicial


  const renderPaginaRound = (page) => {
    resultsDivFlights.innerHTML = ''; // Limpiar contenido existente
    const starRound = (page - 1) * itemsxPageRound;
    const endRound = starRound + itemsxPageRound;

    const itemsToRenderRound = itinerariosIdayVuelta.slice(starRound, endRound);

    itemsToRenderRound.forEach(itinerarioRound => {
      const {id : idRound} = itinerarioRound;
      const {formatted: precioRound} = itinerarioRound.price;
      const { departure: departureRound1 , arrival: arrivalRound1 , durationInMinutes: duracionRound1} = itinerarioRound.legs[0];
      const {name: airportRoundOrigen1, city: cityRoundOrigen1, country: countryRoundOrigen1} = itinerarioRound.legs[0].origin;
      const {name: airportRoundDestino1, city: cityRoundDestino1, country: countryRoundDestino1} = itinerarioRound.legs[0].destination;
      const {name: aerolineaRound1 , logoUrl: logoRound1 } = itinerarioRound.legs[0].carriers.marketing[0];
      const {flightNumber: flightNumberRound1} = itinerarioRound.legs[0].segments[0];
       

      // Convertir precio y pasarle personas para su total.
      const precioConvertedRound = Number(precioRound.replace(/[^\d.-]/g, "").trim()) * Number(pasajeros);
       


      // Formatear datos de Salida del Round trip flight

        // Formateamos la hora para utilizarla
        const formatDateRound1 = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formatTimeRound1 = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

        const departureDateRound1 = new Date(departureRound1);
        const arrivalDateRound1 = new Date(arrivalRound1);
        
        // se utiliza mas abajo
        const departureFormattedDateRound1 = formatDateRound1.format(departureDateRound1);   // devuelve en formato dia/mes/año o algo parecido.
        const arrivalFormattedDateRound1 = formatDateRound1.format(arrivalDateRound1);
        
        // se utiliza mas abajo
        const departureTimeRound1 = formatTimeRound1.format(departureDateRound1); //  devuelve asi como en hora  18:00
        const arrivalTimeRound1 = formatTimeRound1.format(arrivalDateRound1);
            
           /// Formateamos para obtener en lugar de minutos las horas de cada  vuelo
           const duracionHorasRound1 = Math.round(duracionRound1 / 60);

         

        // --------------     Sacar datos del vuelo de regreso. -----------------
      const { name: airportOrigenRound2, city: cityOrigenRound2, country: countryOrigenRound2} = itinerarioRound.legs[1].origin;
      const { name: airportDestinoRound2, city: cityDestinoRound2, country: countryDestinoRound2} = itinerarioRound.legs[1].destination;
      const {departure: departureRound2, arrival: arrivalRound2, durationInMinutes: duracionRound2 } = itinerarioRound.legs[1];
      const {name: aerolineaRound2 , logoUrl: logoRound2 } = itinerarioRound.legs[1].carriers.marketing[0];
      const {flightNumber: flightNumberRound2} = itinerarioRound.legs[1].segments[0];

       // formatear vuelo de regreso


    // Formateamos la hora para utilizarla
    const formatDateRound2 = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formatTimeRound2 = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

    const departureDateRound2 = new Date(departureRound2);
    const arrivalDateRound2 = new Date(arrivalRound2);
    
    // se utiliza mas abajo
    const departureFormattedDateRound2 = formatDateRound2.format(departureDateRound2);   // devuelve en formato dia/mes/año o algo parecido.
    const arrivalFormattedDateRound2 = formatDateRound2.format(arrivalDateRound2);
    
    // se utiliza mas abajo
    const departureTimeRound2 = formatTimeRound2.format(departureDateRound2); //  devuelve asi como en hora  18:00
    const arrivalTimeRound2 = formatTimeRound2.format(arrivalDateRound2);
        
       /// Formateamos para obtener en lugar de minutos las horas de cada  vuelo
       const duracionHorasRound2 = Math.round(duracionRound2 / 60);


     const objFlightIdayVuelta = {
      idRound,
      airportRoundOrigen1,
      cityRoundOrigen1,
     countryRoundOrigen1,
      airportRoundDestino1,
      cityRoundDestino1,
      countryRoundDestino1,
      departureFormattedDateRound1,
      arrivalFormattedDateRound1,
      departureTimeRound1,
      arrivalTimeRound1,
      duracionHorasRound1,
      precioConvertedRound,
      aerolineaRound1,
      logoRound1,
      flightNumberRound1,
      airportOrigenRound2,
      cityOrigenRound2,
      countryOrigenRound2,
      airportDestinoRound2,
      cityDestinoRound2,
      countryDestinoRound2,
      departureFormattedDateRound2,
      arrivalFormattedDateRound2,
      departureTimeRound2,
      arrivalTimeRound2,
      duracionHorasRound2,
      aerolineaRound2,
      logoRound2,
      flightNumberRound2,
      pasajeros
     }

      

     resultsDivFlights.innerHTML += `
     
      
      
       <div class="card">
        <div class="row g-0">
          <!-- Información del vuelo -->
          <div class="col-md-9">
            <div class="card-body">
              <p class="text-success">La mejor oferta</p>
              <!-- Vuelo 1 -->
              <div class="d-flex align-items-center mb-3">
                
                  <div class="d-flex flex-column align-items-start divAeorlinea">
                      <img src="${logoRound1}" alt="Logo Aerolinea" class="flight-section img-fluid">
                      <p class="flex-grow-1">${aerolineaRound1}</p>
                  </div>
                 
                 <div class="ms-5">
                  <p class="mb-1"><strong>${departureTimeRound1}</strong> | ${departureFormattedDateRound1}  ➔ <strong>${arrivalTimeRound1}</strong> | ${arrivalFormattedDateRound1}   </p>
                  <p class="text-muted mb-1"> ${cityRoundOrigen1} | ${airportRoundOrigen1}, ${countryRoundOrigen1} → ${cityRoundDestino1} | ${airportRoundDestino1}, ${countryRoundDestino1}</p>
                 </div>
                 <div style="margin-left: 60px;">
                  <p class="mb-1"><strong>${duracionHorasRound1}</strong> Horas</p>
                  <p class="text-muted mb-1">Vuelo N° - ${flightNumberRound1}</p>
                 </div>
              </div>
              <!-- Vuelo 2 -->
              <div class="d-flex align-items-center mb-3">
                
                <div class="d-flex flex-column align-items-start divAeorlinea">
                    <img src="${logoRound2}" alt="Logo Aerolinea" class="flight-section img-fluid">
                    <p class="flex-grow-1">${aerolineaRound2}</p>
                </div>
               
               <div class="ms-5">
                <p class="mb-1"><strong>${departureTimeRound2}</strong> | ${departureFormattedDateRound2}  ➔ <strong> ${arrivalTimeRound2} </strong> | ${arrivalFormattedDateRound2}   </p>
                <p class="text-muted mb-1"> ${cityOrigenRound2} | ${airportOrigenRound2}, ${countryOrigenRound2}  →   ${cityDestinoRound2} | ${airportDestinoRound2}, ${countryDestinoRound2} </p>
               </div>
               <div style="margin-left: 60px;">
                <p class="mb-1"><strong>${duracionHorasRound2}</strong> Horas</p>
                <p class="text-muted mb-1">Vuelo N° - ${flightNumberRound2}</p>
               </div>
            </div>

            </div>
          </div>
          <!-- Sección de precio -->
          <div class="col-md-3 d-flex align-items-center justify-content-center price-section">
            <div class="text-center">
              <p class="priceCard">${precioConvertedRound} USD</p>
              <p class="subtitle">Tarifa Estandar:  ${pasajeros} personas</p>
             <button class="btn btn-primary btn-sm">Agendar </button>
            </div>
          </div>
        </div>
      </div>
      
     
     
     `;


  });


  };

  const renderPaginationRound = () => {
    const paginationDivRound = document.createElement('DIV');
    paginationDivRound.classList.add('pagination', 'justify-content-center', 'mt-3');

    // Boton Anterior
    const prevButtonRound = document.createElement('BUTTON');
    prevButtonRound.classList.add('page-item', 'page-link');
    prevButtonRound.textContent = '«';
    prevButtonRound.disabled = paginaActualRound === 1;
    prevButtonRound.addEventListener('click', () => {
      if (paginaActualRound > 1) {
        paginaActualRound--;
        updatePaginationRound();
      }
    });
    paginationDivRound.appendChild(prevButtonRound);

    // Numeros de pagina
    for (let i = 1; i <= paginasTotalRound; i++) {
      const pageButtonRound = document.createElement('BUTTON');
      pageButtonRound.classList.add('page-item', 'page-link');
      pageButtonRound.textContent = i;
      if (i === paginaActualRound) {
        pageButtonRound.classList.add('active');
      }
      pageButtonRound.addEventListener('click', () => {
        paginaActualRound = i;
        updatePaginationRound();
      });
      paginationDivRound.appendChild(pageButtonRound);
    }

    // Boton Siguiente
    const nextButtonRound = document.createElement('BUTTON');
    nextButtonRound.classList.add('page-item', 'page-link');
    nextButtonRound.textContent = '»';
    nextButtonRound.disabled = paginaActualRound === paginasTotalRound;
    nextButtonRound.addEventListener('click', () => {
      if (paginaActualRound < paginasTotalRound) {
        paginaActualRound++;
        updatePaginationRound();
      }
    });
    paginationDivRound.appendChild(nextButtonRound);

    resultsDivFlights.appendChild(paginationDivRound);
  };

  // funcion para actualizar tarjetas y paginacion
  const updatePaginationRound = () => {
    renderPaginaRound(paginaActualRound);
    renderPaginationRound();
  };

  // Inicializar
  updatePaginationRound();


 
}



// funcion de limpiar cards de html existentes  y agregar un div despues de hacerlo
function limpiarHTML1() {
 
  while(contenidoCardsPromos.firstChild) {
    contenidoCardsPromos.removeChild(contenidoCardsPromos.firstChild);
  }

  mostrarSpinner();

  const containerDiv = document.createElement('DIV');
  containerDiv.classList.add('container','mt-4');
  containerDiv.id = 'resultsOffersFligts';

  contenidoCardsPromos.appendChild(containerDiv);

}





const mostrarSpinner = () => {
  
  const SpinnerDiv = document.createElement('DIV');
   SpinnerDiv.className  = 'd-flex justify-content-center align-items-start vh-100 mt-5';
   SpinnerDiv.innerHTML = `
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `;
   
      contenidoCardsPromos.appendChild(SpinnerDiv);

      setTimeout(() => {
        SpinnerDiv.remove();
      }, 3000);

};



 
function mostrarToast(mensaje) {
  const toastDiv = document.querySelector('#toast');
  const toastBody = document.querySelector('.toast-body');
  const toast = new bootstrap.Toast(toastDiv);
  toastBody.textContent = mensaje;
  toast.show();

 
  const resultsDivFlights = document.querySelector('#resultsOffersFligts');

  if (resultsDivFlights) {
    resultsDivFlights.remove();
    
    contenidoCardsPromos.innerHTML += `
       <div class="promos_cards d-flex justify-content-center" >
            <div class="card" style="width: 30rem;">
                <img src="images/indecisos.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">¿No sabes a donde ir?</h5>
                  <p class="card-text">¡Explora todos los precios de nuestros destinos y elige el que más se ajuste a tus preferencias!</p>
                  <a href="#" class="btn btn-primary">Ver más</a>
                </div>
                
            </div>
            <div class="card" style="width: 30rem;">
                <img src="images/promos.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">No te pierdas nuestras promociones</h5>
                  <p class="card-text">Con nuestras ofertas podrás viajar más seguido o realizar viajes adicionales, ampliando así tus experiencias de viaje.</p>
                  <a href="#" class="btn btn-primary">Ver más</a>
                </div>
            </div>
            <div class="card"  style="width: 30rem;">
                <img src="images/grupos.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">¿Planificando viaje en grupo?</h5>
                  <p class="card-text">¡Ahorra aún más en tus viajes en grupo con nuestras ofertas especiales en tús tiquetes! Planifica tu próxima aventura juntos a precios increíbles.</p>
                  <a href="#" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        </div>
    
    `;
       
      
    return;
  }

  }