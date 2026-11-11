// Lógica de la página Reservas: arma los días, guarda la elección del usuario, muestra el resumen y valida el formulario.

// Referencias a los elementos del HTML que usa el script.
const form = document.getElementById('booking-form');
const message = document.getElementById('form-message');
const submitButton = document.getElementById('submit-button');
const partySize = document.getElementById('party-size');
const contFechas = document.getElementById('date-options');

// Objeto que guarda lo que eligió el usuario hasta el momento.
const state = { date: '', dateLabel: '', time: '' };

// Abreviaturas de los días de la semana. getDay() devuelve un número del 0 (domingo) al 6 (sábado) que sirve como índice.
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const hoy = new Date();
// Crea 7 botones, uno por cada día desde hoy.
for (let i = 0; i < 7; i++) {
  // Fecha del día i: sumar i al día del mes avanza al día siguiente, aunque cambie de mes.
  const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
  // Arma la fecha en formato AAAA-MM-DD, con ceros adelante cuando hace falta.
  const iso = [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
  // Crea el botón del día con su clase, su fecha guardada en data-date y su estado inicial.
  const boton = document.createElement('button');
  boton.type = 'button';            // evita que el botón envíe el formulario
  boton.className = 'choice';       // clase de estilo del botón
  boton.dataset.date = iso;         // guarda la fecha en el atributo data-date
  boton.setAttribute('aria-pressed', 'false');   // indica que todavía no está seleccionado
  // El primer día dice "Hoy"; los demás, la abreviatura del día y el número.
  boton.textContent = (i === 0 ? 'Hoy ' : diasSemana[d.getDay()] + ' ') + d.getDate();
  // Agrega el botón al contenedor de la página.
  contFechas.appendChild(boton);
}

// Muestra un aviso en el formulario. Si exito es true, se pinta en verde.
function mostrarMensaje(texto, exito = false) {
  message.textContent = texto;                  // pone el texto del aviso
  message.classList.remove('oculto');           // lo hace visible
  message.classList.toggle('exito', exito);     // agrega la clase "exito" solo si exito es true
}

// Oculta el aviso y quita el color de éxito.
function ocultarMensaje() {
  message.classList.add('oculto');
  message.classList.remove('exito');
}

// Clic en un día: lo marca como elegido y actualiza el resumen.
// Se escucha en el contenedor (delegación): un solo listener sirve para todos los botones.
contFechas.addEventListener('click', event => {
  // closest busca el botón con data-date más cercano al clic. Si no encuentra ninguno, sale.
  const boton = event.target.closest('[data-date]');
  if (!boton) return;

  // Recorre todos los días y pone aria-pressed="true" solo en el elegido y "false" en los demás.
  document.querySelectorAll('[data-date]').forEach(item =>
    item.setAttribute('aria-pressed', String(item === boton))
  );

  // Guarda la fecha y el texto del día elegido.
  state.date = boton.dataset.date;
  state.dateLabel = boton.textContent.trim();
  // Muestra el día en el resumen de la derecha.
  document.getElementById('summary-date').textContent = state.dateLabel;
  // Oculta cualquier aviso anterior de error.
  ocultarMensaje();
});

// Lo mismo para los horarios, pero hay dos grupos (almuerzo y cena). Por eso se recorre cada grupo.
document.querySelectorAll('[data-time-group]').forEach(grupo => {
  grupo.addEventListener('click', event => {
    // Busca el botón de horario clickeado (el que tiene data-time).
    const boton = event.target.closest('[data-time]');
    if (!boton) return;

    // Marca como seleccionado solo el horario elegido, en todos los grupos.
    document.querySelectorAll('[data-time]').forEach(item =>
      item.setAttribute('aria-pressed', String(item === boton))
    );

    // Guarda el horario y lo muestra en el resumen.
    state.time = boton.dataset.time;
    document.getElementById('summary-time').textContent = state.time;
    ocultarMensaje();
  });
});

// Cuando cambia la cantidad de personas, actualiza el resumen con "1 persona" o "N personas".
partySize.addEventListener('change', event => {
  // Number convierte el texto del select en número para poder compararlo.
  const count = Number(event.target.value);
  // El operador ternario elige la palabra en singular o plural.
  document.getElementById('summary-party').textContent =
    count + (count === 1 ? ' persona' : ' personas');
});

// El botón "¿Es un cumpleaños?" lleva a la página de reserva de cumpleaños.
document.getElementById('birthday-button').addEventListener('click', () => {
  window.location.href = 'cumple.html';
});

// Validación y envío del formulario de reserva.
form.addEventListener('submit', event => {
  // Evita que el navegador recargue la página al enviar el formulario.
  event.preventDefault();

  // Lee los datos. trim() quita los espacios sobrantes al principio y al final.
  const nombre = document.getElementById('guest-name').value.trim();
  const telefono = document.getElementById('phone').value.trim();
  const email = document.getElementById('email');

  // Cada "if" valida un dato. Si falla, muestra un aviso y corta la función con return.
  if (!state.date) return mostrarMensaje('Elegí el día en que querés venir.');
  if (!state.time) return mostrarMensaje('Elegí un horario.');
  if (!nombre) {
    mostrarMensaje('Escribí tu nombre.');
    // focus() lleva el cursor al campo con error para que el usuario lo corrija.
    return document.getElementById('guest-name').focus();
  }
  // replace(/\D/g, '') quita todo lo que no sea número. Si quedan menos de 6 dígitos, el teléfono no es válido.
  if (telefono.replace(/\D/g, '').length < 6) {
    mostrarMensaje('Ingresá un celular o WhatsApp válido.');
    return document.getElementById('phone').focus();
  }
  // checkValidity() revisa si el email tiene formato válido según el atributo type="email".
  // El email es opcional: solo se valida si el usuario escribió algo.
  if (email.value.trim() && !email.checkValidity()) {
    mostrarMensaje('Revisá el email o dejalo vacío.');
    return email.focus();
  }

  // Junta todos los datos de la reserva en un objeto. Por ahora solo se muestra en la consola.
  const datos = {
    fecha: state.date,
    hora: state.time,
    personas: Number(partySize.value),
    nombre,
    telefono,
    email: email.value.trim(),
    zona: document.getElementById('area').value,
    comentarios: document.getElementById('comments').value.trim(),
    creado: new Date().toISOString()   // fecha y hora de creación en formato estándar
  };
  console.log('Reserva lista para enviar:', datos);

  // Deshabilita el botón mientras se procesa y muestra la confirmación en verde.
  // Nota: el botón vuelve a habilitarse en la misma línea de tiempo, así que el efecto es solo visual.
  submitButton.disabled = true;
  mostrarMensaje(
    '¡Listo! Recibimos tu solicitud para el ' + state.dateLabel +
    ' a las ' + state.time + '. La reserva queda sujeta a confirmación del restaurante.',
    true
  );
  submitButton.disabled = false;
});
