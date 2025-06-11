let done = arguments[0];  // <- callback de Selenium

console.log("//////SIN FILTRO //////");

// Función para expandir descripción si existe el botón
function expandirDescripcion() {
  return new Promise((resolve) => {
    // Buscar botón expandir (puede tener diferentes clases)
    let botonExpandir = document.querySelector("a.expander") || 
                       document.querySelector(".expandir") || 
                       document.querySelector("[class*='expand']");
    
    if (botonExpandir) {
      console.log("Encontrado botón expandir, haciendo clic...");
      botonExpandir.click();
      // Esperar un poco para que se expanda el contenido
      setTimeout(() => {
        resolve(true);
      }, 1500);
    } else {
      console.log("No se encontró botón expandir");
      resolve(false);
    }
  });
}

// Función principal asíncrona
async function procesarAnuncio() {
  try {
    // Primero expandir descripción si existe el botón
    await expandirDescripcion();
    
    // Ahora evaluar las palabras clave para excluir (después de expandir)
    let descripcionTag = document.querySelector("div.adCommentsLanguage.expandable p");
    let descripcionTexto = descripcionTag?.textContent.toLowerCase() || "";

    if (
      descripcionTexto.includes("abstenerse") ||
      descripcionTexto.includes("agencias") ||
      descripcionTexto.includes("inmobiliaria") ||
      descripcionTexto.includes("inmobiliarias")
    ) {
      done("No quiere agencias");
      return;
    }

    // Hacer clic para mostrar teléfono
    let botonTelefono = document.querySelector(".hidden-contact-phones_text");
    if (botonTelefono) {
      botonTelefono.click();
    }

    setTimeout(() => {
      const datos = [];

      let daynow = new Date(Date.now()).toLocaleString();
      let daynowsplit = daynow.split(",");
      let daynowfecha = daynowsplit[0];

      let precio = document.querySelector("span.info-data-price span.txt-bold")?.textContent.trim() || "";
      let distrito = document.querySelector("span.main-info__title-minor")?.textContent.trim() || "";
      let direccion = document.querySelector("span.main-info__title-main")?.innerHTML.trim() || "";
      let direccionSplit = direccion.split(" ");
      let direccionTrim = direccionSplit.slice(4);
      let direccionParse = direccionTrim.join(',').replace(/,/g, ' ').split();

      let nombreTag = document.querySelector("div.professional-name span.particular input") || document.querySelector("div.professional-name input");
      let nombre = nombreTag?.value.trim() || "";

      // Obtener número de teléfono
      let telefonoTag = document.querySelector("a.icon-phone-outline.hidden-contact-phones_formatted-phone._mobilePhone span.hidden-contact-phones_text");
      let telefono = telefonoTag ? telefonoTag.textContent.trim() : "N/A";

      let link = location.href;

      let infoSpans = document.querySelectorAll("div.info-features span");
      let metrosTrim = "";
      let caracteristica = "";
      let numHabitacion = 0;
      let planta = "";

      infoSpans.forEach((span) => {
        let text = span.textContent.toLowerCase();
        if (text.includes("m²")) {
          metrosTrim = text.split(" ")[0];
        } else if (text.includes("hab")) {
          numHabitacion = text.split(" ")[0];
        } else if (text.includes("planta")) {
          planta = text;
        } else {
          caracteristica = text;
        }
      });

      let fechaLlamada = "";
      let inicialLlamada = "";
      let fechaValoracion = "";
      let observaciones = "";
      let inicialLista = "RS";

      datos.push(
        daynowfecha,
        precio,
        distrito,
        direccionParse,
        nombre,
        telefono,
        link,
        metrosTrim,
        planta + " " + caracteristica,
        numHabitacion,
        fechaLlamada,
        inicialLlamada,
        fechaValoracion,
        observaciones,
        inicialLista
      );

      done(datos);
    }, 5000);
    
  } catch (error) {
    console.error("Error en procesarAnuncio:", error);
    done("Error procesando anuncio");
  }
}

// Ejecutar la función principal
procesarAnuncio();