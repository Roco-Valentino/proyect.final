// Lógica de la página Menú: muestra los platos por categoría y permite filtrarlos con los botones.

// Lista de todos los platos. Cada plato es un objeto con sus datos (nombre, desc, precio, categoria, img).
const platos = [
   { nombre: "Napolitana Simple ", desc: "Jamón, Mozzarella, Orégano y Salsa de Tomate.", precio: 18500, categoria: "Especialidad", img:"../assets/img/especialidad1.jpeg" },
   { nombre: "Cheddar & Panceta", desc: "Cheddar, Panceta, Cebolla Morada y Cebollin de Verdeo.", precio: 19200, categoria: "Especialidad", img: "../assets/img/especialidad2.webp" },
   { nombre: "Milanesa 4 Quesos", desc: "Con queso Mozzarella, Cheddar, Parmesano y Roquefort.", precio: 18900, categoria: "Especialidad", img: "../assets/img/especialidad3.webp" },
   { nombre: "Milanesa a Caballo", desc: "La mila clásica con 2 Huevos Fritos.", precio: 22100, categoria: "Especialidad", img: "" },
   { nombre: "Milanesa Rocona", desc: "Queso Roquefort con Nuez encima.", precio: 19000, categoria: "Especialidad", img: "" },
   { nombre: "Milanesa Fresca", desc: "Pesto con rodajas de Tomate cherri fresco.", precio: 19000, categoria: "Especialidad", img: "" },
   { nombre: "La BAJON", desc: "Milanesa Napolitana con tiras Panceta y Aceitunas.", precio: 23450, categoria: "Especialidad", img: "../assets/img/mila1.jpeg" },

   { nombre: "Milanesa clásica", desc: "De Carne de Ternera.", precio: 17000, categoria: "General", img: "../assets/img/general1.webp" },
   { nombre: "Milanesa Chicken", desc: "De Pechuga de Pollo.", precio: 17500, categoria: "General", img: "../assets/img/general2.webp" },
   { nombre: "Milanesa Veggie", desc: "De Zapallo o Berengena.", precio: 18000, categoria: "General", img: "../assets/img/general1.jpg" },
   { nombre: "Milanesa clásica", desc: "Sanguche clasico con Lechuga, Tomate y Mayonesa Casera de la casa.", precio: 17000, categoria: "General", img: "../assets/img/general4.webp" },

   { nombre: "Flan casero", desc: "Flan Clásico con dulce de leche o crema.", precio: 13500, categoria: "Postres", img: "../assets/img/postre1.webp" },
   { nombre: "Panqueques", desc: "Mini Torre de Panqueques con Frutilla.", precio: 13500, categoria: "Postres", img: "../assets/img/postre2.avif" },

   { nombre: "Mini mila", desc: "Milanesa de Carne con Pápas Fritas.", precio: 15500, categoria: "Infantil", img: "../assets/img/infantil1.webp" },
   { nombre: "Nuggets", desc: "Nuggets de Pollo con Bolas de Pápas.", precio: 16500, categoria: "Infantil", img: "../assets/img/infantil2.webp" },

   { nombre: "Gaseosa", desc: "Con Opción de Línea.", precio: 7500, categoria: "Bebidas", img: "../assets/img/bebida1.avif" },
   { nombre: "Agua Mineral", desc: "Con Gas o Sin Gas.", precio: 6500, categoria: "Bebidas", img: "../assets/img/bebida2.avif" },
   { nombre: "Jugo Natural", desc: "Con la fruta que deseé.", precio: 7000, categoria: "Bebidas", img: "../assets/img/bebida3.avif" },
];

// Crea la lista de categorías sin repetir. new Set elimina duplicados; el spread [...] lo vuelve un array.
const categorias = [...new Set(platos.map(p => p.categoria))];
// Referencias al contenedor de los botones de categoría y a la grilla donde se muestran los platos.
const contBotones = document.getElementById("ini");
const grilla = document.getElementById("grilla");

// Dibuja un botón por cada categoría. map convierte cada nombre en texto HTML y join los une sin separador.
// data-cat guarda el nombre de la categoría dentro del botón para leerlo después.
contBotones.innerHTML = categorias
   .map(c => `<button class="inc" data-cat="${c}">${c}</button>`)
   .join("");

// Muestra en la grilla solo los platos de la categoría recibida.
function mostrar(categoria) {
   grilla.innerHTML = platos
      // filter deja solo los platos cuya categoría coincide con la elegida.
      .filter(p => p.categoria === categoria)
      // map convierte cada plato en una tarjeta HTML.
      // Dentro del template se arma el HTML de cada tarjeta.
      // Si el plato tiene foto, se pone como imagen de fondo; si no, la tarjeta queda sin imagen (rayada en CSS).
      // toLocaleString("es-AR") agrega separadores de miles con formato argentino: 18500 -> 18.500
      .map(p => `
         <article class="card">
            <div class="card__img" style="${p.img ? `background-image:url('${p.img}')` : ""}"></div>
            <h3>${p.nombre}</h3>
            <p>${p.desc}</p>
            <span class="precio">$ ${p.precio.toLocaleString("es-AR")}</span>
         </article>
      `)
   .join("");
}

// Clic en un botón de categoría: marca el botón como activo y muestra esa categoría.
contBotones.addEventListener("click", e => {
   // closest busca el botón más cercano al lugar donde se hizo clic, por si el clic cayó en un elemento interno.
   const btn = e.target.closest(".inc");
   // Si el clic no fue sobre un botón de categoría, no hace nada.
   if (!btn) return;
   // Quita la clase "activo" del botón que estaba marcado.
   contBotones.querySelector(".activo").classList.remove("activo");
   // Marca el botón clickeado como activo (cambia su color en CSS).
   btn.classList.add("activo");
   // Muestra los platos de esa categoría. dataset.cat lee el valor de data-cat.
   mostrar(btn.dataset.cat);
});

// Lee la parte de la URL después del "#" (por ejemplo "#bebidas") y la pasa a minúsculas.
// decodeURIComponent convierte caracteres codificados (como %C3%A1) en letras normales.
const hash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
// Busca la categoría que coincida con el hash. Si no coincide ninguna, usa la primera ("??" es el valor por defecto).
const inicial = categorias.find(c => c.toLowerCase() === hash) ?? categorias[0];

// Marca como activo el botón de la categoría inicial. toggle(clase, condición) agrega la clase solo si la condición es true.
contBotones.querySelectorAll(".inc").forEach(b =>
   b.classList.toggle("activo", b.dataset.cat === inicial)
);
// Muestra al cargar la página la categoría inicial.
mostrar(inicial);
