const botonMenu = document.getElementById("botonMenu");
const navegacion = document.getElementById("navegacion");

botonMenu.addEventListener("click", () => {
    const abierto = navegacion.classList.toggle("activo");

    botonMenu.setAttribute(
        "aria-expanded", 
        abierto
    );
    botonMenu.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

    botonMenu.textContent = abierto ? "✕" : "☰";
});