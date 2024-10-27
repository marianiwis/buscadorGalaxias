document.getElementById('btnBuscar').addEventListener('click', buscarImagenes);

async function buscarImagenes() {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarResultados(data.collection.items);
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
    }
}

function mostrarResultados(imagenes) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // limpiar resultados 

    imagenes.forEach(item => {
        const { links, data } = item;

        // verificar que existan enlaces
        if (links && data.length > 0) {
            const { title, description, date_created } = data[0]; 
            const imagenUrl = links[0].href; //primer enlace

            // crear tarjeta
            const tarjeta = `
                <div class="col">
                    <div class="card mb-4">
                    <img src="${imagenUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body overflow-auto">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description || 'No hay descripción disponible.'}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${date_created || 'Sin fecha'}</small></p>
                    </div>
                </div>
                </div>
            `;
            contenedor.innerHTML += tarjeta; // añadir tarjeta al contenedor
        }
    });
}