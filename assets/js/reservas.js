const form = document.getElementById('booking-form');
const message = document.getElementById('form-message');
const submitButton = document.getElementById('submit-button');
const partySize = document.getElementById('party-size');
const contFechas = document.getElementById('date-options');

const state = { date: '', dateLabel: '', time: '' };

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const hoy = new Date();
for (let i = 0; i < 7; i++) {
  const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
  const iso = [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'choice';
  boton.dataset.date = iso;
  boton.setAttribute('aria-pressed', 'false');
  boton.textContent = (i === 0 ? 'Hoy ' : diasSemana[d.getDay()] + ' ') + d.getDate();
  contFechas.appendChild(boton);
}

function mostrarMensaje(texto, exito = false) {
  message.textContent = texto;
  message.classList.remove('oculto');
  message.classList.toggle('exito', exito);
}

function ocultarMensaje() {
  message.classList.add('oculto');
  message.classList.remove('exito');
}

contFechas.addEventListener('click', event => {
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

partySize.addEventListener('change', event => {
  const count = Number(event.target.value);
  document.getElementById('summary-party').textContent =
    count + (count === 1 ? ' persona' : ' personas');
});

document.getElementById('birthday-button').addEventListener('click', () => {
  window.location.href = 'cumple.html';
});

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
  if (telefono.replace(/\D/g, '').length < 6) {
    mostrarMensaje('Ingresá un celular o WhatsApp válido.');
    return document.getElementById('phone').focus();
  }
  if (email.value.trim() && !email.checkValidity()) {
    mostrarMensaje('Revisá el email o dejalo vacío.');
    return email.focus();
  }

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
