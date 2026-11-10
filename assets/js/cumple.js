// ==========================================================
// Página de cumpleaños
// ==========================================================

const form = document.getElementById('form-cumple');
const mensaje = document.getElementById('mensaje');
const fecha = document.getElementById('fecha');

// ---------- Fecha mínima: no se puede elegir un día pasado ----------
// toISOString() usa UTC, así que armamos la fecha local a mano para evitar corrimientos de día.
const hoy = new Date();
const hoyTexto = [
  hoy.getFullYear(),
  String(hoy.getMonth() + 1).padStart(2, '0'),
  String(hoy.getDate()).padStart(2, '0')
].join('-');
fecha.min = hoyTexto;

// ---------- Mensajes ----------
function mostrarMensaje(texto, exito = false) {
  mensaje.textContent = texto;
  mensaje.classList.remove('oculto');
  mensaje.classList.toggle('exito', exito);
}

// ---------- Envío ----------
form.addEventListener('submit', event => {
  event.preventDefault();

  const cumpleanero = document.getElementById('cumpleanero').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const horario = document.getElementById('horario').value;
  const invitados = Number(document.getElementById('invitados').value);
  const menu = document.getElementById('menu').value;
  const paquete = document.querySelector('input[name="paquete"]:checked');

  if (!paquete) return mostrarMensaje('Elegí un paquete para tu cumple.');
  if (!cumpleanero) return mostrarMensaje('Escribí el nombre del cumpleañero/a.');
  // Quitamos espacios, guiones y paréntesis; si quedan menos de 6 dígitos, no es un número válido
  if (telefono.replace(/\D/g, '').length < 6) return mostrarMensaje('Ingresá un teléfono válido.');
  if (!fecha.value) return mostrarMensaje('Elegí la fecha del cumple.');
  if (fecha.value < hoyTexto) return mostrarMensaje('La fecha no puede ser anterior a hoy.');
  if (!horario) return mostrarMensaje('Elegí un horario.');
  if (invitados < 1 || invitados > 40) return mostrarMensaje('La cantidad de invitados tiene que estar entre 1 y 40.');
  if (!menu) return mostrarMensaje('Elegí un plato del menú.');

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

  mostrarMensaje(
    '¡Listo! Recibimos la reserva de ' + cumpleanero + ' para el ' + fecha.value +
    ' a las ' + horario + '. Te confirmamos por WhatsApp.',
    true
  );
  form.reset();
  fecha.min = hoyTexto;
});
