const API_KEY = "AIzaSyBe1e24FlRozGh6dR54rAKVnRVFr1bZA5M";

const URL_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const inputPregunta = document.getElementById("pregunta");
const botonEnviar = document.getElementById("btnEnviar");
const contenedorRespuesta = document.getElementById("respuesta");

let estaConsultando = false;

botonEnviar.addEventListener("click", consultarGemini);


async function consultarGemini() {
  if (estaConsultando) {
    return;
  }

  const preguntaUsuario = inputPregunta.value.trim();

  if (preguntaUsuario === "") {
    contenedorRespuesta.textContent = "Por favor escribe una pregunta sobre la NBA.";
    return;
  }

  try {
    estaConsultando = true;
    botonEnviar.disabled = true;
    botonEnviar.textContent = "Consultando IA...";
    contenedorRespuesta.textContent = "Generando respuesta...";

    const respuesta = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: `
Eres un consultor experto en NBA.

Tu función es responder únicamente preguntas relacionadas con:
- Equipos de la NBA.
- Jugadores.
- Estadísticas.
- Historia de la NBA.
- Temporadas.
- Playoffs.
- Finales.
- Draft.
- Posiciones de jugadores.
- Comparaciones deportivas.
- Reglas básicas del baloncesto profesional.

Debes responder en español, de forma clara, sencilla y educativa.

Si el usuario pregunta algo que no esté relacionado con la NBA o el baloncesto, responde amablemente:
"Solo puedo ayudarte con temas relacionados con la NBA y baloncesto profesional."

Cuando no tengas datos actualizados en tiempo real, aclara que la información puede depender de la temporada actual.
              `,
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: preguntaUsuario,
              },
            ],
          },
        ],
      }),
    });

    if (respuesta.status === 429) {
      contenedorRespuesta.textContent =
        "Has realizado demasiadas solicitudes. Espera unos minutos y vuelve a intentarlo.";
      return;
    }

    if (!respuesta.ok) {
      const errorGemini = await respuesta.json();
      console.error("Detalle del error de Gemini:", errorGemini);
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    const textoIA = datos.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textoIA) {
      contenedorRespuesta.textContent =
        "La API respondió, pero no se encontró texto en la respuesta.";
      return;
    }

    contenedorRespuesta.textContent = textoIA;

  } catch (error) {
    console.error("Error al consultar Gemini:", error);
    contenedorRespuesta.textContent =
      "Ocurrió un error al consultar la IA. Revisa la consola.";
  } finally {
    estaConsultando = false;
    botonEnviar.disabled = false;
    botonEnviar.textContent = "Enviar pregunta";
  }
}