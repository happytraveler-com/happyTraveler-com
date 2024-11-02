document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('[name="fechatipo"]');
        radios.forEach(radio => {
            radio.addEventListener('change', selectFechas); 
        });
})


function selectFechas() {
    // selectores
    const fechaTipo = document.querySelector('[name="fechatipo"]:checked').value;
    const fechaLlegada = document.querySelector('#fechaLlegadaDiv');
    const rowSelector  =  document.querySelector('#rowchange1');


    if (fechaTipo === 'soloida') {
       fechaLlegada.style.display = "none"; // Oculta la fecha de llegada
         rowSelector.classList.add('lalo15');

    } else {
       fechaLlegada.style.display = "block"; // Muestra la fecha de llegada
       rowSelector.classList.remove('lalo15');
    }

}