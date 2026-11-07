const botonCargarEquipos = document.getElementById("btnCargarEquipos");
const contenedorEquipos = document.getElementById("contenedorEquipos");

const API_URL =
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=NBA";

botonCargarEquipos.addEventListener("click", obtenerEquiposNBA);

async function obtenerEquiposNBA() {
  try {
    contenedorEquipos.innerHTML = "<p>Cargando equipos...</p>";

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("Error al consultar TheSportsDB");
    }

    const datos = await respuesta.json();
    console.log("Datos recibidos:", datos);
    console.log("Cantidad de equipos:", datos.teams?.length);

    mostrarEquipos(datos.teams);
  } catch (error) {
    console.error("Error detallado:", error);

    contenedorEquipos.innerHTML = `
      <p>Ocurrió un error al cargar los equipos.</p>
      <p><strong>Detalle:</strong> ${error.message}</p>
    `;
  }
}

function mostrarEquipos(equipos) {
  contenedorEquipos.innerHTML = "";

  if (!equipos || equipos.length === 0) {
    contenedorEquipos.innerHTML = "<p>No se encontraron equipos.</p>";
    return;
  }

  equipos.forEach(function (equipo) {
    console.log(equipo);
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("team-card");

    const imagenEquipo = equipo.strBadge;
    const bannerEquipo = equipo.strBanner;

    tarjeta.innerHTML = `
      <img 
        src="${imagenEquipo}" 
        alt="Logo de ${equipo.strBanner}" 
        class="team-img"
      >

      <h2>${equipo.strTeam}</h2>

      <p><strong>Liga:</strong> ${equipo.strLeague || "No disponible"}</p>
      <p><strong>Estadio:</strong> ${equipo.strStadium || "No disponible"}</p>
      <p><strong>País:</strong> ${equipo.strCountry || "No disponible"}</p>
      <p><strong>Año de fundación:</strong> ${equipo.intFormedYear || "No disponible"}</p>
       <img 
        src="${bannerEquipo}" 
        alt="Logo de ${equipo.strBanner}" 
        class="banner-img"
      >

    `;

    contenedorEquipos.appendChild(tarjeta);
  });
}
