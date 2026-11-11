// Script del menú hamburguesa: se carga en todas las páginas y controla el menú en celulares.

// Busca en el HTML el botón (con id="botonMenu") y el contenedor de los links (con id="navegacion").
const botonMenu = document.getElementById("botonMenu");
const navegacion = document.getElementById("navegacion");

// Interacción del Menú hamburguesa
// Cada vez que se hace clic en el botón, se ejecuta la función de flecha.
botonMenu.addEventListener("click", () => {
    // classList.toggle agrega la clase "activo" si no la tiene, o la quita si ya la tiene.
    // Devuelve true si después del cambio la clase quedó puesta (menú abierto), false si quedó quitada.
    const abierto = navegacion.classList.toggle("activo");

    // aria-expanded informa a los lectores de pantalla si el menú está abierto ("true") o cerrado ("false").
    botonMenu.setAttribute(
      "aria-expanded", 
      abierto
    );
    // aria-label cambia el texto que lee el lector: "Cerrar menú" si está abierto, "Abrir menú" si está cerrado.
    botonMenu.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

    // Cambia el ícono visible del botón: ✕ para cerrar, ☰ para abrir.
    botonMenu.textContent = abierto ? "✕" : "☰";
});
