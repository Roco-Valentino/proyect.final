// ---------- Comidas ----------
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
   
   { nombre: "Mini mila", desc: "Milanesa de Carne con Pápas Fritas.",   precio: 15500, categoria: "Infantil", img: "../assets/img/infantil1.webp" },
   { nombre: "Nuggets", desc: "Nuggets de Pollo con Bolas de Pápas.",   precio: 16500, categoria: "Infantil", img: "../assets/img/infantil2.webp" },

   { nombre: "Gaseosa", desc: "Con Opción de Línea.", precio: 7500, categoria: "Bebidass", img: "../assets/img/bebida1.avif" },
   { nombre: "Agua Mineral", desc: "Con Gas o Sin Gas.", precio: 6500, categoria: "Bebidass", img: "../assets/img/bebida2.avif" },
   { nombre: "Jugo Natural", desc: "Con la fruta que deseé.", precio: 7000, categoria: "Bebidass", img: "../assets/img/bebida3.avif" },
];

// Las categorías se calculan solas a partir de los platos
const categorias = [...new Set(platos.map(p => p.categoria))];
const contBotones = document.getElementById("ini");
const grilla = document.getElementById("grilla");

// ---------- Botones ----------
contBotones.innerHTML = categorias
   .map((c, i) => `<button class="inc ${i === 0 ? "activo" : ""}" data-cat="${c}">${c}</button>`)
   .join("");

// ---------- Carta de presentación ----------
function mostrar(categoria) {
   grilla.innerHTML = platos
      .filter(p => p.categoria === categoria)
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

// Cambia cuando se apreta el botón de la categoría
contBotones.addEventListener("click", e => {
   const btn = e.target.closest(".inc");
   if (!btn) return;
   contBotones.querySelector(".activo").classList.remove("activo");
   btn.classList.add("activo");
   mostrar(btn.dataset.cat);
});

// Carga inicial: primera categoría (Especialidad)
mostrar(categorias[0]);