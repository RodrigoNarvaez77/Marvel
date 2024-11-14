document.getElementById('searchButton').addEventListener('click', async () => {
    const breedName = document.getElementById('nameInput').value.trim();  // Elimina espacios al inicio y final
    const resultDiv = document.getElementById('dataTable');
    
    // Si no se introdujo un nombre válido (vacío o solo espacios), muestra un mensaje.
    if (!breedName) {
        resultDiv.innerHTML = 'Por favor, introduce un nombre de raza o personaje.';
        return;
    }

    try {
        // Realiza la solicitud a la API
        const response = await fetch(`/marvel-data/${breedName.toLowerCase()}`);
        const data = await response.json();
        console.log(data);  // Verifica la respuesta en la consola

        // Verifica si 'results' existe y contiene datos
        if (data && data.data && data.data.results && data.data.results.length > 0) {
            const heroData = data.data.results[0];  // Accede al primer héroe en el array
            console.log("Hero Data:", heroData); 

            // Prepara el contenido a mostrar
            let content = `
                <h2>${heroData.name}</h2>
                <h3>${heroData.description || 'Descripción no disponible'}</h3> <!-- Agrega un valor predeterminado si no hay descripción -->
            `;

            // Si hay información de imagen (path y extension), agrega la imagen
            if (heroData.thumbnail && heroData.thumbnail.path && heroData.thumbnail.extension) {
                const imageUrl = `${heroData.thumbnail.path}.${heroData.thumbnail.extension}`;
                content += `<img src="${imageUrl}" alt="${heroData.name}" />`;
            }

            // Si heroData tiene 'items' (por ejemplo, comics, eventos, etc.)
            heroData.comics.items.forEach(item => {
                // Verifica que cada 'item' tenga resourceURI y name
                if (item.resourceURI && item.name) {
                    content += `
                        <li>
                            <a href="${item.resourceURI}" target="_blank">${item.name}</a>
                        </li>
                    `;
                }
            });
            
            content += '</ul>';

            // Inserta todo el contenido en el resultDiv
            resultDiv.innerHTML = content;

        } else {
            // Si no se encuentran resultados
            resultDiv.innerHTML = 'No se encontraron resultados para el nombre ingresado.';
        }

    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        resultDiv.innerHTML = 'Error al cargar datos de la API. Por favor, intenta nuevamente más tarde.';
    }
});