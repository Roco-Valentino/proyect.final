// ==========================================================
// Página de cumpleaños: valida el formulario y muestra avisos.
// ==========================================================

// Referencias a los elementos del HTML que usa el script.
const form = document.getElementById('form-cumple');   // el formulario completo
const mensaje = document.getElementById('mensaje');     // el párrafo donde aparecen los avisos
const fecha = document.getElementById('fecha');         // el campo de fecha

// ---------- Fecha mínima: no se puede elegir un día pasado ----------
// toISOString() usa UTC, así que armamos la fecha local a mano para evitar corrimientos de día.
const hoy = new Date();
const hoyTexto = [
  hoy.getFullYear(),
  String(hoy.getMonth() + 1).padStart(2, '0'),   // getMonth() empieza en 0, por eso se suma 1
  String(hoy.getDate()).padStart(2, '0')
].join('-');   // resultado: "AAAA-MM-DD"
// min es un atributo del input date: el calendario no deja elegir fechas anteriores a este valor.
fecha.min = hoyTexto;

// ---------- Mensajes ----------
// Muestra un aviso. Si exito es true, el aviso se pinta en verde; si no, en amarillo.
function mostrarMensaje(texto, exito = false) {
  mensaje.textContent = texto;
  mensaje.classList.remove('oculto');
  mensaje.classList.toggle('exito', exito);
}

// ---------- Envío ----------
// Se ejecuta al enviar el formulario.
form.addEventListener('submit', event => {
  // Evita que la página se recargue y pierda los datos.
  event.preventDefault();

  // Lee los valores de los campos. trim() quita espacios sobrantes.
  const cumpleanero = document.getElementById('cumpleanero').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const horario = document.getElementById('horario').value;
  // Number convierte el texto en número, necesario para validar el rango de invitados.
  const invitados = Number(document.getElementById('invitados').value);
  const menu = document.getElementById('menu').value;
  // Busca el radio de paquete que esté marcado. Si ninguno, devuelve null.
  const paquete = document.querySelector('input[name="paquete"]:checked');

  // Cada línea valida un campo. Si falla, muestra el aviso y corta la función con return.
  if (!paquete) return mostrarMensaje('Elegí un paquete para tu cumple.');
  if (!cumpleanero) return mostrarMensaje('Escribí el nombre del cumpleañero/a.');
  // Quitamos espacios, guiones y paréntesis; si quedan menos de 6 dígitos, no es un número válido
  if (telefono.replace(/\D/g, '').length < 6) return mostrarMensaje('Ingresá un teléfono válido.');
  if (!fecha.value) return mostrarMensaje('Elegí la fecha del cumple.');
  // Comparar textos con formato AAAA-MM-DD alcanza para saber si una fecha es anterior a hoy.
  if (fecha.value < hoyTexto) return mostrarMensaje('La fecha no puede ser anterior a hoy.');
  if (!horario) return mostrarMensaje('Elegí un horario.');
  if (invitados < 1 || invitados > 40) return mostrarMensaje('La cantidad de invitados tiene que estar entre 1 y 40.');
  if (!menu) return mostrarMensaje('Elegí un plato del menú.');

  // Junta los datos en un objeto. Por ahora solo se muestra en la consola.
  // Acá iría el envío real: por ejemplo abrir WhatsApp con estos datos, o guardarlos en un servidor.
  const datos = {
    paquete: paquete.value,
    cumpleanero,
    telefono,
    fecha: fecha.value,
    horario,
    invitados,
    menu,
    comentarios: document.getElementById('comentarios').value.trim(),
    creado: new Date().toISOString()
  };
  console.log('Reserva de cumple lista para enviar:', datos);

  // Muestra la confirmación en verde, limpia el formulario y vuelve a poner la fecha mínima.
  mostrarMensaje(
    '¡Listo! Recibimos la reserva de ' + cumpleanero + ' para el ' + fecha.value +
    ' a las ' + horario + '. Te confirmamos por WhatsApp.',
    true
  );
  form.reset();
  fecha.min = hoyTexto;
});
