// ==========================================================
// Página de reservas
// ==========================================================

const form = document.getElementById('booking-form');
const message = document.getElementById('form-message');
const submitButton = document.getElementById('submit-button');
const partySize = document.getElementById('party-size');

const state = { date: '', dateLabel: '', time: '' };

// ---------- Mensajes ----------
function mostrarMensaje(texto, exito = false) {
  message.textContent = texto;
  message.classList.remove('oculto');
  message.classList.toggle('exito', exito);
}

function ocultarMensaje() {
  message.classList.add('oculto');
  message.classList.remove('exito');
}

// ---------- Día ----------
document.getElementById('date-options').addEventListener('click', event => {
  const boton = event.target.closest('[data-date]');
  if (!boton) return;

  document.querySelectorAll('[data-date]').forEach(item =>
    item.setAttribute('aria-pressed', String(item === boton))
  );

  state.date = boton.dataset.date;
  state.dateLabel = boton.textContent.trim();
  document.getElementById('summary-date').textContent = state.dateLabel;
  ocultarMensaje();
});

// ---------- Horario (almuerzo o cena) ----------
document.querySelectorAll('[data-time-group]').forEach(grupo => {
  grupo.addEventListener('click', event => {
    const boton = event.target.closest('[data-time]');
    if (!boton) return;

    document.querySelectorAll('[data-time]').forEach(item =>
      item.setAttribute('aria-pressed', String(item === boton))
    );

    state.time = boton.dataset.time;
    document.getElementById('summary-time').textContent = state.time;
    ocultarMensaje();
  });
});

// ---------- Cantidad de personas ----------
partySize.addEventListener('change', event => {
  const count = Number(event.target.value);
  document.getElementById('summary-party').textContent =
    count + (count === 1 ? ' persona' : ' personas');
});

// ---------- Cumpleaños: lleva a la página de reserva de cumpleaños ----------
// cumple.html está en la misma carpeta (html/), por eso la ruta es solo el nombre del archivo.
document.getElementById('birthday-button').addEventListener('click', () => {
  window.location.href = 'cumple.html';
});

// ---------- Envío ----------
form.addEventListener('submit', event => {
  event.preventDefault();

  const nombre = document.getElementById('guest-name').value.trim();
  const telefono = document.getElementById('phone').value.trim();
  const email = document.getElementById('email');

  if (!state.date) return mostrarMensaje('Elegí el día en que querés venir.');
  if (!state.time) return mostrarMensaje('Elegí un horario.');
  if (!nombre) {
    mostrarMensaje('Escribí tu nombre.');
    return document.getElementById('guest-name').focus();
  }
  // \D = cualquier cosa que no sea número. Quitamos espacios, guiones y paréntesis
  // y contamos solo los dígitos: si quedan menos de 6, el teléfono no es válido.
  if (telefono.replace(/\D/g, '').length < 6) {
    mostrarMensaje('Ingresá un celular o WhatsApp válido.');
    return document.getElementById('phone').focus();
  }
  if (email.value.trim() && !email.checkValidity()) {
    mostrarMensaje('Revisá el email o dejalo vacío.');
    return email.focus();
  }

  // Acá va el envío real de la reserva (por ejemplo, a un servidor o a una planilla).
  // Por ahora solo muestra la confirmación en pantalla.
  // Juntamos todo en un solo objeto: es el paquete que después se enviaría al servidor.
  // creado guarda la fecha y hora del envío en formato ISO (estándar para bases de datos).
  const datos = {
    fecha: state.date,
    hora: state.time,
    personas: Number(partySize.value),
    nombre,
    telefono,
    email: email.value.trim(),
    zona: document.getElementById('area').value,
    comentarios: document.getElementById('comments').value.trim(),
    creado: new Date().toISOString()
  };
  console.log('Reserva lista para enviar:', datos);

  submitButton.disabled = true;
  mostrarMensaje(
    '¡Listo! Recibimos tu solicitud para el ' + state.dateLabel +
    ' a las ' + state.time + '. La reserva queda sujeta a confirmación del restaurante.',
    true
  );
  submitButton.disabled = false;
});
