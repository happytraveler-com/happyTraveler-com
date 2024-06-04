//busqueda de viajes Rudy
document.getElementById('buscarTiquetes').addEventListener('click', function() {
    const origen = 'Bogotá (BOG)';
    const destino = 'Bucaramanga (BGA)';
    const fechaSalida = '24 Abril 2024';
    const fechaLlegada = '(opcional)';
    const pasajeros = 1;

    console.log("Realizando búsqueda de tiquetes con los siguientes datos:");
    console.log("Origen:", origen);
    console.log("Destino:", destino);
    console.log("Fecha de Salida:", fechaSalida);
    console.log("Fecha de Llegada:", fechaLlegada);
    console.log("Pasajeros:", pasajeros);
    document.getElementById('buscarTiquetes').addEventListener('click', function() {
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const fechaSalida = document.getElementById('fechaSalida').value;
        const pasajeros = document.getElementById('pasajeros').value;

        const datosBusqueda = {
            origen: origen,
            destino: destino,
            fechaSalida: fechaSalida,
            pasajeros: pasajeros
        };

        fetch('https://ejemplo.com/buscarTiquetes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosBusqueda)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultados').innerText = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Ha ocurrido un error:', error);
        });
    });