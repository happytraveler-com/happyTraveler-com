const countriesNames = ['united states', 'england', 'colombia', 'spain', 'india', 'japan', 'australia', 'china',  'united kingdom', 'france','germany', 'austria', 'mexico', 'chile', 'brazil', 'peru', 'canada' , 'uruguay', 'egypt','belgium', 'sweden', 'norway', 'italy', 'netherlands', 'finland', 'ukraine'];
const countries  = countriesNames.sort(() => Math.random() - 0.5);
   
const apiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query='
let i  = 0;
let contador = 0;                
const paisesMaximos = 1;                   


const intervalo = setInterval(() => {
    const country = countries[i];
    const url = `${apiUrl}${encodeURIComponent(country)}`;



    fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1b4b85b21bmshc8fc63413cc7d3bp16963cjsnd33f4f8097a5',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    }) 
    
    .then( res => res.json())
    .then( rta =>  obtenerIATA(rta.data.slice(1)))

    i = (i + 1) % countries.length;
    contador++

  
  
// comentar despues 
if (contador >= paisesMaximos) {
     clearInterval(intervalo);
  }

}, 10000);

const selectOrigenIndex = document.querySelector('#origenSelectID');

 const  obtenerIATA = (ciudades) => {
    
    // Creamos un nuevo array
    const datos = ciudades.map(ciudad => {
        const { entityId, skyId } = ciudad;
        const { localizedName } = ciudad.navigation.relevantHotelParams;
        return { localizedName, entityId, skyId}
    })
    
      const datosRandom  = datos.sort(() => Math.random() - 0.5);
       
       
     
        limpiarHTML(selectOrigenIndex)
        
       
       
      datosRandom.forEach(dato => {
        const {localizedName, entityId, skyId } = dato;


         const optionorigin = document.createElement('option');
         optionorigin.textContent = localizedName
          optionorigin.value = skyId;
          optionorigin.dataset.entity = entityId;

          selectOrigenIndex.appendChild(optionorigin)
  });

}

/////////////////// 2 SELECT  DESTINO //////////////////////////////////////////
const countriesNames2 = ['united states', 'england', 'colombia', 'spain', 'india', 'japan', 'australia', 'china',  'united kingdom', 'france','germany', 'austria', 'mexico', 'chile', 'brazil', 'peru', 'canada' , 'uruguay', 'egypt','belgium', 'sweden', 'norway', 'italy', 'netherlands', 'finland', 'ukraine'];
const countries2  = countriesNames2.sort(() => Math.random() - 0.5);
   
const apiUrl2 = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query='
let i2  = 0;
let contador2 = 0;                
const paisesMaximos2 = 1;                   


const intervalo2 = setInterval(() => {
    const country2 = countries2[i2];
    const url2 = `${apiUrl2}${encodeURIComponent(country2)}`;



    fetch(url2, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1b4b85b21bmshc8fc63413cc7d3bp16963cjsnd33f4f8097a5',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    }) 
    
    .then( res => res.json())
    .then( rta =>  obtenerIATA2(rta.data.slice(1)))

    i2 = (i2 + 1) % countries2.length;
    contador2++

  
  
// comentar despues 
if (contador2 >= paisesMaximos2) {
     clearInterval(intervalo2);
  }

}, 10000);

const selectDestinoIndex = document.querySelector('#destinoSelectID');

 const  obtenerIATA2 = (ciudades2) => {
    
    // Creamos un nuevo array
    const datos2 = ciudades2.map(ciudad2 => {
        const { entityId, skyId } = ciudad2;
        const { localizedName } = ciudad2.navigation.relevantHotelParams;
        return { localizedName, entityId, skyId}
    })
    
      const datosRandom2  = datos2.sort(() => Math.random() - 0.5);
       
         limpiarHTML(selectDestinoIndex);
       
       
      datosRandom2.forEach(dato2 => {
        const {localizedName, entityId, skyId } = dato2;

         const optiondestino = document.createElement('option');
         optiondestino.textContent = localizedName
          optiondestino.value = skyId;
          optiondestino.dataset.entity = entityId;
           selectDestinoIndex.appendChild(optiondestino)
        });

}






function limpiarHTML(selector) {
    while (selector.children.length > 1) {
        selector.removeChild(selector.lastChild);
    }
}
