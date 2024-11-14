async function opciones() {
    //console.log("hola");
    opcionheroe = document.getElementById("nameInput");
    const response = await fetch(`/marvel-data`);
    //console.log("el response es ",response);
    const data = await response.json();
    //console.log(data);

    try{   
        data.data.results.forEach(item => {
        const nuevasopciones = document.createElement('option');
        nuevasopciones.textContent = item.name;
        console.log(nuevasopciones);
        opcionheroe.appendChild(nuevasopciones);
    });
    }catch(error){
        console.error("error",error);
    }      

}

opciones()